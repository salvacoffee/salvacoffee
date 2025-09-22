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
        
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        
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
    
    // Manejo del hover en proceso items
    initProcesoHover();
});

// Función para manejar el cambio de texto en proceso items
function initProcesoHover() {
    const procesoItems = document.querySelectorAll('.proceso-item');
    
    procesoItems.forEach(item => {
        const descripcion = item.querySelector('.proceso-descripcion');
        const shortText = item.dataset.short;
        const longText = item.dataset.long;
        
        // Set initial text
        descripcion.textContent = shortText;
        
        // Mouse enter - show long text
        item.addEventListener('mouseenter', () => {
            descripcion.textContent = longText;
        });
        
        // Mouse leave - show short text
        item.addEventListener('mouseleave', () => {
            descripcion.textContent = shortText;
        });
    });
}

// Preload de imágenes para mejor performance del carrusel
function preloadImages() {
    const imageUrls = [
        'assets/hero.png',
        'assets/hero1.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Ejecutar preload cuando la página cargue
window.addEventListener('load', preloadImages);

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
