/*
═══════════════════════════════════════════════════════════════════════════════
FBIM TECH - JAVASCRIPT ULTRA COMPLETO
═══════════════════════════════════════════════════════════════════════════════
✅ Mobile menu
✅ Search overlay
✅ Theme switcher
✅ Newsletter form
✅ Smooth scroll
✅ Scroll to top
✅ Video lazy loading
✅ Toast notifications
✅ Intersection observer (animações)
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══════════════ DOM READY ═══════════════
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSearchOverlay();
    initThemeToggle();
    initNewsletter();
    initSmoothScroll();
    initScrollToTop();
    initVideoLazyLoad();
    initIntersectionObserver();
});

// ═══════════════ MOBILE MENU ═══════════════
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        
        // Animar ícone hamburger
        const svg = toggle.querySelector('svg');
        if (svg) {
            svg.style.transform = menu.classList.contains('active') ? 'rotate(90deg)' : '';
        }
    });
    
    // Fechar ao clicar em link
    menu.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && 
            !menu.contains(e.target) && 
            !toggle.contains(e.target)) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ═══════════════ SEARCH OVERLAY ═══════════════
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
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            input.value = '';
        }
    });
    
    // Fechar ao clicar no backdrop
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            input.value = '';
        }
    });
    
    // Busca com debounce
    let searchTimeout;
    input.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
}

function performSearch(query) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (!query.trim()) {
        resultsDiv.innerHTML = '';
        return;
    }
    
    resultsDiv.innerHTML = `
        <div style="color: var(--color-text-tertiary); text-align: center; padding: 2rem;">
            <div class="skeleton" style="height: 100px; border-radius: 8px; margin-bottom: 1rem;"></div>
            <div class="skeleton" style="height: 100px; border-radius: 8px;"></div>
        </div>
    `;
    
    // Aqui você implementaria busca real
    setTimeout(() => {
        resultsDiv.innerHTML = `
            <div style="color: var(--color-text-tertiary); text-align: center; padding: 2rem;">
                Nenhum resultado encontrado para "${query}"
            </div>
        `;
    }, 1000);
}

// ═══════════════ THEME TOGGLE ═══════════════
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    const darkIcon = toggle.querySelector('.theme-icon-dark');
    const lightIcon = toggle.querySelector('.theme-icon-light');
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('light', savedTheme === 'light');
    updateThemeIcons(savedTheme, darkIcon, lightIcon);
    
    toggle.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light');
        const theme = isLight ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme, darkIcon, lightIcon);
        showToast(isLight ? '☀️ Tema claro ativado' : '🌙 Tema escuro ativado', 'success');
    });
}

function updateThemeIcons(theme, darkIcon, lightIcon) {
    if (!darkIcon || !lightIcon) return;
    
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
            // Simular envio (você implementaria API real aqui)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            button.textContent = '✓ Inscrito!';
            form.reset();
            showToast('✅ Inscrição realizada com sucesso!', 'success');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        } catch (error) {
            button.textContent = '✗ Erro';
            showToast('❌ Erro ao fazer inscrição', 'error');
            
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

// ═══════════════ SCROLL TO TOP ═══════════════
function initScrollToTop() {
    // Criar botão
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(button);
    
    // Mostrar/ocultar baseado no scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    // Click handler
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ═══════════════ VIDEO LAZY LOAD ═══════════════
function initVideoLazyLoad() {
    const videoContainers = document.querySelectorAll('.video-thumbnail');
    
    videoContainers.forEach(container => {
        container.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            if (!videoId) return;
            
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
            
            this.innerHTML = '';
            this.appendChild(iframe);
        });
    });
}

// ═══════════════ INTERSECTION OBSERVER (Animações) ═══════════════
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards
    document.querySelectorAll('.card-ultra').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ═══════════════ TOAST NOTIFICATIONS ═══════════════
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ═══════════════ UTILITY FUNCTIONS ═══════════════

// Copiar texto para clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Copiado para área de transferência!', 'success');
    }).catch(() => {
        showToast('❌ Erro ao copiar', 'error');
    });
}

// Share API
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({ title, text, url })
            .then(() => showToast('✅ Compartilhado!', 'success'))
            .catch(() => {});
    } else {
        copyToClipboard(url);
    }
}

// Exposer funções globalmente se necessário
window.fbimTech = {
    showToast,
    copyToClipboard,
    shareContent
};
