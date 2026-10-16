// ===== JavaScript propio del blog =====

document.addEventListener("DOMContentLoaded", () => {
  // 1. Año actual en el pie de página
  document.getElementById("anio").textContent = new Date().getFullYear();

  // 2. Contador de palabras del resumen (demuestra que cumple el máximo de 250)
  const resumen = document.getElementById("contenidoResumen").innerText;
  const totalPalabras = resumen.trim().split(/\s+/).length;
  document.getElementById("contadorPalabras").textContent = totalPalabras;

  // 3. Barra de navegación con fondo al bajar y barra de progreso de lectura
  const nav = document.getElementById("navPrincipal");
  const progreso = document.getElementById("progresoLectura");

  function alHacerScroll() {
    nav.classList.toggle("con-fondo", window.scrollY > 40);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progreso.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", alHacerScroll);
  alHacerScroll();

  // 4. Marcar el enlace activo del menú según la sección visible
  const enlaces = document.querySelectorAll("#menu .nav-link");
  const secciones = [...enlaces].map((enlace) => document.querySelector(enlace.getAttribute("href")));

  const observadorMenu = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      enlaces.forEach((enlace) => {
        enlace.classList.toggle("active", enlace.getAttribute("href") === "#" + entrada.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secciones.forEach((seccion) => observadorMenu.observe(seccion));

  // 5. Aparición suave de elementos al hacer scroll
  const observadorAparecer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("visible");
      observadorAparecer.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".aparecer").forEach((elemento) => observadorAparecer.observe(elemento));

  // 6. Cerrar el menú en celulares al elegir una opción
  const menu = document.getElementById("menu");
  document.querySelectorAll("#menu a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
});
