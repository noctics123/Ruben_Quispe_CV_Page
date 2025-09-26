# Plan de Mejora UX/UI para https://noctics123.github.io/Ruben_Quispe_CV_Page/

Este documento contiene todas las instrucciones detalladas para que
**Claude Code** o cualquier otro colaborador pueda ejecutar las mejoras
en el repositorio del sitio web del portafolio.

------------------------------------------------------------------------

## 0) Preparación

-   **Rama nueva**: `ux-refresh`
-   **Backup**: crear carpeta `backup_YYYYMMDD/` con copia completa.

``` bash
git checkout -b ux-refresh
mkdir -p backup_$(date +%Y%m%d)
cp -r * backup_$(date +%Y%m%d)/
```

------------------------------------------------------------------------

## 1) Estructura semántica base

**Archivo:** `index.html`

**Objetivo:** mejorar jerarquía visual y SEO.

**ANTES**

``` html
<div id="top">
  <div class="header">Rubén D. Quispe</div>
  <!-- ... -->
</div>
```

**DESPUÉS**

``` html
<header class="site-header" role="banner">
  <nav class="site-nav" aria-label="Principal">
    <a href="#hero" class="logo">R. Quispe</a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links">☰</button>
    <ul id="nav-links" class="nav-links">
      <li><a href="#proyectos">Proyectos</a></li>
      <li><a href="#experiencia">Experiencia</a></li>
      <li><a href="#habilidades">Habilidades</a></li>
      <li><a href="#contacto">Contacto</a></li>
      <li><a href="/Ruben_Quispe_CV.pdf" rel="noopener">Descargar CV</a></li>
    </ul>
  </nav>
</header>
<main id="content">
  <section id="hero" class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title">Transformo datos en decisiones</h1>
    <p>Ingeniero de datos / analítica. Enfocado en impacto medible.</p>
    <div class="hero-cta">
      <a class="btn primary" href="#proyectos">Ver proyectos</a>
      <a class="btn ghost" href="#contacto">Contactar</a>
    </div>
  </section>
</main>
<footer class="site-footer">
  <p>© 2025 Rubén D. Quispe</p>
</footer>
```

Criterios: uso de `<header>`, `<main>`, `<section>`, `<footer>`,
atributos `aria-*`.

------------------------------------------------------------------------

## 2) Sección Proyectos con tarjetas

**Archivos:** `index.html`, `css/styles.css`

\[... se incluyen todas las instrucciones de proyectos, experiencia,
habilidades, estilos, accesibilidad, SEO, rendimiento, contacto, menú
móvil, etc. ...\]

------------------------------------------------------------------------

## 13) Checklist final para PR

-   [ ] HTML válido y `lang="es"`
-   [ ] Contraste WCAG AA
-   [ ] Lighthouse: Performance ≥90, SEO ≥95, Accesibilidad ≥95
-   [ ] Open Graph con imagen correcta
-   [ ] Proyectos con métricas de impacto
-   [ ] Imágenes en WebP con fallback
-   [ ] Menú móvil accesible
-   [ ] sitemap.xml y robots.txt presentes

------------------------------------------------------------------------

> **Mensaje sugerido de PR**\
> *UX Refresh --- Portafolio Rubén Quispe*\
> - Nueva estructura semántica y hero con CTA\
> - Sección de proyectos con tarjetas visuales y métricas\
> - Experiencia con bullets accionables\
> - Habilidades en chips visuales\
> - Accesibilidad, SEO y rendimiento mejorados\
> - Menú móvil y formulario de contacto\
> - Favicons, sitemap.xml y robots.txt
