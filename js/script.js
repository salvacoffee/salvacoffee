// Carrusel automático del Hero
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.currentSlide = 0;
        this.slideInterval = 8000; // 8 segundos para transición más lenta
        this.init();
    }

    init() {
        if (this.slides.length > 1) {
            this.startCarousel();
        }
    }

    nextSlide() {
        // Remover clase active del slide actual
        this.slides[this.currentSlide].classList.remove('active');
        
        // Avanzar al siguiente slide (o volver al primero)
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        
        // Agregar clase active al nuevo slide
        this.slides[this.currentSlide].classList.add('active');
    }

    startCarousel() {
        setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }
}

// Header scroll effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// Smooth scroll para navegación
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Seleccionar todos los enlaces de navegación (incluyendo móvil)
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .mobile-nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = this.getHeaderHeight();
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    getHeaderHeight() {
        const header = document.querySelector('.header');
        return header ? header.offsetHeight : 80;
    }
}

// Mobile menu toggle
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger-menu');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileLinks = document.querySelectorAll('.mobile-nav-menu a');
        this.mobileButton = document.querySelector('.mobile-comprar-button');
        this.init();
    }

    init() {
        if (this.hamburger && this.mobileMenu) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            // Cerrar menú al hacer click en un enlace
            this.mobileLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Cerrar menú al hacer click en el botón comprar
            if (this.mobileButton) {
                this.mobileButton.addEventListener('click', () => this.closeMenu());
            }
            
            // Cerrar menú al hacer click fuera del contenido
            this.mobileMenu.addEventListener('click', (e) => {
                if (e.target === this.mobileMenu) {
                    this.closeMenu();
                }
            });
            
            // Cerrar menú con tecla ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                    this.closeMenu();
                }
            });
        }
        
        // Estado ARIA inicial
        if (this.hamburger) this.hamburger.setAttribute('aria-expanded', 'false');
        if (this.mobileMenu) this.mobileMenu.setAttribute('aria-hidden', 'true');
        
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    toggleMenu() {
        const isNowActive = !this.mobileMenu.classList.contains('active');
        this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        
        // Actualizar ARIA
        this.hamburger.setAttribute('aria-expanded', String(isNowActive));
        this.mobileMenu.setAttribute('aria-hidden', String(!isNowActive));
        
        // Prevenir scroll del body cuando el menú está abierto
        if (this.mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    handleResize() {
        const windowWidth = window.innerWidth;
        
        // Cerrar menú automáticamente si se cambia a desktop
        if (windowWidth > 768 && this.mobileMenu.classList.contains('active')) {
            this.closeMenu();
        }
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    new HeroCarousel();
    new HeaderScroll();
    new SmoothScroll();
    new MobileMenu();
    new ProductVideoController(); // Agregar controlador de videos
    new ArteScrollPin(); // Scroll pinning para 'El arte de cada taza'
    new ProcesoScrollActive(); // Activación por hover/scroll para 'El Proceso'
    

});

// Función para manejar el cambio de texto en proceso items


// Video intersection observer para productos
class ProductVideoController {
    constructor() {
        this.videos = document.querySelectorAll('.producto-video');
        this.playedVideos = new Set(); // Para rastrear videos ya reproducidos
        this.init();
    }

    init() {
        if (this.videos.length === 0) return;

        // Configurar Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Video debe estar 50% visible
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                const videoId = video.querySelector('source').src;

                if (entry.isIntersecting && !this.playedVideos.has(videoId)) {
                    // Reproducir video una sola vez
                    video.play().catch(e => console.log('Error playing video:', e));
                    this.playedVideos.add(videoId);
                    
                    // Configurar para que se quede al final cuando termine
                    video.addEventListener('ended', () => {
                        video.currentTime = video.duration;
                    }, { once: true });
                }
            });
        }, observerOptions);

        // Observar todos los videos
        this.videos.forEach(video => {
            this.observer.observe(video);
        });
    }
}

