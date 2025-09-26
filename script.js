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
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar');
            
            // Agregar efecto especial para elementos específicos
            if (entry.target.classList.contains('habilidad-progreso')) {
                const relleno = entry.target.querySelector('.relleno');
                if (relleno) {
                    const width = relleno.style.width;
                    relleno.style.width = '0';
                    setTimeout(() => {
                        relleno.style.transition = 'width 1.8s cubic-bezier(0.23, 1, 0.32, 1)';
                        relleno.style.width = width;
                    }, 150);
                }
            }
        }
    });
}, observerOptions);

// Seleccionar todos los elementos que deben animarse al hacer scroll
document.querySelectorAll('.experiencia-item, .educacion-item, .certificacion-item, .voluntariado-item, .proyecto-item, .stat, .habilidad, .habilidad-progreso').forEach(el => {
    el.classList.add('elemento-animado');
    observer.observe(el);
});

// Efecto para mostrar más información al pasar el mouse sobre proyectos
document.querySelectorAll('.proyecto-item, .experiencia-item, .educacion-item, .certificacion-item, .voluntariado-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-12px) scale(1.02)';
        item.style.boxShadow = '0 15px 40px rgba(100, 100, 255, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
});

// Función para animar las estadísticas al hacer scroll hacia ellas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h3');
            if (statElement) {
                const targetValue = parseInt(statElement.getAttribute('data-target'));
                let suffix = statElement.textContent.replace(/\d+/g, '');
                
                // Obtener el sufijo correcto basado en el contexto
                if(entry.target.querySelector('p').textContent.includes('Conexiones')) {
                    suffix = '+';
                } else if(entry.target.querySelector('p').textContent.includes('Experiencia')) {
                    suffix = '+ Años';
                } else if(entry.target.querySelector('p').textContent.includes('Conexiones')) {
                    suffix = '+';
                }
                
                // Solo animar si el número es mayor que 0 y aún no se ha animado
                if (targetValue > 0 && !statElement.dataset.animated) {
                    animateValue(statElement, 0, targetValue, 2000, suffix);
                    statElement.dataset.animated = true;
                }
            }
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Función para animar valores numéricos
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        // Aplicar formato de miles si es necesario
        const formattedValue = value.toLocaleString();
        element.textContent = formattedValue + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Efecto de parallax en el header
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElement = document.querySelector('.header');
    
    if (parallaxElement) {
        const speed = 0.7;
        parallaxElement.style.transform = `translateY(${scrolled * speed * -1}px)`;
    }
    
    // Efecto de header fijo con transparencia
    const header = document.querySelector('.header');
    header.style.background = `rgba(10, 10, 30, ${Math.min(0.1 + scrolled/500, 0.9)})`;
    
    lastScrollY = scrolled;
});

// Efecto de typed animation para el subtítulo
document.addEventListener('DOMContentLoaded', function() {
    const descripcionElement = document.querySelector('.descripcion');
    const text = "Turning Data into Actionable Insights 📊";
    let index = 0;
    let isDeleting = false;
    let currentText = '';
    let letterSpeed = 150;

    function typeEffect() {
        if (isDeleting) {
            currentText = text.substring(0, currentText.length - 1);
        } else {
            currentText = text.substring(0, index + 1);
        }
        
        descripcionElement.textContent = currentText + '|';
        
        if (!isDeleting && currentText === text) {
            letterSpeed = 2000; // Pausa al final
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            letterSpeed = 150;
            isDeleting = false;
            index = 0;
        } else if (isDeleting) {
            index--;
        } else {
            index++;
        }
        
        setTimeout(typeEffect, letterSpeed);
    }
    
    if (descripcionElement) {
        setTimeout(typeEffect, 1000);
    }
    
    // Agregar efecto de particulas al background
    createParticles();
    
    // Agregar efecto de ondas al footer
    addWaveEffect();
});

