// Función para desplazamiento suave al hacer clic en los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Ajustar el desplazamiento para compensar la barra de navegación
                behavior: 'smooth'
            });
        }
    });
});

// Función para mostrar elementos al hacer scroll (animación de aparición)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar');
        }
    });
}, observerOptions);

// Seleccionar todos los elementos que deben animarse al hacer scroll
document.querySelectorAll('.experiencia-item, .educacion-item, .certificacion-item, .voluntariado-item, .proyecto-item, .stat, .habilidad, .habilidad-progreso').forEach(el => {
    el.classList.add('elemento-animado');
    observer.observe(el);
});

// Agregar efecto de animación a las barras de habilidades cuando entran en vista
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const relleno = entry.target.querySelector('.relleno');
            if (relleno) {
                // Obtener el ancho original del relleno
                const width = relleno.style.width;
                // Reiniciar el ancho a 0
                relleno.style.width = '0';
                // Reproducir la animación después de un pequeño retraso
                setTimeout(() => {
                    relleno.style.transition = 'width 1.5s ease';
                    relleno.style.width = width;
                }, 300);
            }
            barObserver.unobserve(entry.target); // Dejar de observar después de la animación
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.habilidad-progreso').forEach(bar => {
    barObserver.observe(bar);
});

// Efecto para mostrar más información al pasar el mouse sobre proyectos
document.querySelectorAll('.proyecto-item').forEach(proyecto => {
    proyecto.addEventListener('mouseenter', () => {
        proyecto.style.transform = 'translateY(-10px)';
        proyecto.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
    });
    
    proyecto.addEventListener('mouseleave', () => {
        proyecto.style.transform = 'translateY(0)';
        proyecto.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
});

// Función para alternar la visibilidad de información sensible que requiere login
function toggleSensitiveInfo() {
    const sensitiveElements = document.querySelectorAll('[title*="Hidden"], [class*="hidden"]');
    
    sensitiveElements.forEach(el => {
        if (el.style.display === 'none' || !el.style.display) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

// Función para animar las estadísticas al hacer scroll hacia ellas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h3');
            if (statElement) {
                const targetValue = parseInt(statElement.textContent.replace(/[^\d]/g, ''));
                
                // Solo animar si el número es mayor que 0 y aún no se ha animado
                if (targetValue > 0 && !statElement.dataset.animated) {
                    animateValue(statElement, 0, targetValue, 2000);
                    statElement.dataset.animated = true;
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Función para animar valores numéricos
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (end === 500 ? '+' : (end === 1000 ? 'K' : ''));
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Función para agregar un efecto de parallax suave en el header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.header');
    
    if (parallaxElement) {
        const speed = 0.5;
        parallaxElement.style.backgroundPositionY = -(scrolled * speed) + 'px';
    }
});

// Función para manejar el envío del formulario de contacto
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // En una implementación real, aquí enviarías los datos del formulario
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
    
    // Limpiar el formulario
    this.reset();
});

// Funcionalidad para descargar CV en PDF (simulación)
document.getElementById('downloadCv')?.addEventListener('click', function() {
    alert('Funcionalidad de descarga PDF. En una implementación real, esto generaría y descargaría tu CV en formato PDF.');
});

// Inicializar tooltips (si se agregan)
function initTooltips() {
    // Agregar tooltips a elementos que lo necesiten
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Crear tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            
            // Posicionar tooltip
            const rect = el.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
            
            document.body.appendChild(tooltip);
            
            // Mostrar tooltip
            setTimeout(() => {
                tooltip.style.opacity = 1;
            }, 10);
            
            // Guardar referencia para eliminarlo después
            el._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', () => {
            if (el._tooltip) {
                el._tooltip.style.opacity = 0;
                setTimeout(() => {
                    if (el._tooltip && el._tooltip.parentNode) {
                        el._tooltip.parentNode.removeChild(el._tooltip);
                        el._tooltip = null;
                    }
                }, 300);
            }
        });
    });
}

// Ejecutar la inicialización de tooltips
document.addEventListener('DOMContentLoaded', initTooltips);

// Función para manejar botones de compartir en redes sociales
function compartirEnRedSocial(red) {
    const url = window.location.href;
    const title = 'Rubén D. Quispe - Systems Engineer & Data Analytics Specialist';
    
    let shareUrl = '';
    
    switch(red) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Agregar contadores de tiempo de experiencia (simulación)
function actualizarContadores() {
    const contadores = document.querySelectorAll('.contador-tiempo');
    
    contadores.forEach(contador => {
        const anos = parseInt(contador.dataset.anos) || 0;
        const meses = parseInt(contador.dataset.meses) || 0;
        
        // En una implementación real, calcular años y meses de experiencia
        contador.textContent = `${anos} años ${meses} meses`;
    });
}