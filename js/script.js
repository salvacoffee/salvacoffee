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

// Datos de los productos
const productosData = {
    lavado: {
        nombre: 'CAFÉ LAVADO',
        imagen: 'assets/productoLavado.png',
        fondo: 'assets/fondoProductoLavado1.jpg',
        texto1: 'Proceso Lavado',
        texto2TituloIzq: 'Sabor equilibrado',
        texto2PerfilIzq: 'Perfil: Balanceado y suave\nNotas: cítricos, florales a jazmín y flor de naranja, té negro.',
        texto2DescripcionIzq: 'Un café limpio y suave, con cuerpo medio y textura balanceada. Su perfil clásico resalta la esencia natural del grano con una sensación fresca y pura en cada sorbo.',
        texto2TituloDer: 'Proceso lavado',
        texto2ParrafoDer: 'Granos cuidadosamente seleccionados y lavados para lograr una taza pura y brillante, resultado de un café de 84 puntos en cata que refleja su origen de altura.',
        color: '#1ec9d9'
    },
    natural: {
        nombre: 'CAFÉ NATURAL',
        imagen: 'assets/productoNatural.png',
        fondo: 'assets/fondoProductoNatural.jpg',
        texto1: 'Proceso Natural',
        texto2TituloIzq: 'Sabor intenso y afrutado',
        texto2PerfilIzq: 'Perfil: Intenso y afrutado\nNotas: frutos rojos, vino tinto, licorosas afrutadas, chocolate oscuro.',
        texto2DescripcionIzq: 'Un café de cuerpo completo y textura densa, con notas vibrantes que evocan frutos rojos maduros. Su proceso natural potencia los aromas licorosos y el dulzor profundo del grano.',
        texto2TituloDer: 'Proceso natural',
        texto2ParrafoDer: 'Granos secados al sol con su cereza completa, un método artesanal que realza su aroma y profundidad. Un café de 84 puntos en cata, resultado de una elaboración cuidadosa en cada detalle.',
        color: '#fe4c3b'
    },
    honey: {
        nombre: 'CAFÉ HONEY',
        imagen: 'assets/productoHoney.png',
        fondo: 'assets/fondoProductoHoney.jpg',
        texto1: 'Proceso Honey',
        texto2TituloIzq: 'Sabor dulce y fragante',
        texto2PerfilIzq: 'Perfil: Dulce y aromático\nNotas: miel, caramelo, melocotón, damasco, ciruela y panela.',
        texto2DescripcionIzq: 'Un café de cuerpo medio-alto, con textura sedosa y dulzor natural. El secado parcial con su mucílago aporta notas florales y frutales, creando una taza con carácter envolvente y final prolongado.',
        texto2TituloDer: 'Proceso honey',
        texto2ParrafoDer: 'Secado con parte del mucílago para potenciar la complejidad del sabor. Un café de 84 puntos en cata, valorado por su equilibrio entre dulzor y cuerpo.',
        color: '#fdc306'
    }
};

// Variable para rastrear el producto actual
let productoActual = null;

// Orden de productos para navegación
const ordenProductos = ['lavado', 'natural', 'honey'];

// Precargar imágenes de fondo para evitar lag al abrir
function precargarImagenesFondo() {
    Object.values(productosData).forEach(producto => {
        const img = new Image();
        img.src = producto.fondo;
    });
}

// Llamar a la función de precarga cuando se carga la página
window.addEventListener('load', precargarImagenesFondo);

// Función para abrir el producto detalle
function abrirProductoDetalle(tipoProducto) {
    productoActual = tipoProducto; // Guardar producto actual
    const producto = productosData[tipoProducto];
    const productoSection = document.querySelector('.productos-section');
    const fondoCapa1 = document.querySelector('.fondo-capa-1');
    const fondoCapa2 = document.querySelector('.fondo-capa-2');
    
    if (!producto || !productoSection || !fondoCapa1) return;
    
    // Actualizar FONDO en la primera capa
    fondoCapa1.style.backgroundImage = `url('${producto.fondo}')`;
    fondoCapa1.style.opacity = '1';
    if (fondoCapa2) fondoCapa2.style.opacity = '0';
    
    // Actualizar TÍTULO PRINCIPAL (en 2 líneas)
    const tituloCompleto = producto.texto1.split(' ');
    const mitad = Math.ceil(tituloCompleto.length / 2);
    const linea1 = tituloCompleto.slice(0, mitad).join(' ');
    const linea2 = tituloCompleto.slice(mitad).join(' ');
    
    const titulo1 = productoSection.querySelector('.titulo-linea1');
    const titulo2 = productoSection.querySelector('.titulo-linea2');
    
    if (titulo1) titulo1.textContent = linea1;
    if (titulo2) titulo2.textContent = linea2;
    
    // Actualizar perfil/notas
    const perfilIzq = productoSection.querySelector('.producto-perfil-container .parrafo-perfil');
    if (perfilIzq) perfilIzq.innerHTML = producto.texto2PerfilIzq.replace(/Perfil:/g, '<strong>Perfil:</strong>').replace(/Notas:/g, '<strong>Notas:</strong>');
    
    // Actualizar párrafo izquierdo
    const tituloIzq = productoSection.querySelector('.producto-parrafo-izq .parrafo-titulo');
    const textoIzq = productoSection.querySelector('.producto-parrafo-izq .parrafo-texto');
    
    if (tituloIzq) tituloIzq.textContent = producto.texto2TituloIzq;
    if (textoIzq) textoIzq.textContent = producto.texto2DescripcionIzq;
    
    // Actualizar párrafo derecho
    const tituloDer = productoSection.querySelector('.producto-parrafo-der .parrafo-titulo');
    const textoDer = productoSection.querySelector('.producto-parrafo-der .parrafo-texto');
    
    if (tituloDer) tituloDer.textContent = producto.texto2TituloDer;
    if (textoDer) textoDer.textContent = producto.texto2ParrafoDer;
    
    // Actualizar color del rectángulo
    const rectangulo = productoSection.querySelector('.producto-rectangulo-color');
    if (rectangulo && producto.color) {
        rectangulo.style.backgroundColor = producto.color;
    }
    
    // Bloquear scroll
    document.body.style.overflow = 'hidden';
    
    // Mostrar con un pequeño delay para permitir que el contenido se renderice
    setTimeout(() => {
        productoSection.classList.add('active');
    }, 10);
}