class ArteScrollPin {
  constructor() {
    this.section = document.querySelector('.arte-section');
    this.cards = Array.from(document.querySelectorAll('.procesos-grid .proceso-card'));
    this.lastState = -1;
    this.init();
  }
  init() {
    if (!this.section || this.cards.length === 0) return;
    this.rafId = null;
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    window.addEventListener('resize', this.onScroll.bind(this), { passive: true });
    this.onScroll();
  }
  handle(entries) {
    const entry = entries[0];
    const ratio = entry.intersectionRatio || 0;
    this.applyState(this.mapState(ratio));
  }
  onScroll() {
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.update();
    });
  }
  update() {
    const vh = window.innerHeight;
    const yCenter = window.scrollY + vh / 2;
    const sTop = this.section.offsetTop;
    const sHeight = this.section.offsetHeight;
    const sBottom = sTop + sHeight;
    if (yCenter < sTop || yCenter > sBottom) {
      this.applyState(-1);
      return;
    }
    const p = Math.max(0, Math.min(1, (yCenter - sTop) / sHeight));
    this.applyState(this.mapState(p));
  }
  mapState(p) {
    const n = this.cards.length;
    if (n <= 0) return -1;
    return Math.min(n - 1, Math.max(0, Math.floor(p * n)));
  }
  applyState(state) {
    if (state === this.lastState) return;
    this.lastState = state;
    this.cards.forEach((card, idx) => {
      const active = state >= 0 && idx === state;
      card.classList.toggle('is-active', active);
      card.classList.toggle('is-inactive', state >= 0 && idx !== state);
    });
  }
}

class ProcesoScrollActive {
  constructor() {
    this.section = document.querySelector('.el-proceso-section');
    this.gallery = document.querySelector('.proceso-gallery');
    this.steps = Array.from(document.querySelectorAll('.proceso-gallery .proceso-step'));
    this.lastState = -1;
    this.rafId = null;
    this.scrollAttached = false;
    this.hoverAttached = false;
    this.boundOnScroll = this.onScroll.bind(this);
    this.boundOnResize = this.configure.bind(this);
    this.boundMouseEnters = [];
    this.boundMouseLeave = null;
    this.init();
  }
  init() {
    if (!this.section || this.steps.length === 0) return;
    window.addEventListener('resize', this.boundOnResize, { passive: true });
    this.configure();
  }
  configure() {
    const isMobile = window.innerWidth <= 768; // pantallas pequeñas: activación por scroll
    if (isMobile) {
      this.detachHover();
      this.attachScroll();
      this.onScroll();
    } else {
      this.detachScroll();
      this.attachHover();
      this.setActive(0); // Desktop: primera tarjeta activa por defecto
    }
  }
  attachScroll() {
    if (this.scrollAttached) return;
    window.addEventListener('scroll', this.boundOnScroll, { passive: true });
    this.scrollAttached = true;
  }
  detachScroll() {
    if (!this.scrollAttached) return;
    window.removeEventListener('scroll', this.boundOnScroll);
    this.scrollAttached = false;
  }
  attachHover() {
    if (this.hoverAttached) return;
    this.boundMouseEnters = this.steps.map((step, idx) => {
      const handler = () => this.setActive(idx);
      step.addEventListener('mouseenter', handler, { passive: true });
      return handler;
    });
    this.boundMouseLeave = () => this.setActive(0);
    if (this.gallery) {
      this.gallery.addEventListener('mouseleave', this.boundMouseLeave, { passive: true });
    }
    this.hoverAttached = true;
  }
  detachHover() {
    if (!this.hoverAttached) return;
    this.steps.forEach((step, idx) => {
      const handler = this.boundMouseEnters[idx];
      if (handler) step.removeEventListener('mouseenter', handler);
    });
    this.boundMouseEnters = [];
    if (this.gallery && this.boundMouseLeave) {
      this.gallery.removeEventListener('mouseleave', this.boundMouseLeave);
      this.boundMouseLeave = null;
    }
    this.hoverAttached = false;
  }
  onScroll() {
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.update();
    });
  }
  update() {
    const vh = window.innerHeight;
    const yCenter = window.scrollY + vh / 2;
    const sTop = this.section.offsetTop;
    const sHeight = this.section.offsetHeight;
    const sBottom = sTop + sHeight;
    if (yCenter < sTop || yCenter > sBottom) {
      this.applyState(-1);
      return;
    }
    const p = Math.max(0, Math.min(1, (yCenter - sTop) / sHeight));
    this.applyState(this.mapState(p));
  }
  mapState(p) {
    const n = this.steps.length;
    if (n <= 0) return -1;
    return Math.min(n - 1, Math.max(0, Math.floor(p * n)));
  }
  setActive(index) {
    const n = this.steps.length;
    if (index < 0 || index >= n) {
      this.applyState(-1);
    } else {
      this.applyState(index);
    }
  }
  applyState(state) {
    if (state === this.lastState) return;
    this.lastState = state;
    this.steps.forEach((step, idx) => {
      const active = state >= 0 && idx === state;
      step.classList.toggle('is-active', active);
      step.classList.toggle('is-inactive', state >= 0 && idx !== state);
    });
  }
}