// Función para crear efecto de partículas en el fondo
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.appendChild(particlesContainer);
    
    // Crear partículas individuales
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            background: rgba(100, 255, 218, 0.5);
            border-radius: 50%;
            pointer-events: none;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float${Math.floor(Math.random() * 3)} 15s infinite linear;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        
        // Definir animaciones CSS para las partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float0 {
                0% { transform: translate(0, 0); }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            }
            @keyframes float1 {
                0% { transform: translate(0, 0); }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            }
            @keyframes float2 {
                0% { transform: translate(0, 0); }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            }
        `;
        document.head.appendChild(style);
        
        particlesContainer.appendChild(particle);
    }
}

// Función para agregar efecto de ondas al footer
function addWaveEffect() {
    const waveContainer = document.querySelector('.pie-pagina');
    if (waveContainer) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 50px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.15' fill='%2364ffda'%3E%3C/path%3E%3C/svg%3E") repeat-x;
            transform: translateX(-50%);
            animation: wave 12s linear infinite;
            z-index: -1;
        `;
        
        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes wave {
                0% { transform: translateX(-50%) translateZ(0px); }
                50% { transform: translateX(-50%) translateZ(-25%); }
                100% { transform: translateX(-50%) translateZ(-50%); }
            }
        `;
        document.head.appendChild(style);
        
        waveContainer.style.position = 'relative';
        waveContainer.appendChild(wave);
    }
}

// Efecto de brillo en habilidades al pasar el mouse
document.querySelectorAll('.habilidad').forEach(habilidad => {
    habilidad.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(100, 255, 218, 0.2)';
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.5)';
    });
    
    habilidad.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(100, 255, 218, 0.1)';
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Funcionalidad para descargar CV en PDF (simulación)
document.getElementById('downloadCv')?.addEventListener('click', function() {
    // Mostrar efecto visual al hacer clic
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
    
    setTimeout(() => {
        alert('Funcionalidad de descarga PDF. En una implementación real, esto generaría y descargaría tu CV en formato PDF.');
        this.innerHTML = '<i class="fas fa-download"></i> Descargar CV';
    }, 1500);
});

// Función para manejar botones de compartir en redes sociales
function compartirEnRedSocial(red) {
    const url = window.location.href;
    const title = 'Rubén D. Quispe - Systems Engineer & Data Analytics Specialist';
    
    let shareUrl = '';
    
    switch(red) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Agregar efecto de "ciber-destello" al hacer clic en cualquier parte
document.addEventListener('click', function(e) {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(100,255,218,0.8) 0%, rgba(100,255,218,0) 70%);
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        pointer-events: none;
        z-index: 9999;
        animation: flash 0.6s ease-out forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 600);
});

// Función para alternar modo noche/día (demo)
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Agregar o quitar clase que invierte los colores
    if (body.classList.contains('dark-mode')) {
        document.documentElement.style.setProperty('--bg-primary', '#0f0c29');
        document.documentElement.style.setProperty('--text-primary', '#e0e0e0');
    } else {
        document.documentElement.style.setProperty('--bg-primary', '#f8f9fa');
        document.documentElement.style.setProperty('--text-primary', '#333');
    }
}

// Inicializar tooltip personalizado
function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        let tooltip;
        
        const showTooltip = (e) => {
            tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.85);
                color: #64ffda;
                padding: 8px 15px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 10000;
                pointer-events: none;
                border: 1px solid rgba(100, 255, 218, 0.3);
                backdrop-filter: blur(5px);
                box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
                white-space: nowrap;
                animation: tooltipAppear 0.3s ease forwards;
            `;
            
            // Posicionar tooltip
            const rect = el.getBoundingClientRect();
            tooltip.style.left = rect.left + window.scrollX + 'px';
            tooltip.style.top = rect.top + window.scrollY - 40 + 'px';
            
            document.body.appendChild(tooltip);
        };
        
        const hideTooltip = () => {
            if (tooltip && tooltip.parentNode) {
                tooltip.style.animation = 'tooltipDisappear 0.3s ease forwards';
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }
        };
        
        // Agregar animaciones CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes tooltipAppear {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes tooltipDisappear {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(10px); }
            }
        `;
        document.head.appendChild(style);
        
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

// Ejecutar la inicialización de tooltips
document.addEventListener('DOMContentLoaded', initTooltips);

// Función para mostrar una alerta de notificación
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 
                    type === 'error' ? 'rgba(231, 76, 60, 0.9)' : 
                    'rgba(52, 152, 219, 0.9)'};
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(120%);
        transition: transform 0.4s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover después de un tiempo
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Ejemplo de uso de notificación (podría ser llamado al cargar la página)
// showNotification('¡Bienvenido a mi CV interactivo!', 'success');

// Función para manejar el envío del formulario de contacto
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Validar que los campos no estén vacíos
    if (!nombre || !email || !asunto || !mensaje) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío del formulario
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular proceso de envío
    setTimeout(() => {
        // En una implementación real, aquí enviarías los datos del formulario a través de AJAX o Fetch API
        showNotification('¡Mensaje enviado exitosamente! Gracias por contactarme.', 'success');
        
        // Resetear el formulario
        this.reset();
        
        // Restaurar el botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Función para generar código animado
function generarCodigoAnimado() {
    const codigoLines = [
        "def analyze_data(dataset):",
        "    insights = []",
        "    for data in dataset:",
        "        if data.pattern:",
        "            insights.append(extract_insight(data))",
        "    return insights",
        "",
        "class MachineLearningAgent:",
        "    def __init__(self):",
        "        self.model = self.train_model()",
        "",
        "    def predict(self, input_data):",
        "        return self.model.predict(input_data)",
        "",
        "df = pd.read_csv('data.csv')",
        "model = train_model(df)",
        "predictions = model.predict(new_data)",
        "",
        "console.log('IA Agent initialized...');",
        "const dataProcessor = new DataProcessor();",
        "dataProcessor.analyze(realTimeData);",
        "",
        "{",
        "  \"ai_agent\": \"active\",",
        "  \"status\": \"processing\",",
        "  \"data_streams\": 5,",
        "  \"insights_generated\": 247",
        "}",
        "",
        "// Algoritmo de análisis de datos",
        "for (let i = 0; i < data.length; i++) {",
        "  if (data[i].value > threshold) {",
        "    triggerInsight(data[i]);",
        "  }",
        "}"
    ];
    
    const codigoContainer = document.getElementById('codigoAnimado');
    
    // Crear 15 líneas de código animadas
    for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.className = 'codigo-linea';
        line.textContent = codigoLines[Math.floor(Math.random() * codigoLines.length)];
        line.style.animationDelay = `${Math.random() * 10}s`;
        line.style.left = `${Math.random() * 100}%`;
        codigoContainer.appendChild(line);
    }
}

// Función para inicializar terminal interactiva
function initTerminal() {
    const terminal = document.getElementById('terminal');
    const content = document.getElementById('terminalContent');
    
    // Mostrar terminal después de 5 segundos para sorpresa
    setTimeout(() => {
        terminal.style.display = 'block';
        terminal.style.animation = 'fadeIn 1s ease';
        
        // Agregar efecto de parpadeo al cursor
        setInterval(() => {
            const lastLine = content.querySelector('.terminal-line:last-child');
            if (lastLine) {
                const output = lastLine.querySelector('.terminal-output');
                if (output) {
                    output.innerHTML = output.innerHTML.replace(/\|$/, '') + (output.innerHTML.endsWith('|') ? '' : '|');
                }
            }
        }, 500);
    }, 5000);
}

// Función para escribir en la terminal
function escribirEnTerminal(texto, delay = 100) {
    const content = document.getElementById('terminalContent');
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt">user@ruben-quispe:~$</span> <span class="terminal-output">${texto}|</span>`;
    content.appendChild(line);
    content.scrollTop = content.scrollHeight;
}

