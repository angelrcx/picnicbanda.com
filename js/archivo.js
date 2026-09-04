document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.collage-container');
    // Obtenemos todas las imágenes y las convertimos en un Arreglo (Array)
    let imagenes = Array.from(document.querySelectorAll('.img-collage'));
    
    // 1. BARAJAR (SHUFFLE) LAS IMÁGENES
    // Esto cambia el orden del arreglo aleatoriamente cada que abres la página
    imagenes.sort(() => Math.random() - 0.5);

    // 2. REINSERTAR AL HTML EN EL NUEVO ORDEN
    imagenes.forEach(img => contenedor.appendChild(img));

    // Elementos de la galería
    const cajaLuz = document.getElementById('caja-luz-galeria');
    const imagenAmpliada = document.getElementById('imagen-ampliada-galeria');
    const btnCerrar = document.getElementById('cerrar-galeria');
    const flechaIzq = document.getElementById('flecha-izq');
    const flechaDer = document.getElementById('flecha-der');
    
    let indiceActual = 0;
    // Guardamos las rutas en base al nuevo orden aleatorio
    const rutasImagenes = imagenes.map(img => img.src);

    // 3. EFECTO COLLAGE AMONTONADO
    imagenes.forEach((img, index) => {
        // Desplazamiento aleatorio para el toque desordenado
        const moverX = (Math.random() * 40 - 20).toFixed(1); 
        const moverY = (Math.random() * 40 - 20).toFixed(1);
        
        // Z-index aleatorio para que unas tapen a otras al azar
        const capaZ = Math.floor(Math.random() * 50);

        img.style.transform = `translate(${moverX}%, ${moverY}%)`;
        img.style.position = 'relative';
        img.style.zIndex = capaZ;

        // Abrir Galería
        img.addEventListener('click', () => {
            indiceActual = index;
            actualizarImagen();
            cajaLuz.style.display = 'flex';
        });
    });

    // 4. NAVEGACIÓN DE LA GALERÍA
    function actualizarImagen() {
        imagenAmpliada.src = rutasImagenes[indiceActual];
    }

    flechaIzq.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceActual = (indiceActual > 0) ? indiceActual - 1 : rutasImagenes.length - 1;
        actualizarImagen();
    });

    flechaDer.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceActual = (indiceActual < rutasImagenes.length - 1) ? indiceActual + 1 : 0;
        actualizarImagen();
    });

    // Cerrar
    btnCerrar.addEventListener('click', () => {
        cajaLuz.style.display = 'none';
    });

    cajaLuz.addEventListener('click', (e) => {
        if (e.target === cajaLuz) {
            cajaLuz.style.display = 'none';
        }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (cajaLuz.style.display === 'flex') {
            if (e.key === 'ArrowLeft') flechaIzq.click();
            if (e.key === 'ArrowRight') flechaDer.click();
            if (e.key === 'Escape') btnCerrar.click();
        }
    });
});