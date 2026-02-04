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
            console.error('Error loading component:', error);
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
    }
};

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
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 Colegio Federico Villarreal - Website Loaded');

    // Load all components
    ComponentLoader.loadAll();

    // Mobile menu toggle (if needed in future)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Mobile menu logic here
            console.log('Mobile menu clicked');
        });
    }
});

/**
 * Export for potential module usage
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ComponentLoader };
}
