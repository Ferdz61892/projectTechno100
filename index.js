document.addEventListener('DOMContentLoaded', function() {
    // Initialize all scripts
    initNavigation();
    initSearch();
    initRetroEffects();
    initFormValidation();
    initDynamicContent();
});

// Smooth navigation between pages
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('external')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });
}

// Search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            // In a real app, this would redirect to search results
            alert(`Searching for: ${query}\n(This would load results in a real implementation)`);
            searchInput.value = '';
        } else {
            showRetroAlert('Please enter a search term');
        }
    });
    
    // Allow Enter key to trigger search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Retro-style visual effects
function initRetroEffects() {
    // Add CRT scanline effect
    const crtEffect = document.createElement('div');
    crtEffect.className = 'crt-effect';
    document.body.appendChild(crtEffect);
    
    // Add pixelated hover effects
    const cards = document.querySelectorAll('.category-card, .featured-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px #00ff00';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 5px #00ff00';
        });
    });
}

// Form validation for contact page
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showRetroAlert('All fields are required!');
                return;
            }
            
            if (!validateEmail(email)) {
                showRetroAlert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            showRetroAlert('Message sent! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
}

// Dynamic content loading
function initDynamicContent() {
    // Load featured items dynamically
    if (document.querySelector('.featured-grid')) {
        loadFeaturedItems();
    }
    
    // Load listings dynamically on category pages
    if (document.querySelector('.listing-grid')) {
        loadListings();
    }
}

// Helper functions
function showRetroAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'retro-alert';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.classList.add('fade-out');
        setTimeout(() => alertBox.remove(), 500);
    }, 3000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function loadFeaturedItems() {
    try {
        // In a real app, this would fetch from an API
        const response = await fetch('data/featured.json');
        const data = await response.json();
        
        const grid = document.querySelector('.featured-grid');
        grid.innerHTML = '';
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'featured-card';
            card.innerHTML = `
                <div class="featured-img" style="background-image: url('${item.image}')"></div>
                <div class="featured-details">
                    <h3>${item.name}</h3>
                    <div class="rating">${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</div>
                    <p>${item.description}</p>
                    <div class="price">${item.price}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        showRetroAlert('Failed to load featured items');
    }
}

async function loadListings() {
    // Similar implementation for category listings
}
2. Update your CSS (style.css) to include these additions:
css
Copy
/* Add to the end of your existing CSS */

/* Retro Effects */
.crt-effect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 255, 0, 0.03) 50%, transparent 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 9999;
    animation: scanline 8s linear infinite;
}

@keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
}

/* Retro Alert */
.retro-alert {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000;
    color: #00ff00;
    border: 2px solid #00ff00;
    padding: 15px 30px;
    font-family: 'Courier New', monospace;
    z-index: 10000;
    box-shadow: 0 0 20px #00ff00;
    opacity: 1;
    transition: opacity 0.5s;
}

.retro-alert.fade-out {
    opacity: 0;
}

/* Page Transitions */
body.fade-out {
    opacity: 0;
    transition: opacity 0.3s;
}

/* Dynamic Content Loading Animation */
.loading {
    position: relative;
    color: transparent;
    background-color: #111;
    overflow: hidden;
}

.loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}