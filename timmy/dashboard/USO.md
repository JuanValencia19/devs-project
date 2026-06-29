# Dashboard de Proyectos - DEVS PROJECT

## Cómo visualizar el dashboard

Solo necesitás un navegador web moderno (Chrome, Firefox, Edge).

### Opción 1: Abrir directo (recomendado)

```
timmy/dashboard/index.html
```

Hacé doble click en el archivo o abrílo desde el navegador con `Ctrl+O`. Funciona sin servidor.

### Opción 2: Servidor local (opcional)

Si trabajás con proyectos que cargan archivos JSON externos, usá un servidor local:

```bash
python3 -m http.server 8000 -d timmy/dashboard/
```

Luego ingresá a `http://localhost:8000` en el navegador.

## Cómo agregar proyectos

1. Abrí `js/data.js`
2. Buscá el módulo correspondiente
3. Agregá un nuevo objeto dentro del array `projects: []`

```js
// Ejemplo para agregar un proyecto en Módulo 02 - HTML
{
  id: "02-html",
  ...
  projects: [
    {
      name: "Página de Recetas",
      description: "Mi primera página web con HTML semántico",
      status: "completed",
      tags: ["HTML5", "Accesibilidad"],
      repoUrl: "https://github.com/timmy/recetas",
      liveUrl: "https://timmy.github.io/recetas"
    }
  ]
}
```

Los cambios se ven apenas recargás la página.

## Estados disponibles

| Estado | Significado |
|--------|-------------|
| `"completed"` | Proyecto terminado |
| `"in-progress"` | Proyecto en desarrollo |
| `"not-started"` | Proyecto pendiente |

## Recomendaciones

- Usá **Chrome** o **Firefox** para mejor rendimiento de animaciones
- Las preferencias (tema oscuro/claro) se guardan automáticamente
- Los filtros y detalles de proyectos se manejan desde la interfaz
