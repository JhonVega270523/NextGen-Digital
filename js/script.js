document.addEventListener('DOMContentLoaded', function() {
    // ---- LÓGICA CLAVE PARA FORZAR RECARGA Y RESETEO DEL FORMULARIO ----
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
        // Construye la URL sin el parámetro 'reset'
        const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        // Recarga la página con la URL limpia, evitando que la URL con el parámetro quede en el historial
        window.location.replace(newUrl);
        // Detiene la ejecución del script aquí para que la recarga ocurra inmediatamente
        return;
    }
    // ------------------------------------------------------------------

    // Asegurarse de que la página siempre cargue en la parte superior.
    // Aunque la recarga forzada ya lo hará, lo mantenemos como una doble seguridad.
    window.scrollTo(0, 0);

    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Opcional: Cerrar la navbar de Bootstrap en móviles después de hacer clic
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                // Simula un clic para cerrar el menú desplegable
                navbarToggler.click();
            }
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

        // Animación de la navbar al hacer scroll (cambiar color/fondo)
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) { // Si el scroll es mayor a 50px
            navbar.classList.add('navbar-scrolled'); // Agrega una clase para cambiar el estilo
        } else {
            navbar.classList.remove('navbar-scrolled');
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
        // Deshabilita F12 (Developer Tools) y otras combinaciones para abrir las Dev Tools
        if (event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) ||
            (event.metaKey && event.altKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))) {
            event.preventDefault();
        }
        // Deshabilita Ctrl+U / Cmd+U (Ver Código Fuente)
        if ((event.ctrlKey && event.key.toUpperCase() === 'U') || (event.metaKey && event.key.toUpperCase() === 'U')) {
            event.preventDefault();
        }
    });
});

// --- Bloqueo de Funciones de Desarrollador ---
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    // F12
            if (e.keyCode == 123) {
                e.preventDefault();
            }
            // Ctrl+Shift+I (Windows/Linux) o Cmd+Option+I (Mac)
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                e.preventDefault();
            }
            // Ctrl+Shift+J (Windows/Linux) o Cmd+Option+J (Mac)
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                e.preventDefault();
            }
            // Ctrl+U (Ver código fuente)
            if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                e.preventDefault();
            }
            // Ctrl+S (Guardar página)
            if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
                e.preventDefault();
            }
});