const ComponentLoader = {
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
            { path: 'components/legal.html', target: '#legal-component' },
            { path: 'components/footer.html', target: '#footer-component' }
        ];

        await Promise.all(
            components.map(comp => this.loadComponent(comp.path, comp.target))
        );

        this.initializeAfterLoad();

        initLevelModals();
    },

    initializeAfterLoad() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: false,
                mirror: true,
                offset: 100,
                duration: 800,
                easing: 'ease-out-cubic',
            });
        }

        initScrollEffects();

        initMobileMenu();
    }
};

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

function initLevelModals() {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.level-modal-trigger');
        if (trigger) {
            e.preventDefault();
            const level = trigger.dataset.level;
            openLevelModal(level);
        }

        if (e.target.closest('.close-modal-btn') || e.target.id === 'modal-backdrop') {
            closeLevelModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLevelModal();
        }
    });

    window.closeLevelModal = closeLevelModal;
}

function toggleTeam() {
    const extraTeam = document.getElementById('extra-team');
    const btnText = document.getElementById('toggle-team-text');
    const btnIcon = document.getElementById('toggle-team-icon');

    if (!extraTeam) return;

    if (extraTeam.classList.contains('hidden')) {
        extraTeam.classList.remove('hidden');
        setTimeout(() => {
            extraTeam.classList.remove('opacity-0', 'translate-y-10');
            extraTeam.classList.add('opacity-100', 'translate-y-0');
        }, 10);

        btnText.textContent = "Ver menos";
        btnIcon.classList.remove('fa-arrow-down');
        btnIcon.classList.add('fa-arrow-up');
    } else {
        extraTeam.classList.remove('opacity-100', 'translate-y-0');
        extraTeam.classList.add('opacity-0', 'translate-y-10');

        setTimeout(() => {
            extraTeam.classList.add('hidden');
        }, 700);

        btnText.textContent = "Conoce a todo el equipo";
        btnIcon.classList.remove('fa-arrow-up');
        btnIcon.classList.add('fa-arrow-down');
    }
}
window.toggleTeam = toggleTeam;

function openLevelModal(levelKey) {
    const data = levelData[levelKey];
    if (!data) return;

    const modal = document.getElementById('level-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');
    const headerBg = document.getElementById('modal-header-bg');

    const titleEl = document.getElementById('modal-title');
    const subtitleEl = document.getElementById('modal-subtitle');
    const descEl = document.getElementById('modal-description');
    const featuresList = document.getElementById('modal-features');
    const benefitsList = document.getElementById('modal-benefits');
    const iconEl = document.getElementById('modal-icon');

    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    descEl.textContent = data.description;

    if (iconEl && data.icon) {
        iconEl.className = `fas ${data.icon} text-4xl text-white`;
    }

    headerBg.className = `md:w-[38%] relative flex flex-col items-center justify-center p-12 text-center text-white overflow-hidden bg-gradient-to-br ${data.color}`;

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

    modal.classList.remove('hidden');

    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('opacity-0', 'translate-y-4', 'sm:scale-95');
        panel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
    }, 10);

    document.body.style.overflow = 'hidden';
}

function closeLevelModal() {
    const modal = document.getElementById('level-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');

    if (!modal || modal.classList.contains('hidden')) return;

    backdrop.classList.add('opacity-0');
    panel.classList.add('opacity-0', 'translate-y-4', 'sm:scale-95');
    panel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

const ModalManager = {
    open(type) {
        const modal = document.getElementById(`${type}-modal`);
        const backdrop = document.getElementById(`${type}-backdrop`);
        const panel = document.getElementById(`${type}-panel`);

        if (!modal) return;

        modal.classList.remove('hidden');

        setTimeout(() => {
            if (backdrop) backdrop.classList.remove('opacity-0');
            if (panel) {
                panel.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
                panel.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            }
        }, 10);

        document.body.style.overflow = 'hidden';

        if (type === 'suggestions' || type === 'complaints') {
            CAPTCHA.generate(type);
        }
    },

    close(type) {
        const modal = document.getElementById(`${type}-modal`);
        const backdrop = document.getElementById(`${type}-backdrop`);
        const panel = document.getElementById(`${type}-panel`);

        if (!modal || modal.classList.contains('hidden')) return;

        if (backdrop) backdrop.classList.add('opacity-0');
        if (panel) {
            panel.classList.add('opacity-0', 'translate-y-8', 'scale-95');
            panel.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        }

        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 500);
    }
};

