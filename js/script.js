// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    // Función para cambiar el header según el scroll
    function handleScroll() {
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        if (window.scrollY > heroHeight - 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Escuchar el evento scroll
    window.addEventListener('scroll', handleScroll);
    
    // Llamar una vez al cargar para establecer el estado inicial
    handleScroll();
    
    // Toggle del menú
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Funcionalidad de reproducción secuencial de videos
    const videos = [
        document.getElementById('video1'),
        document.getElementById('video2'),
        document.getElementById('video3')
    ].filter(video => video !== null); // Filtrar videos que no existen
    
    let currentVideoIndex = 0;
    let isTransitioning = false;
    
    function playNextVideo() {
        if (isTransitioning || videos.length === 0) return;
        
        isTransitioning = true;
        const currentVideo = videos[currentVideoIndex];
        const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videos[nextVideoIndex];
        
        if (nextVideo) {
            // Preparar el siguiente video
            nextVideo.currentTime = 0;
            nextVideo.style.opacity = '0';
            nextVideo.classList.add('active');
            
            // Iniciar la reproducción del siguiente video (silencioso)
            nextVideo.play().catch(error => {
                console.log(`Error reproduciendo video ${nextVideoIndex + 1}:`, error);
            });
            
            // Transición suave: fade out actual, fade in siguiente
            setTimeout(() => {
                if (currentVideo) {
                    currentVideo.style.opacity = '0';
                }
                nextVideo.style.opacity = '1';
                
                // Remover la clase active del video anterior después de la transición
                setTimeout(() => {
                    if (currentVideo) {
                        currentVideo.classList.remove('active');
                        currentVideo.pause();
                    }
                    currentVideoIndex = nextVideoIndex;
                    isTransitioning = false;
                }, 300);
            }, 50);
        } else {
            isTransitioning = false;
        }
    }
    
    // Configurar eventos para cada video
    videos.forEach((video, index) => {
        if (video) {
            video.addEventListener('ended', function() {
                playNextVideo();
            });
            
            video.addEventListener('error', function() {
                console.log(`Error en video ${index + 1}, saltando al siguiente`);
                setTimeout(() => playNextVideo(), 500);
            });
            
            // Configurar para bucle continuo
            video.loop = false; // Controlamos el bucle manualmente
            video.muted = true; // Asegurar que esté silenciado
            video.preload = 'auto'; // Precargar videos
            
            // Asegurar que solo el primer video esté visible inicialmente
            if (index !== 0) {
                video.classList.remove('active');
                video.style.opacity = '0';
            } else {
                video.style.opacity = '1';
                video.classList.add('active');
            }
        }
    });
    
    // Iniciar el primer video
    if (videos.length > 0 && videos[0]) {
        console.log('Iniciando primer video:', videos[0].src);
        videos[0].currentTime = 0;
        videos[0].play().then(() => {
            console.log('Primer video iniciado correctamente');
        }).catch(error => {
            console.log('Error iniciando primer video:', error);
            // Si el primer video falla, intentar con el siguiente
            setTimeout(() => playNextVideo(), 500);
        });
    } else {
        console.log('No hay videos disponibles para reproducir');
    }

    // Funcionalidad de animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con la clase animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});