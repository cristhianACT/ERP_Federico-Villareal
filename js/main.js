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
        color: "from-primary to-primary-light",
        icon: "fa-shapes",
        description: "Atención de niños de 3, 4 y 5 años respetando sus características psicoevolutivas. Estimulamos el pensamiento reflexivo, la creatividad y la imaginación en contextos reales.",
        features: [
            "Pensamiento reflexivo y juicio crítico",
            "Juego, creatividad e imaginación",
            "Sana convivencia social y natural",
            "Desarrollo de destrezas: Aprender a hacer"
        ],
        benefits: [
            "Herramientas tecnológicas en aula",
            "Vínculo afectivo familiar fortalecido",
            "Práctica constante de valores",
            "Recursos pedagógicos vanguardistas"
        ]
    },
    primaria: {
        title: "Nivel Primaria",
        subtitle: "Formación Integral",
        color: "from-secondary to-yellow-400",
        icon: "fa-book-open",
        description: "Servicio educativo basado en la igualdad, respetando intereses, necesidades y ritmos de aprendizaje. Buscamos el óptimo desarrollo de la personalidad y formación integral.",
        features: [
            "Construcción y toma de decisiones",
            "Identidad ciudadana y valores",
            "Conciencia ambiental y trabajo en equipo",
            "Logro de aprendizajes esperados"
        ],
        benefits: [
            "Uso estratégico de tecnología",
            "Actividad física y deporte",
            "Participación permanente de padres",
            "Desarrollo de todas las áreas curriculares"
        ]
    },
    secundaria: {
        title: "Nivel Secundaria",
        subtitle: "Preparación para la Vida",
        color: "from-primary-dark to-green-900",
        icon: "fa-microscope",
        description: "Fomentamos el aprendizaje autónomo (Aprender a aprender) y la convivencia armónica (Aprender a vivir juntos) para enfrentar con éxito la sociedad real.",
        features: [
            "Aprendizaje autónomo y construcción",
            "Identidad ciudadana y conciencia ambiental",
            "Preparación para el mercado laboral",
            "Habilidades interpersonales y afectivas"
        ],
        benefits: [
            "Tecnología para un mundo cambiante",
            "Actividad física y deporte",
            "Participación de padres de familia",
            "Enfoque en la calidad de vida"
        ]
    },
    academia: {
        title: "Academia Pre-U",
        subtitle: "Éxito Universitario",
        color: "from-accent to-red-600",
        icon: "fa-graduation-cap",
        description: "Institución sólida con 11 años de experiencia en potenciar conocimientos y habilidades. Especialistas en masivos ingresos y primeros puestos en la UNP (Cómputos 2017-2020).",
        features: [
            "Metodología: 40% práctica / 60% teoría",
            "Clases en vivo vía Google Meet",
            "Simulacros y solucionarios sabatinos",
            "Preparación para el éxito profesional"
        ],
        benefits: [
            "Clases grabadas (17 cursos)",
            "Horario flexible: 4pm a 8pm",
            "Plana docente con 11 años de eficacia",
            "Asesorías y nivelación personalizada"
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

    // Populate Lists helper con diseño Ultra-Minimalista Compacto
    const createListItems = (items, colorClass) => {
        return items.map((item, index) => `
            <li class="group flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300" 
                style="animation: fadeInUp 0.5s ease-out ${index * 0.08}s backwards;">
                <div class="w-1.5 h-1.5 rounded-full ${colorClass} group-hover:scale-125 transition-transform duration-300"></div>
                <span class="text-xs md:text-sm text-slate-700 font-medium">${item}</span>
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
 * Handle Contact Form Submission - Redirect to WhatsApp
 * @param {Event} event - Form submission event
 */
function handleContactFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('parent-name').value;
    const email = document.getElementById('parent-email').value;
    const level = document.getElementById('interest-level').value;

    const whatsappNumber = "51980160029";
    const message = `Hola, solicito información para el Proceso de Admisión 2026.%0A%0A*Datos del Apoderado:*%0A- *Nombre:* ${name}%0A- *Correo:* ${email}%0A- *Nivel de interés:* ${level}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Make global for inline onsubmit
window.handleContactFormSubmit = handleContactFormSubmit;

/**
 * Export for potential module usage
 */
if (typeof module !== "undefined" && module.exports) {
    module.exports = { ComponentLoader };
}
