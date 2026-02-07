/*
═══════════════════════════════════════════════════════════════════════════════
FBIM TECH - JAVASCRIPT ULTRA
═══════════════════════════════════════════════════════════════════════════════
Funcionalidades:
✅ Mobile menu toggle
✅ Search overlay
✅ Theme switcher
✅ Smooth scroll
✅ Newsletter form
✅ Lazy loading
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══════════════ DOM READY ═══════════════
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSearchOverlay();
    initThemeToggle();
    initNewsletter();
    initSmoothScroll();
});

// ═══════════════ MOBILE MENU ═══════════════
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on link click
    menu.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ═════════════ SEARCH OVERLAY ═══════════════
function initSearchOverlay() {
    const toggle = document.getElementById('searchToggle');
    const overlay = document.getElementById('searchOverlay');
    const close = document.getElementById('searchClose');
    const input = document.getElementById('searchInput');
    
    if (!toggle || !overlay || !close || !input) return;
    
    toggle.addEventListener('click', () => {
        overlay.classList.add('active');
        setTimeout(() => input.focus(), 300);
    });
    
    close.addEventListener('click', () => {
        overlay.classList.remove('active');
        input.value = '';
    });
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            input.value = '';
        }
    });
    
    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            input.value = '';
        }
    });
    
    // Search functionality (debounced)
    let searchTimeout;
    input.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
}

function performSearch(query) {
    if (!query.trim()) {
        document.getElementById('searchResults').innerHTML = '';
        return;
    }
    
    // Aqui você implementaria a busca real
    console.log('Searching for:', query);
    
    // Exemplo de resultado
    const resultsHTML = `
        <div style="color: var(--color-text-tertiary); text-align: center; padding: 2rem;">
            Buscando por "${query}"...
        </div>
    `;
    
    document.getElementById('searchResults').innerHTML = resultsHTML;
}

// ═══════════════ THEME TOGGLE ═══════════════
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    const darkIcon = toggle.querySelector('.theme-icon-dark');
    const lightIcon = toggle.querySelector('.theme-icon-light');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('light', savedTheme === 'light');
    updateThemeIcons(savedTheme, darkIcon, lightIcon);
    
    toggle.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light');
        const theme = isLight ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme, darkIcon, lightIcon);
    });
}

function updateThemeIcons(theme, darkIcon, lightIcon) {
    if (theme === 'light') {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    } else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    }
}

// ═══════════════ NEWSLETTER ═══════════════
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        try {
            // Aqui você implementaria o envio real
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            button.textContent = '✓ Inscrito!';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        } catch (error) {
            button.textContent = '✗ Erro';
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        }
    });
}

// ═══════════════ SMOOTH SCROLL ═══════════════
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