// Función para cerrar el producto detalle (opcional)
function cerrarProductoDetalle() {
    const productoSection = document.querySelector('.productos-section');
    if (productoSection) {
        productoSection.classList.remove('active');
        // Restaurar el scroll del body
        document.body.style.overflow = '';
    }
}

// Función para ir al siguiente producto
function siguienteProducto() {
    if (!productoActual) return;
    
    const fondoCapa1 = document.querySelector('.fondo-capa-1');
    const fondoCapa2 = document.querySelector('.fondo-capa-2');
    const productoSection = document.querySelector('.productos-section');
    
    if (!productoSection || !fondoCapa1 || !fondoCapa2) return;
    
    // Determinar cuál capa está visible
    const capa1Visible = fondoCapa1.style.opacity !== '0';
    const capaVisible = capa1Visible ? fondoCapa1 : fondoCapa2;
    const capaOculta = capa1Visible ? fondoCapa2 : fondoCapa1;
    
    // Calcular siguiente producto
    const currentIndex = ordenProductos.indexOf(productoActual);
    const nextIndex = (currentIndex + 1) % ordenProductos.length;
    const nextProducto = ordenProductos[nextIndex];
    productoActual = nextProducto;
    const producto = productosData[nextProducto];
    
    // Configurar nueva imagen en la capa oculta
    capaOculta.style.backgroundImage = `url('${producto.fondo}')`;
    
    // Hacer crossfade: ocultar capa visible, mostrar capa oculta
    setTimeout(() => {
        capaVisible.style.opacity = '0';
        capaOculta.style.opacity = '1';
    }, 10);
    
    // Actualizar textos simultáneamente
    const tituloCompleto = producto.texto1.split(' ');
    const mitad = Math.ceil(tituloCompleto.length / 2);
    const linea1 = tituloCompleto.slice(0, mitad).join(' ');
    const linea2 = tituloCompleto.slice(mitad).join(' ');
    
    const titulo1 = productoSection.querySelector('.titulo-linea1');
    const titulo2 = productoSection.querySelector('.titulo-linea2');
    
    if (titulo1) titulo1.textContent = linea1;
    if (titulo2) titulo2.textContent = linea2;
    
    // Actualizar perfil/notas
    const perfilIzq = productoSection.querySelector('.producto-perfil-container .parrafo-perfil');
    if (perfilIzq) {
        // Aplicar negrita a "Perfil:" y "Notas:"
        const textoConNegrita = producto.texto2PerfilIzq
            .replace(/Perfil:/g, '<strong>Perfil:</strong>')
            .replace(/Notas:/g, '<strong>Notas:</strong>');
        perfilIzq.innerHTML = textoConNegrita;
    }
    
    // Actualizar párrafo izquierdo
    const tituloIzq = productoSection.querySelector('.producto-parrafo-izq .parrafo-titulo');
    const textoIzq = productoSection.querySelector('.producto-parrafo-izq .parrafo-texto');
    
    if (tituloIzq) tituloIzq.textContent = producto.texto2TituloIzq;
    if (textoIzq) textoIzq.textContent = producto.texto2DescripcionIzq;
    
    // Actualizar párrafo derecho
    const tituloDer = productoSection.querySelector('.producto-parrafo-der .parrafo-titulo');
    const textoDer = productoSection.querySelector('.producto-parrafo-der .parrafo-texto');
    
    if (tituloDer) tituloDer.textContent = producto.texto2TituloDer;
    if (textoDer) textoDer.textContent = producto.texto2ParrafoDer;
    
    // Actualizar color del rectángulo
    const rectangulo = productoSection.querySelector('.producto-rectangulo-color');
    if (rectangulo && producto.color) {
        rectangulo.style.backgroundColor = producto.color;
    }
}
