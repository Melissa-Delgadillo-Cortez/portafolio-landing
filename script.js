// Clase que encapsula la lógica de animación al hacer scroll.
// Aplicando POO: el estado (observer, elementos) y el comportamiento
// viven juntos dentro de la clase, en vez de sueltos en el archivo.
class ScrollReveal {
  constructor(selector, options = {}) {
    this.elements = document.querySelectorAll(selector);
    this.threshold = options.threshold || 0.15;
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersect(entries),
      { threshold: this.threshold }
    );
    this.init();
  }

  init() {
    this.elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        this.observer.unobserve(entry.target); // se anima una sola vez
      }
    });
  }
}

// Clase que encapsula el scroll suave al hacer clic en los enlaces del nav.
class SmoothNav {
  constructor(selector) {
    this.links = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const targetId = e.currentTarget.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Punto de entrada: se ejecuta cuando el HTML ya cargó por completo.
document.addEventListener("DOMContentLoaded", () => {
  new ScrollReveal(".reveal");
  new SmoothNav('nav a[href^="#"]');
});