window.openLegalModal = (type) => ModalManager.open(type);
window.closeLegalModal = (type) => ModalManager.close(type);

const CAPTCHA = {
    current: { suggestions: 0, complaints: 0 },
    fixed: {
        suggestions: { n1: 6, n2: 4 },
        complaints: { n1: 5, n2: 7 }
    },

    generate(type) {
        const pair = this.fixed[type];
        const n1 = pair ? pair.n1 : (Math.floor(Math.random() * 9) + 1);
        const n2 = pair ? pair.n2 : (Math.floor(Math.random() * 9) + 1);
        this.current[type] = n1 + n2;
        const textEl = document.getElementById(`${type}-captcha-text`);
        if (textEl) {
            const iconClass = type === 'suggestions' ? 'text-primary' : 'text-accent';
            const label = type === 'suggestions' ? 'SEGURIDAD' : 'VALIDACIÓN';
            textEl.innerHTML = `<i class="fas fa-shield-alt ${iconClass}"></i> ${label}: ¿${n1} + ${n2}?`;
        }
        const inputEl = document.getElementById(`${type}-captcha-input`);
        if (inputEl) inputEl.value = '';
    },

    validate(type) {
        const inputEl = document.getElementById(`${type}-captcha-input`);
        if (!inputEl) return false;
        const inputVal = parseInt(inputEl.value);
        return inputVal === this.current[type];
    }
};

async function handleSuggestionsSubmit(event) {
    event.preventDefault();
    if (!CAPTCHA.validate('suggestions')) {
        alert(" La validación de seguridad es incorrecta. Inténtalo de nuevo.");
        CAPTCHA.generate('suggestions');
        return;
    }
    const name = document.getElementById('suggestion-name')?.value || 'Usuario';
    alert(` ¡Gracias ${name}! Tu sugerencia ha sido recibida.`);
    ModalManager.close('suggestions');
    event.target.reset();
}

async function handleComplaintsSubmit(event) {
    event.preventDefault();
    if (!CAPTCHA.validate('complaints')) {
        alert(" La validación matemática es incorrecta.");
        CAPTCHA.generate('complaints');
        return;
    }
    const name = document.getElementById('comp-name')?.value || 'Usuario';
    alert(` Registro oficial exitoso. Sr(a). ${name}, su reclamo ha sido registrado.`);
    ModalManager.close('complaints');
    event.target.reset();
}

window.handleSuggestionsSubmit = handleSuggestionsSubmit;
window.handleComplaintsSubmit = handleComplaintsSubmit;

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

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');
    const menuIcon = menuBtn?.querySelector('i');

    if (!menuBtn || !mobileMenu) return;

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('scale-y-0', 'opacity-0');
            mobileMenu.classList.add('scale-y-100', 'opacity-100');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            menuBtn.classList.add('rotate-90');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('scale-y-100', 'opacity-100');
            mobileMenu.classList.add('scale-y-0', 'opacity-0');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            menuBtn.classList.remove('rotate-90');
            document.body.style.overflow = '';
        }
    };

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            toggleMenu();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Colegio Federico Villarreal - Pagina Cargada");
    ComponentLoader.loadAll();
});

function handleContactFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('parent-name').value;
    const email = document.getElementById('parent-email').value;
    const level = document.getElementById('interest-level').value;

    const whatsappNumber = "51980160029";
    const message = `Hola, solicito información para el Proceso de Admisión 2026.%0A%0A*Datos del Apoderado:*%0A- *Nombre:* ${name}%0A- *Correo:* ${email}%0A- *Nivel de interés:* ${level}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
}

window.handleContactFormSubmit = handleContactFormSubmit;

if (typeof module !== "undefined" && module.exports) {
    module.exports = { ComponentLoader };
}