// Función para ejecutar comandos simulados en la terminal
function ejecutarComandoTerminal(comando) {
    const content = document.getElementById('terminalContent');
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="terminal-prompt">user@ruben-quispe:~$</span> <span class="terminal-output">${comando}</span>`;
    content.appendChild(promptLine);
    
    // Simular procesamiento
    setTimeout(() => {
        let respuesta = '';
        
        switch(comando.toLowerCase()) {
            case 'help':
                respuesta = 'Comandos disponibles: about, skills, projects, experience, clear';
                break;
            case 'about':
                respuesta = 'Rubén D. Quispe - Systems Engineer | Data Analytics Specialist';
                break;
            case 'skills':
                respuesta = 'Python, JavaScript, SQL, Machine Learning, Data Analysis, AI Agents';
                break;
            case 'projects':
                respuesta = '1. IEEE Computer Society UTP Website\n2. AR Project Creation\n3. Productivity Mobile App';
                break;
            case 'experience':
                respuesta = 'NTT DATA Europe & Latam - Systems Engineer\nIEEE UTP Perú - Web Master Team';
                break;
            case 'clear':
                content.innerHTML = '';
                return;
            default:
                respuesta = `Comando no reconocido: ${comando}. Escribe 'help' para ver comandos disponibles.`;
        }
        
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line';
        outputLine.innerHTML = `<span class="terminal-output">${respuesta}</span>`;
        content.appendChild(outputLine);
        content.scrollTop = content.scrollHeight;
    }, 500);
}

// Función para alternar la visibilidad de la terminal
function toggleTerminal() {
    const terminal = document.getElementById('terminal');
    if (terminal.style.display === 'none' || !terminal.style.display) {
        terminal.style.display = 'block';
        escribirEnTerminal('Terminal activada...', 0);
    } else {
        terminal.style.display = 'none';
    }
}

// Función para inicializar efectos de IA y Data Science
function initIAEffects() {
    // Crear más elementos de gráficos animados para IA/Data Science
    const iaContainer = document.querySelector('.ia-data-container');
    const graficoTipos = [
        '<i class="fas fa-project-diagram"></i>', // Gráfico de red
        '<i class="fas fa-chart-line"></i>',     // Gráfico de línea
        '<i class="fas fa-brain"></i>',          // Cerebro de IA
        '<i class="fas fa-database"></i>',       // Base de datos
        '<i class="fas fa-robot"></i>'           // Robot
    ];
    
    for (let i = 0; i < 8; i++) {
        const grafico = document.createElement('div');
        grafico.className = 'grafico-animado';
        grafico.style.top = `${Math.random() * 100}%`;
        grafico.style.left = `${Math.random() * 100}%`;
        grafico.style.animationDuration = `${15 + Math.random() * 15}s`;
        grafico.innerHTML = graficoTipos[Math.floor(Math.random() * graficoTipos.length)];
        grafico.style.fontSize = `${20 + Math.random() * 20}px`;
        grafico.style.display = 'flex';
        grafico.style.alignItems = 'center';
        grafico.style.justifyContent = 'center';
        grafico.style.color = '#64ffda';
        iaContainer.appendChild(grafico);
    }
}

// Función para crear efecto de ondulación en habilidades
function initHabilidadesWave() {
    document.querySelectorAll('.habilidad-progreso').forEach((bar, index) => {
        // Agregar efecto de ondulación al hacer hover
        bar.addEventListener('mouseenter', () => {
            const relleno = bar.querySelector('.relleno');
            relleno.style.background = 'linear-gradient(90deg, #fc00ff, #00dbde, #fc00ff)';
            relleno.style.backgroundSize = '200% 100%';
            relleno.style.animation = 'wave 0.5s linear infinite';
        });
        
        bar.addEventListener('mouseleave', () => {
            const relleno = bar.querySelector('.relleno');
            relleno.style.background = 'linear-gradient(90deg, #00dbde, #fc00ff)';
            relleno.style.backgroundSize = '100% 100%';
            relleno.style.animation = 'shine 2s infinite';
        });
    });
    
    // Agregar animación CSS para el efecto de onda
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wave {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar todas las funciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    generarCodigoAnimado();
    initTerminal();
    initIAEffects();
    initHabilidadesWave();
    
    // Agregar eventos para la terminal
    document.addEventListener('keydown', function(e) {
        if (e.key === '`') { // Usar la tecla ` para abrir/cerrar la terminal
            toggleTerminal();
        }
    });
    
    // Comandos de terminal simulados
    setTimeout(() => {
        if (document.getElementById('terminal').style.display !== 'none') {
            escribirEnTerminal('Sistema IA activado. Escribe "help" para comandos disponibles.', 0);
        }
    }, 6000);
});

