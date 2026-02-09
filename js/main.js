/**
 * Component Loader & Main JS
 * Colegio Federico Villarreal Website - Refactored
 */

// Component loader utility
const ComponentLoader = {
    /**
     * Load HTML component from external file
     * @param {string} componentPath - Path to component file
     * @param {string} targetSelector - CSS selector for target element
     */
    async loadComponent(componentPath, targetSelector) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            const html = await response.text();
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = html;
            } else {
                console.warn(`Target element not found: ${targetSelector}`);
            }
        } catch (error) {
            console.error("Error loading component:", error);
        }
    },

    /**
     * Load all components defined in the mapping
     */
    async loadAll() {
        const components = [
            { path: 'components/header.html', target: '#header-component' },
            { path: 'components/hero.html', target: '#hero-component' },
            { path: 'components/about.html', target: '#about-component' },
            { path: 'components/achievements.html', target: '#achievements-component' },
            { path: 'components/teachers.html', target: '#teachers-component' },
            { path: 'components/levels.html', target: '#levels-component' },
            { path: 'components/proposal.html', target: '#proposal-component' },
            { path: 'components/contact.html', target: '#contact-component' },
            { path: 'components/footer.html', target: '#footer-component' }
        ];

        // Load all components in parallel
        await Promise.all(
            components.map(comp => this.loadComponent(comp.path, comp.target))
        );

        // Initialize after components are loaded
        this.initializeAfterLoad();

        // Initialize Level Modals (New)
        initLevelModals();
    },

    /**
     * Initialize functionality after components are loaded
     */
    initializeAfterLoad() {
        // Initialize AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: false,
                mirror: true,
                offset: 100,
                duration: 800,
                easing: 'ease-out-cubic',
            });
        }

        // Initialize scroll effects
        initScrollEffects();

        // Initialize Mobile Menu
        initMobileMenu();
    }
};

/**
 * Data for Level Modals
 */
const levelData = {
    inicial: {
        title: "Nivel Inicial",
        subtitle: "3, 4 y 5 años",
        color: "from-primary to-primary-light", // Green gradient
        icon: "fa-shapes", // Icono personalizado
        description: "En nuestro nivel inicial, nos enfocamos en el desarrollo integral del niño a través del juego y la exploración. Nuestro método estimula la creatividad, la socialización y el desarrollo emocional en un ambiente seguro y acogedor.",
        features: [
            "Estimulación Temprana y Sensorial",
            "Iniciación a la lectura y escritura",
            "Taller de Psicomotricidad",
            "Inglés recreativo"
        ],
        benefits: [
            "Aulas climatizadas y multimedia",
            "Seguimiento psicológico personalizado",
            "Áreas de juegos exclusivas",
            "Docentes especializadas en primera infancia"
        ]
    },
    primaria: {
        title: "Nivel Primaria",
        subtitle: "1° a 6° Grado",
        color: "from-secondary to-yellow-400", // Gold gradient
        icon: "fa-book-open", // Icono personalizado
        description: "Formamos una base sólida de conocimientos y valores. Fomentamos el pensamiento crítico, la investigación y el trabajo en equipo, preparando a los estudiantes para los retos académicos del futuro.",
        features: [
            "Matemática Lúdica y Razonada",
            "Plan Lector Intensivo",
            "Ciencia y Tecnología experimental",
            "Arte y Cultura"
        ],
        benefits: [
            "Laboratorio de Computación",
            "Talleres deportivos (Fútbol, Vóley)",
            "Inglés intensivo por niveles",
            "Tutoría permanente"
        ]
    },
    secundaria: {
        title: "Nivel Secundaria",
        subtitle: "1° a 5° Año",
        color: "from-primary-dark to-green-900", // Dark Green gradient
        icon: "fa-microscope", // Icono personalizado
        description: "Potenciamos las habilidades académicas y personales de nuestros estudiantes. Nuestro sistema pre-universitario desde los últimos años garantiza un alto nivel de competitividad y éxito en admisiones universitarias.",
        features: [
            "Sistema Pre-Universitario",
            "Círculos de Estudio Avanzado",
            "Orientación Vocacional",
            "Desarrollo de proyectos de investigación"
        ],
        benefits: [
            "Laboratorios de física y química",
            "Simulacros tipo admisión semanaes",
            "Certificación en ofimática",
            "Convenios universitarios"
        ]
    },
    academia: {
        title: "Academia Pre-U",
        subtitle: "Preparación Exclusiva",
        color: "from-accent to-red-600", // Red gradient
        icon: "fa-graduation-cap", // Icono personalizado
        description: "Somos especialistas en el ingreso a la Universidad Nacional de Piura (UNP) y otras universidades de prestigio. Nuestro sistema intensivo y plana docente experta maximizan tus posibilidades de ingreso.",
        features: [
            "Sistema Modular por carreras",
            "Simulacros diarios y ranking",
            "Seminarios dominicales",
            "Banco de preguntas actualizado"
        ],
        benefits: [
            "Plana docente universitaria",
            "Material didáctico exclusivo",
            "Asesoría académica personalizada",
            "Test vocacional computarizado"
        ]
    },
    ceba: {
        title: "CEBA Villarreal",
        subtitle: "Educación Básica Alternativa",
        color: "from-blue-600 to-blue-400", // Blue gradient
        icon: "fa-user-clock", // Icono personalizado
        description: "Nunca es tarde para terminar tus estudios. Nuestro programa CEBA permite concluir la primaria o secundaria en corto tiempo con horarios flexibles adaptados a personas que trabajan.",
        features: [
            "Ciclos acelerados (2 grados en 1 año)",
            "Horarios: Mañana, Tarde, Noche y Sabatino",
            "Modalidad Semipresencial y A Distancia",
            "Convalidación de estudios previos"
        ],
        benefits: [
            "Certificado oficial a nombre de la Nación",
            "Material de estudio auto-instructivo",
            "Plataforma virtual de apoyo",
            "Costos accesibles"
        ]
    }
};

