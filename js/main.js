document.addEventListener('DOMContentLoaded', () => {
    const cajaLuz = document.getElementById('caja-luz');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    
    // Solo aplicamos el efecto a las imágenes que queremos que se amplíen
    const imagenesGaleria = document.querySelectorAll('.centered_image');

    imagenesGaleria.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            cajaLuz.style.display = 'flex';
            imagenAmpliada.src = img.src;
        });
    });

    cajaLuz.addEventListener('click', () => {
        cajaLuz.style.display = 'none';
    });
});