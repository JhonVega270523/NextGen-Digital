document.addEventListener('DOMContentLoaded', function() {
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    
    // Ocultar preloader inmediatamente para carga instantánea
    if (preloader) {
        preloader.style.display = 'none';
    }

    // ---- LÓGICA CLAVE PARA FORZAR RECARGA Y RESETEO DEL FORMULARIO ----
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
        const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        window.location.replace(newUrl);
        return;
    }

    // Asegurarse de que la página siempre cargue en la parte superior
    window.scrollTo(0, 0);

    // ===== SMOOTH SCROLLING OPTIMIZADO =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Cerrar la navbar de Bootstrap en móviles inmediatamente
                const navbarToggler = document.querySelector('.custom-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                
                // Scroll suave optimizado (300ms)
                const targetPosition = target.offsetTop - 80; // Ajuste para navbar fijo
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.onscroll = function() {
        // Mostrar/ocultar botón scroll to top
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
            scrollToTopBtn.style.opacity = "1";
        } else {
            scrollToTopBtn.style.opacity = "0";
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === "0") {
            scrollToTopBtn.style.display = "none";
                }
            }, 300);
        }

        // Animación de la navbar al hacer scroll
        const navbar = document.getElementById('mainNavbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // ===== ANIMACIONES DE SCROLL =====
        animateOnScroll();
    };

    // Scroll to top functionality instantáneo
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo(0, 0);
    });

    // ===== ANIMACIONES DE SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
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

    // Observar elementos con animaciones
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // ===== EFECTOS HOVER MEJORADOS =====
    document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== NAVIGATION ACTIVE STATE =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-item-custom');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ===== FORM VALIDATION MEJORADA =====
    // Manejar formularios de manera individual para asegurar funcionamiento
    document.addEventListener('DOMContentLoaded', function() {
        // Formulario de contacto
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                console.log('Formulario de contacto enviado');
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Enviando...';
                    submitBtn.disabled = true;
                    
                    // Permitir envío normal
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        }

        // Formulario de comentarios
        const commentForm = document.querySelector('.comment-form-about');
        if (commentForm) {
            commentForm.addEventListener('submit', function(e) {
                console.log('Formulario de comentarios enviado');
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Enviando...';
                    submitBtn.disabled = true;
                    
                    // Permitir envío normal
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        }
    });

    // ===== LAZY LOADING PARA IMÁGENES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== TYPING EFFECT =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplicar typing effect al título principal si existe
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    // ===== WHATSAPP BUTTON PULSE EFFECT =====
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // ===== SCROLL PROGRESS BAR =====
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Crear barra de progreso si no existe
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(45deg, #007bff, #00d4ff);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ===== NAVBAR TOGGLER ANIMATION =====
    const customToggler = document.querySelector('.custom-toggler');
    if (customToggler) {
        customToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // ===== LOGO HOVER EFFECT =====
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('mouseenter', function() {
            const logoImg = this.querySelector('.logo-img');
            const logoGlow = this.querySelector('.logo-glow');
            
            if (logoImg) logoImg.style.filter = 'drop-shadow(0 0 20px rgba(0, 123, 255, 0.6))';
            if (logoGlow) logoGlow.style.opacity = '1';
        });
        
        logoContainer.addEventListener('mouseleave', function() {
            const logoImg = this.querySelector('.logo-img');
            const logoGlow = this.querySelector('.logo-glow');
            
            if (logoImg) logoImg.style.filter = 'drop-shadow(0 0 10px rgba(0, 123, 255, 0.3))';
            if (logoGlow) logoGlow.style.opacity = '0.5';
        });
    }

    // ===== DESHABILITAR INSPECCIÓN (MEDIDA DISUASORIA) =====
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    document.addEventListener('keydown', event => {
        if (event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) ||
            (event.metaKey && event.altKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))) {
            event.preventDefault();
        }
        if ((event.ctrlKey && event.key.toUpperCase() === 'U') || 
            (event.metaKey && event.key.toUpperCase() === 'U')) {
            event.preventDefault();
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Aplicar throttle a funciones de scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    window.addEventListener('scroll', throttle(animateOnScroll, 100));

    // ===== INITIALIZATION =====
    // Ejecutar animaciones iniciales
    setTimeout(() => {
        animateOnScroll();
        updateActiveNavLink();
    }, 500);

    // ===== EFECTOS VISUALES AVANZADOS =====
    
    // Función createParticles eliminada - efecto de burbujas desactivado

    // Efecto de revelación de texto
    function initTextReveal() {
        const revealElements = document.querySelectorAll('.reveal-text');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.5 });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Efecto de typing mejorado
    function initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-effect');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    element.style.width = ((i + 1) / text.length * 100) + '%';
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        });
    }

    // Efecto de vibración en elementos
    function addVibrateEffect() {
        const vibrateElements = document.querySelectorAll('.vibrate');
        
        vibrateElements.forEach(element => {
            element.addEventListener('click', () => {
                element.classList.add('vibrate');
                setTimeout(() => {
                    element.classList.remove('vibrate');
                }, 300);
            });
        });
    }

    // Efecto de carga progresiva
    function initProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'loading-bar';
        progressBar.style.maxWidth = '100%'; // Prevenir desbordamiento
        document.body.appendChild(progressBar);
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.style.opacity = '0';
                    setTimeout(() => progressBar.remove(), 300);
                }, 500);
            }
            progressBar.style.width = progress + '%';
            progressBar.style.maxWidth = '100%'; // Prevenir desbordamiento
        }, 200);
    }

    // Efecto de parallax mejorado
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Efecto de hover 3D mejorado
    function init3DHoverEffect() {
        const cards3D = document.querySelectorAll('.card-3d');
        
        cards3D.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Efecto de ondas en botones
    function initWaveEffect() {
        const waveButtons = document.querySelectorAll('.btn-wave');
        
        waveButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const wave = document.createElement('span');
                wave.style.position = 'absolute';
                wave.style.left = x + 'px';
                wave.style.top = y + 'px';
                wave.style.width = '0';
                wave.style.height = '0';
                wave.style.borderRadius = '50%';
                wave.style.background = 'rgba(255, 255, 255, 0.3)';
                wave.style.transform = 'translate(-50%, -50%)';
                wave.style.transition = 'width 0.6s, height 0.6s';
                
                button.appendChild(wave);
                
                setTimeout(() => {
                    wave.style.width = '300px';
                    wave.style.height = '300px';
                }, 10);
                
                setTimeout(() => {
                    wave.remove();
                }, 600);
            });
        });
    }

    // Efecto de neón pulsante
    function initNeonEffect() {
        const neonElements = document.querySelectorAll('.neon-text, .neon-shadow');
        
        neonElements.forEach(element => {
            setInterval(() => {
                element.style.textShadow = `
                    0 0 5px currentColor,
                    0 0 10px currentColor,
                    0 0 15px currentColor,
                    0 0 20px currentColor
                `;
                
                setTimeout(() => {
                    element.style.textShadow = `
                        0 0 2px currentColor,
                        0 0 5px currentColor,
                        0 0 8px currentColor,
                        0 0 12px currentColor
                    `;
                }, 1000);
            }, 2000);
        });
    }

    // Efecto de skeleton loading
    function initSkeletonLoading() {
        const skeletonElements = document.querySelectorAll('.skeleton');
        
        skeletonElements.forEach(element => {
            setTimeout(() => {
                element.classList.remove('skeleton');
                element.style.animation = 'fadeIn 0.5s ease-in';
            }, Math.random() * 2000 + 1000);
        });
    }


    // Inicializar todos los efectos
    function initAdvancedEffects() {
        initTextReveal();
        initTypewriterEffect();
        addVibrateEffect();
        initProgressBar();
        initParallaxEffect();
        init3DHoverEffect();
        initWaveEffect();
        initNeonEffect();
        initSkeletonLoading();
    }



    // Ejecutar efectos avanzados después de la carga
    window.addEventListener('load', () => {
        setTimeout(initAdvancedEffects, 1000);
    });
    
    // Eliminar llamada a initSmoothScroll() que causaba retraso
    // initSmoothScroll() se ha integrado en la función de navegación principal

    // ===== MODO LIGHT/DARK =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });
    
    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun nav-icon';
            themeText.textContent = 'Claro';
        } else {
            themeIcon.className = 'fas fa-moon nav-icon';
            themeText.textContent = 'Oscuro';
        }
    }

    // ===== FORMULARIOS CON FORMSPREE =====
    // Formulario de comentarios
    const commentForm = document.querySelector('.comment-form-about');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Cambiar texto del botón
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Enviar a Formspree usando fetch
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Comentario enviado exitosamente!';
                    this.appendChild(successMessage);
                    
                    // Resetear formulario
                    this.reset();
                    
                    // Remover mensaje después de 3 segundos
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                } else {
                    alert('Hubo un error al enviar el comentario. Por favor, intenta nuevamente.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al enviar el comentario. Por favor, intenta nuevamente.');
            })
            .finally(() => {
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Cambiar texto del botón
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Enviar a Formspree usando fetch
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado exitosamente!';
                    this.appendChild(successMessage);
                    
                    // Resetear formulario
                    this.reset();
                    
                    // Remover mensaje después de 3 segundos
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                } else {
                    alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
            })
            .finally(() => {
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ===== SERVICE WORKER (DESHABILITADO) =====
// Comentado para evitar errores 404
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(registrationError => {
                console.log('SW registro falló:', registrationError);
            });
    });
}
*/