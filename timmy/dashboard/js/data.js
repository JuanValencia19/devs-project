/**
 * ============================================================================
 * DEVS PROJECT - DATA
 * ============================================================================
 * Archivo de datos centralizado para el Dashboard de Proyectos.
 * Aquí se define toda la información de los módulos y proyectos.
 *
 * ¿Cómo agregar un proyecto?
 * 1. Busca el módulo correspondiente en el array `modules`
 * 2. Agrega un nuevo objeto al array `projects` del módulo
 * 3. Los campos disponibles son:
 *    - name: Nombre del proyecto
 *    - description: Descripción breve
 *    - status: "completed" | "in-progress" | "not-started"
 *    - tags: Array de tecnologías usadas
 *    - repoUrl: URL del repositorio (opcional)
 *    - liveUrl: URL del deploy (opcional)
 *    - image: Ruta de imagen representativa (opcional)
 * ============================================================================
 */

const MODULES_DATA = {
  // Información personal
  author: "Timmy",
  title: "DEVS PROJECT",
  subtitle: "AI Engineer Edition 2026",

  // ==========================================================================
  // MÓDULOS
  // ==========================================================================
  // Cada módulo representa una unidad de aprendizaje completa.
  // La propiedad `status` se actualiza automáticamente según los proyectos.
  // --------------------------------------------------------------------------
  modules: [
    // =========================================================================
    // MÓDULO 00 - BIENVENIDA Y MENTALIDAD
    // =========================================================================
    {
      id: "00-bienvenida",
      number: "00",
      name: "Bienvenida y Mentalidad",
      description:
        "Fundamentos para comenzar el viaje: mentalidad de crecimiento, disciplina y organización.",
      icon: "fas fa-compass",
      color: "#6366f1",
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 01 - HERRAMIENTAS DE DESARROLLO
    // =========================================================================
    {
      id: "01-herramientas",
      number: "01",
      name: "Herramientas de Desarrollo",
      description:
        "Configuración del entorno profesional: terminal, editor, extensores y flujo de trabajo.",
      icon: "fas fa-wrench",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 02 - HTML
    // =========================================================================
    {
      id: "02-html",
      number: "02",
      name: "HTML",
      description:
        "Estructura semántica, accesibilidad, formularios y buenas prácticas de marcado web.",
      icon: "fas fa-code",
      color: "#e44d26",
      gradient: "linear-gradient(135deg, #e44d26, #f16529)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 03 - CSS
    // =========================================================================
    {
      id: "03-css",
      number: "03",
      name: "CSS",
      description:
        "Diseño moderno: Flexbox, Grid, animaciones, responsive design y preprocesadores.",
      icon: "fas fa-paint-brush",
      color: "#264de4",
      gradient: "linear-gradient(135deg, #264de4, #2965f1)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 04 - GIT Y GITHUB
    // =========================================================================
    {
      id: "04-git-github",
      number: "04",
      name: "Git y GitHub",
      description:
        "Control de versiones, branching, pull requests, colaboración y open source.",
      icon: "fab fa-git-alt",
      color: "#f05033",
      gradient: "linear-gradient(135deg, #f05033, #e44d26)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 05 - JAVASCRIPT
    // =========================================================================
    {
      id: "05-javascript",
      number: "05",
      name: "JavaScript",
      description:
        "Lógica de programación, DOM, asincronía, ES6+, y APIs del navegador.",
      icon: "fab fa-js",
      color: "#f7df1e",
      gradient: "linear-gradient(135deg, #f7df1e, #e6b800)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 06 - PYTHON
    // =========================================================================
    {
      id: "06-python",
      number: "06",
      name: "Python",
      description:
        "Fundamentos, POO, librerías estándar, automatización y scripting.",
      icon: "fab fa-python",
      color: "#3776ab",
      gradient: "linear-gradient(135deg, #3776ab, #ffd43b)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 07 - SQL Y POSTGRESQL
    // =========================================================================
    {
      id: "07-sql",
      number: "07",
      name: "SQL y PostgreSQL",
      description:
        "Bases de datos relacionales, consultas avanzadas, índices y optimización.",
      icon: "fas fa-database",
      color: "#336791",
      gradient: "linear-gradient(135deg, #336791, #2c5f8a)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 08 - BACKEND CON FASTAPI
    // =========================================================================
    {
      id: "08-backend-fastapi",
      number: "08",
      name: "Backend con FastAPI",
      description:
        "APIs REST, autenticación, bases de datos, documentación automática y deploy.",
      icon: "fas fa-server",
      color: "#009688",
      gradient: "linear-gradient(135deg, #009688, #00796b)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 09 - REACT
    // =========================================================================
    {
      id: "09-react",
      number: "09",
      name: "React",
      description:
        "Componentes, hooks, estado global, rutas, testing y aplicaciones SPA.",
      icon: "fab fa-react",
      color: "#61dafb",
      gradient: "linear-gradient(135deg, #61dafb, #2c7a9e)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 10 - DOCKER
    // =========================================================================
    {
      id: "10-docker",
      number: "10",
      name: "Docker",
      description:
        "Contenedores, imágenes, docker-compose, volúmenes y orquestación.",
      icon: "fab fa-docker",
      color: "#2496ed",
      gradient: "linear-gradient(135deg, #2496ed, #1d63ed)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 11 - TESTING
    // =========================================================================
    {
      id: "11-testing",
      number: "11",
      name: "Testing",
      description:
        "Pruebas unitarias, integración, e2e, TDD y herramientas del ecosistema.",
      icon: "fas fa-vial",
      color: "#e91e63",
      gradient: "linear-gradient(135deg, #e91e63, #c2185b)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 12 - CLOUD Y DEPLOY
    // =========================================================================
    {
      id: "12-cloud",
      number: "12",
      name: "Cloud y Deploy",
      description:
        "AWS/GCP, CI/CD, serverless, dominios, SSL y despliegue profesional.",
      icon: "fas fa-cloud",
      color: "#4285f4",
      gradient: "linear-gradient(135deg, #4285f4, #34a853)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 13 - INTELIGENCIA ARTIFICIAL
    // =========================================================================
    {
      id: "13-ai",
      number: "13",
      name: "Inteligencia Artificial",
      description:
        "LLMs, embeddings, RAG, fine-tuning, y APIs de IA generativa.",
      icon: "fas fa-brain",
      color: "#a855f7",
      gradient: "linear-gradient(135deg, #a855f7, #d946ef)",
      projects: [],
    },

    // =========================================================================
    // MÓDULO 14 - DESARROLLO DE AGENTES
    // =========================================================================
    {
      id: "14-agentes",
      number: "14",
      name: "Desarrollo de Agentes",
      description:
        "Agentes autónomos, herramientas, memorias, multi-agente y producción.",
      icon: "fas fa-robot",
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #ef4444, #f97316)",
      projects: [],
    },
  ],
};

/**
 * ============================================================================
 * FUNCIONES AUXILIARES
 * ============================================================================
 * Calculan estados y métricas automáticamente para mantener la coherencia.
 * ============================================================================
 */

// Calcula el estado de un módulo basado en sus proyectos
function getModuleStatus(module) {
  const projects = module.projects;
  if (!projects || projects.length === 0) return "not-started";

  const allCompleted = projects.every((p) => p.status === "completed");
  const anyInProgress = projects.some((p) => p.status === "in-progress");

  if (allCompleted) return "completed";
  if (anyInProgress) return "in-progress";
  return "not-started";
}

// Calcula estadísticas globales
function getGlobalStats() {
  const allProjects = MODULES_DATA.modules.flatMap((m) => m.projects || []);
  const totalModules = MODULES_DATA.modules.length;
  const totalProjects = allProjects.length;
  const completed = allProjects.filter((p) => p.status === "completed").length;
  const inProgress = allProjects.filter((p) => p.status === "in-progress").length;
  const notStarted = allProjects.filter((p) => p.status === "not-started").length;

  return { totalModules, totalProjects, completed, inProgress, notStarted };
}
