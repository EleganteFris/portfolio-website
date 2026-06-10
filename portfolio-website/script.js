// Añade una pequeña animación extra cuando el usuario hace hover en el título principal
const mainTitle = document.querySelector('header h1');
mainTitle.addEventListener('mouseover', () => {
    mainTitle.style.textShadow = "0 0 15px rgba(0, 176, 255, 0.8)";
});
mainTitle.addEventListener('mouseout', () => {
    mainTitle.style.textShadow = "none";
});
