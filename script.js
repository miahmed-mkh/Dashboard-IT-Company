// Script principal pour le dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants
    initNavigation();
    initModal();
    initDataSimulation();
    initScrollAnimations();
    initParticles();
});

// Navigation mobile
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });
    }
    
    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // Mettre à jour les liens actifs
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mettre à jour la navigation active au scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Modal Power BI
function initModal() {
    const modal = document.getElementById('powerbi-modal');
    const openBtn = document.getElementById('open-powerbi');
    const closeBtn = document.querySelector('.close-modal');
    
    if (openBtn && modal) {
        openBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Fermer le modal en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Simulation de données pour le dashboard
function initDataSimulation() {
    // Mettre à jour l'heure de dernière mise à jour
    updateLastUpdateTime();
    
    // Simuler des données pour les KPI
    simulateKPIData();
    
    // Simuler des données pour les statistiques
    simulateStatsData();
    
    // Mettre à jour les données périodiquement
    setInterval(function() {
        updateLastUpdateTime();
        simulateKPIData();
        simulateStatsData();
    }, 10000); // Mise à jour toutes les 10 secondes
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('last-update-time').textContent = `Dernière mise à jour: ${timeString}`;
}

function simulateKPIData() {
    // Générer des valeurs aléatoires réalistes
    const totalCommandes = Math.floor(Math.random() * 200) + 1000;
    const chiffreAffaires = Math.floor(Math.random() * 50000) + 150000;
    const panierMoyen = Math.floor(chiffreAffaires / totalCommandes);
    const totalClients = Math.floor(Math.random() * 20) + 50;
    const totalProduits = Math.floor(Math.random() * 15) + 60;
    const totalQuantite = Math.floor(Math.random() * 500) + 1500;
    
    // Mettre à jour les KPI avec animation
    animateValue('total-commandes', totalCommandes);
    animateValue('chiffre-affaires', `€${chiffreAffaires.toLocaleString('fr-FR')}`);
    animateValue('panier-moyen', `€${panierMoyen}`);
    animateValue('total-clients', totalClients);
    animateValue('total-produits', totalProduits);
    animateValue('total-quantite', totalQuantite);
    
    // Mettre à jour les stats du hero
    document.getElementById('hero-total-commandes').textContent = `${totalCommandes}+`;
    document.getElementById('hero-total-clients').textContent = `${totalClients}+`;
    document.getElementById('hero-total-produits').textContent = `${totalProduits}+`;
}

function simulateStatsData() {
    // Données simulées pour les statuts de commande
    const statusData = [
        { name: 'Livrée', count: Math.floor(Math.random() * 200) + 600 },
        { name: 'En cours', count: Math.floor(Math.random() * 100) + 200 },
        { name: 'En attente', count: Math.floor(Math.random() * 50) + 50 },
        { name: 'Annulée', count: Math.floor(Math.random() * 20) + 10 }
    ];
    
    // Données simulées pour les top produits
    const productsData = [
        { name: 'Laptop Pro', sales: Math.floor(Math.random() * 50000) + 100000 },
        { name: 'Écran 27"', sales: Math.floor(Math.random() * 30000) + 70000 },
        { name: 'Souris Gaming', sales: Math.floor(Math.random() * 20000) + 50000 },
        { name: 'Clavier Méca', sales: Math.floor(Math.random() * 15000) + 40000 },
        { name: 'Casque Audio', sales: Math.floor(Math.random() * 10000) + 30000 }
    ];
    
    // Données simulées pour les régions
    const regionsData = [
        { name: 'Île-de-France', performance: Math.floor(Math.random() * 20) + 80 },
        { name: 'Auvergne-Rhône-Alpes', performance: Math.floor(Math.random() * 15) + 70 },
        { name: 'Occitanie', performance: Math.floor(Math.random() * 15) + 65 },
        { name: 'Nouvelle-Aquitaine', performance: Math.floor(Math.random() * 10) + 60 },
        { name: 'Provence-Alpes-Côte d\'Azur', performance: Math.floor(Math.random() * 10) + 55 }
    ];
    
    // Mettre à jour les listes
    updateStatusList(statusData);
    updateProductsList(productsData);
    updateRegionsList(regionsData);
}

function updateStatusList(data) {
    const container = document.getElementById('status-chart');
    container.innerHTML = '';
    
    data.forEach(item => {
        const element = document.createElement('div');
        element.className = 'status-item';
        element.innerHTML = `
            <span class="status-name">${item.name}</span>
            <span class="status-count">${item.count}</span>
        `;
        container.appendChild(element);
    });
}

function updateProductsList(data) {
    const container = document.getElementById('top-products');
    container.innerHTML = '';
    
    data.forEach(item => {
        const element = document.createElement('div');
        element.className = 'product-item';
        element.innerHTML = `
            <span class="product-name">${item.name}</span>
            <span class="product-sales">€${item.sales.toLocaleString('fr-FR')}</span>
        `;
        container.appendChild(element);
    });
}

function updateRegionsList(data) {
    const container = document.getElementById('regions-list');
    container.innerHTML = '';
    
    data.forEach(item => {
        const element = document.createElement('div');
        element.className = 'region-item';
        element.innerHTML = `
            <span class="region-name">${item.name}</span>
            <span class="region-performance">${item.performance}%</span>
        `;
        container.appendChild(element);
    });
}

// Animation des valeurs numériques
function animateValue(id, targetValue) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const currentValue = parseFloat(element.textContent.replace(/[^0-9.-]+/g, "")) || 0;
    const target = parseFloat(targetValue.toString().replace(/[^0-9.-]+/g, "")) || 0;
    
    if (currentValue === target) return;
    
    const duration = 1000; // 1 seconde
    const startTime = performance.now();
    const startValue = currentValue;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = startValue + (target - startValue) * easeOutQuart;
        
        // Formater la valeur selon le type
        if (id === 'chiffre-affaires' || id === 'panier-moyen') {
            element.textContent = `€${Math.floor(current).toLocaleString('fr-FR')}`;
        } else {
            element.textContent = Math.floor(current).toLocaleString('fr-FR');
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Animations au défilement
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.kpi-card, .stats-card, .dashboard-card, .about-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Particules pour l'arrière-plan du hero
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Créer des particules supplémentaires
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 4 + 1;
        
        // Durée d'animation aléatoire
        const duration = Math.random() * 20 + 10;
        
        // Appliquer les styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(67, 97, 238, 0.3);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float-particle ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Ajouter la keyframe pour l'animation des particules
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0.3;
            }
            25% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
                opacity: 0.7;
            }
            50% {
                transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
                opacity: 0.5;
            }
            75% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// Gestion des erreurs pour le iframe Power BI
window.addEventListener('message', function(event) {
    // Écouter les messages d'erreur de Power BI
    if (event.data && event.data.type === 'powerbi-error') {
        console.error('Erreur Power BI:', event.data.details);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
});

// Service Worker pour le cache
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker enregistré avec succès: ', registration.scope);
            })
            .catch(function(error) {
                console.log('Échec de l\'enregistrement du ServiceWorker: ', error);
            });
    });
}