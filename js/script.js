// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
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
        document.getElementById('video3'),
        document.getElementById('video4')
    ].filter(video => video !== null); // Filtrar videos que no existen
    
    let currentVideoIndex = 0;
    let isTransitioning = false;
    
    function playNextVideo() {
        if (isTransitioning || videos.length === 0) return;
        
        isTransitioning = true;
        const currentVideo = videos[currentVideoIndex];
        
        // Fade out del video actual
        currentVideo.style.opacity = '0';
        
        setTimeout(() => {
            // Ocultar video actual
            currentVideo.classList.remove('active');
            
            // Avanzar al siguiente video
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            const nextVideo = videos[currentVideoIndex];
            
            // Preparar siguiente video
            nextVideo.currentTime = 0;
            nextVideo.style.opacity = '0';
            nextVideo.classList.add('active');
            
            // Fade in del siguiente video
            setTimeout(() => {
                nextVideo.style.opacity = '1';
                nextVideo.play().catch(error => {
                    console.log('Error reproduciendo video:', error);
                    // Si hay error, intentar con el siguiente video
                    setTimeout(() => playNextVideo(), 1000);
                });
                isTransitioning = false;
            }, 100);
        }, 500); // Tiempo de fade out
    }
    
    // Configurar eventos para cada video
    videos.forEach((video, index) => {
        if (video) {
            video.addEventListener('ended', function() {
                playNextVideo();
            });
            
            video.addEventListener('error', function() {
                console.log(`Error en video ${index + 1}, saltando al siguiente`);
                setTimeout(() => playNextVideo(), 1000);
            });
            
            // Asegurar que solo el primer video esté visible inicialmente
            if (index !== 0) {
                video.classList.remove('active');
                video.style.opacity = '0';
            } else {
                video.style.opacity = '1';
            }
        }
    });
    
    // Iniciar el primer video
    if (videos.length > 0 && videos[0]) {
        videos[0].play().catch(error => {
            console.log('Error iniciando primer video:', error);
            // Si el primer video falla, intentar con el siguiente
            setTimeout(() => playNextVideo(), 1000);
        });
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