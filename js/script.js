document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lógica del botón "Scroll to Top"
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Mostrar u ocultar el botón basado en el scroll
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    // Al hacer clic en el botón, hacer scroll hacia arriba
    scrollToTopBtn.addEventListener("click", function() {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    });

    // Deshabilitar inspección y clic derecho (medida disuasoria, no segura)
    // ADVERTENCIA: Esta es una medida superficial y NO es una solución de seguridad.
    // Los usuarios expertos pueden eludirla fácilmente. La seguridad real se gestiona en el backend.
    document.addEventListener('contextmenu', event => event.preventDefault()); // Deshabilita el clic derecho
    document.addEventListener('keydown', event => {
        // Deshabilita F12 (Developer Tools)
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C')) || (event.metaKey && event.altKey && (event.key === 'I' || event.key === 'J' || event.key === 'C'))) {
            event.preventDefault();
            alert("Acceso a herramientas de desarrollo deshabilitado."); // Mensaje opcional
        }
        // Deshabilita Ctrl+U / Cmd+U (Ver Código Fuente)
        if ((event.ctrlKey && event.key === 'u') || (event.metaKey && event.key === 'u')) {
            event.preventDefault();
            alert("Acceso al código fuente deshabilitado."); // Mensaje opcional
        }
    });

    // Animación de la navbar al hacer scroll (cambiar color/fondo)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Si el scroll es mayor a 50px
            navbar.classList.add('navbar-scrolled'); // Agrega una clase para cambiar el estilo
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});