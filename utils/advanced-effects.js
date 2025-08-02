// ===== EFECTOS AVANZADOS ADICIONALES =====

// Efecto de confeti
function createConfetti() {
    const colors = ['#007bff', '#00d4ff', '#28a745', '#ffc107', '#dc3545', '#6f42c1'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Efecto de ondas de sonido
function createSoundWaves() {
    const wavesContainer = document.createElement('div');
    wavesContainer.style.position = 'fixed';
    wavesContainer.style.bottom = '20px';
    wavesContainer.style.left = '20px';
    wavesContainer.style.zIndex = '1000';
    wavesContainer.style.pointerEvents = 'none';
    
    document.body.appendChild(wavesContainer);
    
    setInterval(() => {
        const wave = document.createElement('div');
        wave.style.width = '2px';
        wave.style.height = '20px';
        wave.style.backgroundColor = '#007bff';
        wave.style.margin = '0 2px';
        wave.style.display = 'inline-block';
        wave.style.animation = 'sound-wave 1s ease-in-out infinite';
        
        wavesContainer.appendChild(wave);
        
        setTimeout(() => wave.remove(), 1000);
    }, 100);
}

// Efecto de texto flotante
function createFloatingText(text, x, y) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.position = 'fixed';
    floatingText.style.left = x + 'px';
    floatingText.style.top = y + 'px';
    floatingText.style.color = '#007bff';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.fontSize = '14px';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.zIndex = '10000';
    floatingText.style.userSelect = 'none';
    
    document.body.appendChild(floatingText);
    
    const animation = floatingText.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: 'translateY(-50px)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => floatingText.remove();
}

// Efecto de pantalla completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Efecto de modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Efecto de zoom en imágenes
function initImageZoom() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '10000';
            overlay.style.cursor = 'pointer';
            
            const zoomedImg = document.createElement('img');
            zoomedImg.src = img.src;
            zoomedImg.style.maxWidth = '90%';
            zoomedImg.style.maxHeight = '90%';
            zoomedImg.style.objectFit = 'contain';
            
            overlay.appendChild(zoomedImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        });
    });
}

// Efecto de contador animado
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Efecto de scroll infinito
function initInfiniteScroll() {
    let isLoading = false;
    
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && !isLoading) {
            isLoading = true;
            // Aquí puedes cargar más contenido
            setTimeout(() => {
                isLoading = false;
            }, 1000);
        }
    });
}

// Efecto de búsqueda en tiempo real
function initLiveSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            const elements = document.querySelectorAll('.searchable');
            
            elements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query)) {
                    element.style.display = 'block';
                    element.style.animation = 'highlight 0.5s ease';
                } else {
                    element.style.display = 'none';
                }
            });
        }, 300);
    });
}

// Efecto de notificaciones
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Efecto de carga de página
function showPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3">Cargando página...</p>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    document.body.appendChild(loader);
    
    return loader;
}

// Efecto de tooltip personalizado
function initCustomTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = element.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            element.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
            });
        });
    });
}

// Exportar funciones para uso global
window.AdvancedEffects = {
    createConfetti,
    createSoundWaves,
    createFloatingText,
    toggleFullscreen,
    toggleDarkMode,
    initImageZoom,
    animateCounter,
    initInfiniteScroll,
    initLiveSearch,
    showNotification,
    showPageLoader,
    initCustomTooltips
}; 