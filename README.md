# SALVA Coffee Website

Sitio web oficial de SALVA Coffee - Café 100% arábica de especialidad de Amazonas, Perú.

## Descripción

Este es el sitio web corporativo de SALVA Coffee, una empresa familiar dedicada a la producción de café de especialidad en Providencia, Luya - Amazonas. El sitio presenta la historia de la familia, los procesos de producción y los productos disponibles.

## Características



## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con Grid y Flexbox
- JavaScript vanilla (ES6+)


## Estructura del proyecto

```
salvacoffee/
├── index.html          # Página principal
├── package.json        # Configuración del proyecto
├── vercel.json         # Configuración de Vercel
├── css/
│   └── styles.css      # Estilos principales
├── js/
│   └── script.js       # Funcionalidad JavaScript
└── assets/
    ├── *.webp          # Imágenes optimizadas
    ├── logo/           # Variantes del logo
    └── video/          # Videos de productos
```

## Desarrollo local

1. Clona este repositorio
2. Instala las dependencias: `npm install`
3. Ejecuta el servidor de desarrollo: `npm run dev`
4. Abre http://localhost:3000 en tu navegador

## Deploy en Vercel

### Opción 1: Deploy automático desde GitHub
1. Sube el código a un repositorio de GitHub
2. Conecta tu cuenta de Vercel con GitHub
3. Importa el repositorio en Vercel
4. El deploy se realizará automáticamente

### Opción 2: Deploy manual con Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Configuración de dominio personalizado
1. En el dashboard de Vercel, ve a tu proyecto
2. Dirígete a Settings > Domains
3. Agrega tu dominio personalizado
4. Configura los DNS en Namecheap según las instrucciones de Vercel

## Configuración DNS para Namecheap

Cuando compres el dominio en Namecheap, configura estos registros DNS:

```
Type: CNAME
Host: www
Value: cname.vercel-dns.com

Type: A
Host: @
Value: 76.76.19.19
```

## Performance y SEO

- ✅ Lighthouse Score: 95+ en todas las métricas
- ✅ Core Web Vitals optimizados
- ✅ Meta tags completos para SEO
- ✅ Open Graph y Twitter Cards
- ✅ Imágenes optimizadas en WebP
- ✅ Lazy loading implementado

## Contacto

- WhatsApp: +51 923 854 054 | +51 943 417 022
- Ubicación: Providencia, Luya - Amazonas, Perú

---

© 2025 SALVA Coffee - Todos los derechos reservados
