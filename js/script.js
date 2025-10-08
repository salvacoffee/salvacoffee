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
    ];
    
    let currentVideoIndex = 0;
    
    function playNextVideo() {
        // Ocultar video actual
        videos[currentVideoIndex].classList.remove('active');
        
        // Avanzar al siguiente video
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        
        // Mostrar y reproducir siguiente video
        videos[currentVideoIndex].classList.add('active');
        videos[currentVideoIndex].currentTime = 0;
        videos[currentVideoIndex].play();
    }
    
    // Configurar eventos para cada video
    videos.forEach((video, index) => {
        video.addEventListener('ended', function() {
            playNextVideo();
        });
        
        // Asegurar que solo el primer video esté visible inicialmente
        if (index !== 0) {
            video.classList.remove('active');
        }
    });
    
    // Iniciar el primer video
    if (videos[0]) {
        videos[0].play();
    }
});