// Agregar evento para detectar cuando se escribe en la terminal
document.addEventListener('click', function(e) {
    // Si se hace clic en la terminal, se puede agregar lógica de entrada aquí
    if (e.target.closest('.terminal')) {
        // Lógica para manejar la entrada de texto en la terminal
    }
});

// Función para inicializar el flujo de datos
function initDataFlow() {
    const dataFlow = document.getElementById('dataFlow');
    
    // Crear nodos de datos
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'data-node';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.animation = `pulseAnimation ${3 + Math.random() * 4}s infinite`;
        dataFlow.appendChild(node);
    }
    
    // Crear enlaces entre nodos
    for (let i = 0; i < 10; i++) {
        const link = document.createElement('div');
        link.className = 'data-link';
        const angle = Math.random() * 360;
        const length = 50 + Math.random() * 100;
        link.style.width = `${length}px`;
        link.style.top = `${Math.random() * 100}%`;
        link.style.left = `${Math.random() * 100}%`;
        link.style.transform = `rotate(${angle}deg)`;
        dataFlow.appendChild(link);
    }
}

// Función para inicializar el asistente de IA
function initAIAssistant() {
    const aiAssistant = document.getElementById('aiAssistant');
    
    aiAssistant.addEventListener('click', function() {
        this.classList.toggle('open');
    });
}

