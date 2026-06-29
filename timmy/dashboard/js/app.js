/**
 * ============================================================================
 * DEVS PROJECT - MAIN APP
 * ============================================================================
 * Controla toda la interactividad del Dashboard:
 * - Renderizado dinámico de módulos y proyectos
 * - Animaciones con IntersectionObserver
 * - Tema oscuro/claro con persistencia en localStorage
 * - Filtros para organizar la vista
 * - Barra de progreso de scroll
 * - Contadores animados en estadísticas
 *
 * FLUJO DE INICIO:
 * 1. Se espera a que el DOM esté listo (DOMContentLoaded)
 * 2. Se renderizan las estadísticas, módulos y proyectos
 * 3. Se configuran todos los event listeners
 * 4. Se restauran preferencias guardadas (tema)
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================================================
  // REFERENCIAS AL DOM
  // ==========================================================================
  // Guardamos referencias a los elementos principales para no
  // tener que consultarlos cada vez que los necesitemos.
  // --------------------------------------------------------------------------
  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

  const dom = {
    statsGrid: $("#stats-grid"),
    modulesGrid: $("#modules-grid"),
    filtersGroup: $("#filters-group"),
    scrollBar: $("#scroll-progress-bar"),
    themeToggle: $("#theme-toggle"),
    themeIcon: $("#theme-icon"),
    backToTop: $("#back-to-top"),
    heroCta: $("#hero-cta"),
  };

  // ==========================================================================
  // ESTADO DE LA APLICACIÓN
  // ==========================================================================
  // Mantenemos el estado global aquí para tener un solo punto de verdad.
  // --------------------------------------------------------------------------
  const state = {
    currentFilter: "all",
    theme: localStorage.getItem("theme") || "dark",
    expandedModule: null,
  };

  // ==========================================================================
  // FUNCIONES DE RENDERIZADO
  // ==========================================================================

  /**
   * Renderiza las tarjetas de estadísticas con contadores.
   * --------------------------------------------------------------------------
   * Las estadísticas se calculan automáticamente desde los datos.
   * Los números se animan al hacer scroll (ver animateCounter).
   */
  function renderStats() {
    const stats = getGlobalStats();
    const items = [
      { value: stats.totalModules, label: "Módulos", icon: "fa-layer-group" },
      { value: stats.totalProjects, label: "Proyectos", icon: "fa-folder-open" },
      { value: stats.completed, label: "Completados", icon: "fa-check-circle" },
      { value: stats.inProgress, label: "En Progreso", icon: "fa-spinner" },
    ];

    dom.statsGrid.innerHTML = items
      .map(
        (item) => `
          <div class="stats__card" data-count="${item.value}">
            <div class="stats__number">
              <span class="stat-counter" data-target="${item.value}">0</span>
            </div>
            <div class="stats__label">
              <i class="fas ${item.icon}"></i> ${item.label}
            </div>
          </div>
        `
      )
      .join("");
  }

  /**
   * Renderiza la cuadrícula de módulos.
   * --------------------------------------------------------------------------
   * Itera sobre todos los módulos en MODULES_DATA y genera las tarjetas.
   * Cada tarjeta contiene: icono, nombre, estado, progreso, proyectos.
   */
  function renderModules() {
    const modules = getFilteredModules();

    if (modules.length === 0) {
      dom.modulesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 16px; opacity: 0.4;">
            <i class="fas fa-search"></i>
          </div>
          <p>No se encontraron módulos con este filtro.</p>
        </div>
      `;
      return;
    }

    dom.modulesGrid.innerHTML = modules
      .map((module) => createModuleCardHTML(module))
      .join("");

    // Asignamos evento de click a cada tarjeta para expandir/colapsar
    $$(".module-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        // Evitamos que clicks en enlaces dentro de la tarjeta activen el toggle
        if (e.target.closest(".project-item__link")) return;
        toggleModuleDetail(card.dataset.moduleId);
      });
    });
  }

  /**
   * Genera el HTML de una tarjeta de módulo.
   * @param {Object} module - Datos del módulo desde MODULES_DATA
   * @returns {string} HTML de la tarjeta
   */
  function createModuleCardHTML(module) {
    const status = getModuleStatus(module);
    const projects = module.projects || [];
    const completedProjects = projects.filter((p) => p.status === "completed").length;
    const progress = projects.length
      ? Math.round((completedProjects / projects.length) * 100)
      : 0;

    return `
      <article
        class="module-card module-card--hidden"
        data-module-id="${module.id}"
        style="--module-gradient: ${module.gradient}"
      >
        <div class="module-card__header">
          <div
            class="module-card__icon-wrap"
            style="background: ${module.gradient}"
          >
            <i class="${module.icon}"></i>
          </div>
          <span class="module-card__number">Módulo ${module.number}</span>
        </div>

        <span class="module-card__status module-card__status--${status}">
          <span class="module-card__status-dot"></span>
          ${status === "not-started" ? "Sin empezar" : status === "in-progress" ? "En progreso" : "Completado"}
        </span>

        <h3 class="module-card__name">${module.name}</h3>
        <p class="module-card__description">${module.description}</p>

        <div class="module-card__progress">
          <div class="module-card__progress-header">
            <span class="module-card__progress-label">Progreso</span>
            <span class="module-card__progress-value">${completedProjects}/${projects.length} proyectos</span>
          </div>
          <div class="module-card__progress-bar">
            <div
              class="module-card__progress-fill"
              data-progress="${progress}"
              style="width: 0%"
            ></div>
          </div>
        </div>

        <div class="module-card__footer">
          <span class="module-card__projects-count">
            <i class="fas fa-code-branch"></i>
            ${projects.length} proyecto${projects.length !== 1 ? "s" : ""}
          </span>
          <span class="module-card__arrow">
            <i class="fas fa-chevron-right"></i>
          </span>
        </div>

        <!-- Detalle de proyectos (se muestra al hacer click) -->
        <div class="module-detail" id="detail-${module.id}">
          ${renderProjectsList(projects)}
        </div>
      </article>
    `;
  }

  /**
   * Genera la lista de proyectos para un módulo.
   * @param {Array} projects - Array de proyectos del módulo
   * @returns {string} HTML de la lista de proyectos
   */
  function renderProjectsList(projects) {
    if (!projects || projects.length === 0) {
      return `
        <div class="module-empty">
          <div class="module-empty__icon"><i class="fas fa-rocket"></i></div>
          <p>No hay proyectos todavía. ¡El primero está por llegar!</p>
        </div>
      `;
    }

    return `
      <div class="module-detail__title">
        <i class="fas fa-list"></i> Proyectos
      </div>
      ${projects
        .map(
          (project) => `
          <div class="project-item">
            <div class="project-item__info">
              <div class="project-item__name">${project.name}</div>
              <div class="project-item__description">${project.description}</div>
              ${project.tags ? renderTags(project.tags) : ""}
            </div>
            <div class="project-item__status">
              <span class="module-card__status module-card__status--${project.status}">
                <span class="module-card__status-dot"></span>
                ${project.status === "completed" ? "Hecho" : project.status === "in-progress" ? "En curso" : "Pendiente"}
              </span>
            </div>
            <div class="project-item__links">
              ${
                project.repoUrl
                  ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-item__link" title="Ver repositorio">
                      <i class="fab fa-github"></i>
                    </a>`
                  : ""
              }
              ${
                project.liveUrl
                  ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-item__link" title="Ver demo">
                      <i class="fas fa-external-link-alt"></i>
                    </a>`
                  : ""
              }
            </div>
          </div>
        `
        )
        .join("")}
    `;
  }

  /**
   * Genera las etiquetas de tecnologías de un proyecto.
   * @param {Array} tags - Array de strings con tecnologías
   * @returns {string} HTML de las etiquetas
   */
  function renderTags(tags) {
    return `
      <div class="project-item__tags">
        ${tags.map((tag) => `<span class="project-item__tag">${tag}</span>`).join("")}
      </div>
    `;
  }

  // ==========================================================================
  // FILTROS
  // ==========================================================================

  /**
   * Renderiza los botones de filtro y configura sus eventos.
   * --------------------------------------------------------------------------
   * Los filtros permiten ver: Todos, Completados, En Progreso, Sin empezar.
   */
  function renderFilters() {
    const filters = [
      { id: "all", label: "Todos", icon: "fa-th-large" },
      { id: "completed", label: "Completados", icon: "fa-check-circle" },
      { id: "in-progress", label: "En Progreso", icon: "fa-spinner" },
      { id: "not-started", label: "Sin empezar", icon: "fa-clock" },
    ];

    dom.filtersGroup.innerHTML = filters
      .map(
        (filter) => `
          <button
            class="filters__btn ${state.currentFilter === filter.id ? "filters__btn--active" : ""}"
            data-filter="${filter.id}"
          >
            <i class="fas ${filter.icon}"></i> ${filter.label}
          </button>
        `
      )
      .join("");

    // Event listeners para filtros
    $$(".filters__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        setFilter(filter);
      });
    });
  }

  /**
   * Cambia el filtro activo y re-renderiza los módulos.
   * @param {string} filter - Identificador del filtro
   */
  function setFilter(filter) {
    state.currentFilter = filter;

    // Actualizamos clases activas en los botones
    $$(".filters__btn").forEach((btn) => {
      btn.classList.toggle("filters__btn--active", btn.dataset.filter === filter);
    });

    renderModules();
    observeCards();
    animateProgressBars();
  }

  /**
   * Obtiene los módulos filtrados según el estado actual.
   * @returns {Array} Módulos que coinciden con el filtro
   */
  function getFilteredModules() {
    if (state.currentFilter === "all") return MODULES_DATA.modules;

    return MODULES_DATA.modules.filter((module) => {
      const status = getModuleStatus(module);
      return status === state.currentFilter;
    });
  }

  // ==========================================================================
  // INTERACCIÓN: EXPANDIR/COLAPSAR MÓDULOS
  // ==========================================================================

  /**
   * Expande o colapsa el detalle de proyectos de un módulo.
   * @param {string} moduleId - ID del módulo a togglear
   */
  function toggleModuleDetail(moduleId) {
    const detail = $(`#detail-${moduleId}`);
    if (!detail) return;

    const isOpen = detail.classList.contains("module-detail--open");

    // Cerramos cualquier detalle abierto (acordeón)
    if (state.expandedModule && state.expandedModule !== moduleId) {
      const prevDetail = $(`#detail-${state.expandedModule}`);
      if (prevDetail) prevDetail.classList.remove("module-detail--open");
    }

    if (isOpen) {
      detail.classList.remove("module-detail--open");
      state.expandedModule = null;
    } else {
      detail.classList.add("module-detail--open");
      state.expandedModule = moduleId;

      // Scroll suave al detalle si está fuera de vista
      setTimeout(() => {
        detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }

  // ==========================================================================
  // ANIMACIONES CON INTERSECTION OBSERVER
  // ==========================================================================

  /**
   * Observa las tarjetas para animar su entrada al hacer scroll.
   * --------------------------------------------------------------------------
   * Usamos IntersectionObserver (API nativa del navegador) para detectar
   * cuándo un elemento entra en el viewport y activar su animación.
   * Esto es más eficiente que escuchar el evento scroll.
   */
  function observeCards() {
    const cards = $$(".module-card--hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reemplazamos la clase --hidden por --visible con un delay
            // para crear un efecto escalonado (stagger)
            const delay = [...cards].indexOf(entry.target) * 80;
            setTimeout(() => {
              entry.target.classList.remove("module-card--hidden");
              entry.target.classList.add("module-card--visible");
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));
  }

  /**
   * Anima las barras de progreso cuando son visibles.
   * --------------------------------------------------------------------------
   * Las barras comienzan en 0% y se animan hasta su valor real.
   */
  function animateProgressBars() {
    const bars = $$(".module-card__progress-fill");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = parseInt(entry.target.dataset.progress, 10);
            entry.target.style.width = `${progress}%`;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach((bar) => observer.observe(bar));
  }

  /**
   * Anima los contadores de estadísticas.
   * --------------------------------------------------------------------------
   * Los números incrementan desde 0 hasta su valor final.
   */
  function animateCounters() {
    const counters = $$(".stat-counter");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target, 10);
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  /**
   * Anima un contador de 0 al valor objetivo.
   * @param {HTMLElement} element - Elemento del contador
   * @param {number} target - Valor final
   * @param {number} duration - Duración en ms
   */
  function animateCounter(element, target, duration = 1000) {
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing suave (ease-out quad)
      const eased = progress * (2 - progress);
      const current = Math.round(eased * target);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ==========================================================================
  // TEMA OSCURO / CLARO
  // ==========================================================================

  /**
   * Cambia entre tema oscuro y claro.
   * --------------------------------------------------------------------------
   * La preferencia se guarda en localStorage para persistir entre sesiones.
   * El icono del botón cambia según el tema activo.
   */
  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme();
    localStorage.setItem("theme", state.theme);
  }

  /**
   * Aplica el tema actual al documento.
   */
  function applyTheme() {
    if (state.theme === "light") {
      document.documentElement.classList.add("light-mode");
      dom.themeIcon.className = "fas fa-moon";
    } else {
      document.documentElement.classList.remove("light-mode");
      dom.themeIcon.className = "fas fa-sun";
    }
  }

  // ==========================================================================
  // SCROLL PROGRESS BAR
  // ==========================================================================

  /**
   * Actualiza el ancho de la barra de progreso según el scroll.
   * --------------------------------------------------------------------------
   * Mide qué porcentaje de la página se ha desplazado y actualiza la barra.
   */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    dom.scrollBar.style.width = `${Math.min(progress, 100)}%`;
  }

  // ==========================================================================
  // BOTÓN VOLVER ARRIBA
  // ==========================================================================

  /**
   * Muestra u oculta el botón de volver arriba según la posición de scroll.
   */
  function toggleBackToTop() {
    if (window.scrollY > 400) {
      dom.backToTop.classList.add("back-to-top--visible");
    } else {
      dom.backToTop.classList.remove("back-to-top--visible");
    }
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================

  // Scroll: actualizar barra de progreso y botón volver arriba
  window.addEventListener("scroll", () => {
    updateScrollProgress();
    toggleBackToTop();
  });

  // Tema: botón de cambio
  dom.themeToggle.addEventListener("click", toggleTheme);

  // Volver arriba: scroll suave al inicio
  dom.backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hero CTA: scroll a los módulos
  dom.heroCta.addEventListener("click", () => {
    const filtersEl = document.querySelector(".filters");
    if (filtersEl) {
      filtersEl.scrollIntoView({ behavior: "smooth" });
    }
  });

  // ==========================================================================
  // INICIALIZACIÓN
  // ==========================================================================

  /**
   * Punto de entrada principal de la aplicación.
   * --------------------------------------------------------------------------
   * Orden de inicialización:
   * 1. Aplicar tema guardado
   * 2. Renderizar estadísticas
   * 3. Renderizar filtros
   * 4. Renderizar módulos
   * 5. Configurar observadores de animación
   * 6. Calcular progreso inicial
   */
  function init() {
    // Tema
    applyTheme();

    // Renderizar componentes
    renderStats();
    renderFilters();
    renderModules();

    // Configurar animaciones
    observeCards();
    animateProgressBars();
    animateCounters();

    // Actualizar barra de progreso inicial
    updateScrollProgress();

    // Log de inicio
    const stats = getGlobalStats();
    console.log(
      `%c🚀 DEVS PROJECT Dashboard%c\n` +
        `${stats.totalModules} módulos · ${stats.totalProjects} proyectos · ` +
        `${stats.completed} completados · ${stats.inProgress} en progreso`,
      "font-size: 1.5rem; font-weight: bold; color: #6366f1;",
      "font-size: 0.9rem; color: #94a3b8;"
    );
  }

  // Iniciamos la aplicación
  init();
});