/**
 * Initialize Level Modals Logic
 */
function initLevelModals() {
    // Event delegation for opening modals (since elements might be properly ready or re-injected)
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.level-modal-trigger');
        if (trigger) {
            e.preventDefault();
            const level = trigger.dataset.level;
            openLevelModal(level);
        }

        // Close buttons inputs
        if (e.target.closest('.close-modal-btn') || e.target.id === 'modal-backdrop') {
            closeLevelModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLevelModal();
        }
    });

    // Make close function global for inline onclicks if needed
    window.closeLevelModal = closeLevelModal;
}

/**
 * Toggle the extra team section in teachers component
 */
function toggleTeam() {
    const extraTeam = document.getElementById('extra-team');
    const btnText = document.getElementById('toggle-team-text');
    const btnIcon = document.getElementById('toggle-team-icon');

    if (!extraTeam) return;

    if (extraTeam.classList.contains('hidden')) {
        // Show
        extraTeam.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            extraTeam.classList.remove('opacity-0', 'translate-y-10');
            extraTeam.classList.add('opacity-100', 'translate-y-0');
        }, 10);

        btnText.textContent = "Ver menos";
        btnIcon.classList.remove('fa-arrow-down');
        btnIcon.classList.add('fa-arrow-up');
    } else {
        // Hide
        extraTeam.classList.remove('opacity-100', 'translate-y-0');
        extraTeam.classList.add('opacity-0', 'translate-y-10');

        // Wait for transition to finish
        setTimeout(() => {
            extraTeam.classList.add('hidden');
        }, 700);

        btnText.textContent = "Conoce a todo el equipo";
        btnIcon.classList.remove('fa-arrow-up');
        btnIcon.classList.add('fa-arrow-down');
    }
}
// Make global
window.toggleTeam = toggleTeam;

/**
 * Open the modal with specific level data
 * @param {string} levelKey - Key to look up in levelData
 */
function openLevelModal(levelKey) {
    const data = levelData[levelKey];
    if (!data) return;

    const modal = document.getElementById('level-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');
    const headerBg = document.getElementById('modal-header-bg');

    // UI Elements
    const titleEl = document.getElementById('modal-title');
    const subtitleEl = document.getElementById('modal-subtitle');
    const descEl = document.getElementById('modal-description');
    const featuresList = document.getElementById('modal-features');
    const benefitsList = document.getElementById('modal-benefits');
    const iconEl = document.getElementById('modal-icon');

    // Populate Data
    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    descEl.textContent = data.description;

    // Update Icon
    if (iconEl && data.icon) {
        iconEl.className = `fas ${data.icon} text-4xl text-white`;
    }

    // Update Header Color
    headerBg.className = `md:w-[38%] relative flex flex-col items-center justify-center p-12 text-center text-white overflow-hidden bg-gradient-to-br ${data.color}`;

    // Populate Lists helper con diseño Ultra-Minimalista
    const createListItems = (items, colorClass) => {
        return items.map((item, index) => `
            <li class="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300" 
                style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s backwards;">
                <div class="w-2 h-2 rounded-full ${colorClass} group-hover:scale-150 transition-transform duration-300"></div>
                <span class="text-sm md:text-base text-slate-700 font-medium">${item}</span>
            </li>
        `).join('');
    };

    featuresList.innerHTML = createListItems(data.features, 'bg-primary');
    benefitsList.innerHTML = createListItems(data.benefits, 'bg-secondary');

    // Show Modal with Animation
    modal.classList.remove('hidden');

    // Slight delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('opacity-0', 'translate-y-4', 'sm:scale-95');
        panel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close the level modal
 */
function closeLevelModal() {
    const modal = document.getElementById('level-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');

    if (!modal || modal.classList.contains('hidden')) return;

    // Start transition out
    backdrop.classList.add('opacity-0');
    panel.classList.add('opacity-0', 'translate-y-4', 'sm:scale-95');
    panel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');

    // Wait for transition to finish before hiding
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scroll
    }, 300); // Match transition duration
}

/**
 * Initialize scroll-based effects
 */
function initScrollEffects() {
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');
    const menuIcon = menuBtn?.querySelector('i');

    if (!menuBtn || !mobileMenu) return;

    let isMenuOpen = false;

    // Toggle menu
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Open menu
            mobileMenu.classList.remove('scale-y-0', 'opacity-0');
            mobileMenu.classList.add('scale-y-100', 'opacity-100');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            menuBtn.classList.add('rotate-90');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            // Close menu
            mobileMenu.classList.remove('scale-y-100', 'opacity-100');
            mobileMenu.classList.add('scale-y-0', 'opacity-0');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            menuBtn.classList.remove('rotate-90');
            document.body.style.overflow = ''; // Restore scroll
        }
    };

    // Button click event
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking on links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            toggleMenu();
        }
    });
}

/**
 * Initialize on DOM ready
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("🎓 Colegio Federico Villarreal - Website Loaded");

    // Load all components
    ComponentLoader.loadAll();

    // Mobile menu toggle (if needed in future) (Now handled by initMobileMenu inside ComponentLoader, but kept for safety if button exists outside components)
});

/**
 * Export for potential module usage
 */
if (typeof module !== "undefined" && module.exports) {
    module.exports = { ComponentLoader };
}