// Función para comandos del asistente de IA
function aiAssistantCommand(comando) {
    switch(comando) {
        case 'skills':
            showNotification('Mis habilidades principales: Python, JavaScript, SQL, Machine Learning, Data Analysis, IA Agents', 'success');
            break;
        case 'projects':
            showNotification('Proyectos destacados: IEEE Computer Society UTP Website, AR Project Creation, Productivity Mobile App', 'success');
            break;
        case 'contact':
            showNotification('Contáctame: ruben.quispev@gmail.com | +51 987 654 321', 'success');
            break;
        default:
            showNotification('Comando no reconocido', 'error');
    }
}

// Función para manejar enlaces de contacto
function initContactLinks() {
    // Actualizar enlaces de contacto con información real
    const emailLink = document.querySelector('a[data-email]');
    const phoneLink = document.querySelector('a[data-phone]');
    
    if(emailLink) {
        emailLink.addEventListener('click', function(e) {
            showNotification('Copiado al portapapeles: ' + this.textContent, 'success');
        });
    }
    
    if(phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            showNotification('Marcando: ' + this.textContent, 'success');
        });
    }
}

// Función para inicializar el control de tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    let isDarkMode = false;
    
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        this.classList.toggle('dark', isDarkMode);
        
        if (isDarkMode) {
            document.body.style.background = 'linear-gradient(45deg, #0f0c29, #302b63, #24243e)';
            showNotification('Modo IA activado', 'success');
        } else {
            document.body.style.background = 'linear-gradient(45deg, #0f0c29, #302b63, #24243e)';
            showNotification('Modo normal activado', 'success');
        }
    });
}

// Función para inicializar la timeline interactiva
function initTimeline() {
    // Esta función se puede expandir para crear una línea de tiempo animada
    // con las experiencias y educación
    document.querySelectorAll('.experiencia-item, .educacion-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Función para inicializar microinteracciones
function initMicroInteractions() {
    // Agregar efectos de microinteracción a elementos específicos
    document.querySelectorAll('.experiencia-item, .educacion-item, .certificacion-item, .voluntariado-item, .proyecto-item').forEach(item => {
        item.classList.add('micro-interaccion');
    });
}

// Inicializar todas las funciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    generarCodigoAnimado();
    initTerminal();
    initIAEffects();
    initHabilidadesWave();
    initDataFlow();
    initAIAssistant();
    initThemeToggle();
    initTimeline();
    initMicroInteractions();
    initContactLinks();
    
    // Agregar eventos para la terminal
    document.addEventListener('keydown', function(e) {
        if (e.key === '`') { // Usar la tecla ` para abrir/cerrar la terminal
            toggleTerminal();
        }
    });
    
    // Comandos de terminal simulados
    setTimeout(() => {
        if (document.getElementById('terminal') && document.getElementById('terminal').style.display !== 'none') {
            escribirEnTerminal('Sistema IA activado. Escribe "help" para comandos disponibles.', 0);
        }
    }, 6000);
});