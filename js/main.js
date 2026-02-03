/**
 * Main JavaScript File for Erp-ColegioFedericoVillareal
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('ERP System Loaded');

    // Example interaction: Navbar scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Dynamic component loader (Conceptual - for simple implementation without build tools)
    // In a real app, you might use fetch() to load HTML partials, but for this structure
    // we will keep components statically in index.html or assume a backend concatenates them.
});
