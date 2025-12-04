document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // Toggle menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Hide menu on link click and scroll to section
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only handle anchor links with hashes
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });
});
// Update World Clocks
function updateClocks() {
    const clocks = document.querySelectorAll('.clock');

    clocks.forEach(clock => {
        const timezone = clock.getAttribute('data-timezone');
        const timeElement = clock.querySelector('.time');

        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        const timeString = new Date().toLocaleTimeString('en-US', options);
        timeElement.textContent = timeString;
    });
}

// Update clocks immediately and then every minute
updateClocks();
setInterval(updateClocks, 60000);

// Enhanced Skill Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const levelFilterButtons = document.querySelectorAll('.level-filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

function filterSkills() {
    // Get active category
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

    // Get active level (if any)
    const activeLevelBtn = document.querySelector('.level-filter-btn.active');
    const activeLevel = activeLevelBtn ? activeLevelBtn.dataset.level : null;

    skillCards.forEach(card => {
        // Check category match
        const categoryMatch = activeCategory === 'all' ||
            card.dataset.category === activeCategory;

        // Check level match if a level is selected
        let levelMatch = true;
        if (activeLevel) {
            const cardLevels = card.dataset.level.split(' ');
            levelMatch = cardLevels.includes(activeLevel);
        }

        // Show or hide card based on matches
        if (categoryMatch && levelMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize filter buttons
if (filterButtons.length > 0) {
    // Category filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterSkills();
        });
    });

    // Level filter buttons
    levelFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Toggle active state (allow clicking again to deselect)
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                levelFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
            filterSkills();
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (hamburgerButton.classList.contains('active')) {
                hamburgerButton.classList.remove('active');
                menu.classList.remove('active');
            }
        }
    });
});

// Form validation and submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const timezone = document.getElementById('signup-timezone').value;

        if (!name || !email || !password || !timezone) {
            alert('Please fill in all required fields');
            return;
        }

        // Simulate form submission
        console.log('Signup form submitted:', { name, email, password, timezone });
        alert('Thank you for signing up! Redirecting to your dashboard...');
        // In a real app, you would redirect or show a success message
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate form submission
        console.log('Login form submitted:', { email, password });
        alert('Login successful! Redirecting to your dashboard...');
        // In a real app, you would redirect or show a success message
    });
}

// Animate elements when they come into view
const animateOnScroll = function () {
    const elements = document.querySelectorAll('.animated-step, .feature-card, .skill-card');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load

// Language selector functionality with translations
const translations = {
    en: {
        'how-it-works': 'How It Works',
        'features': 'Features',
        'browse-skills': 'Browse Skills',
        'hero-title': 'Exchange Skills. Learn Freely. Connect Globally.',
        'hero-subtitle': 'Join our community of 50,000+ users across 100+ countries',
        'cta-button': 'Get Started',
        'create-profile': 'Create Your Skill Profile',
        'create-profile-desc': 'Showcase what you can teach and what you want to learn',
        'match-learners': 'Match With Global Learners',
        'match-learners-desc': 'Our AI connects you with perfect partners worldwide',
        'exchange-lessons': 'Exchange Lessons Live',
        'exchange-lessons-desc': 'Teach and learn through our integrated video platform',
        'global-banner': 'Our global community spans 100+ countries across all time zones',
        'features-title': 'Why Choose Skill Swap?',
        'verified-users': 'Verified Users',
        'verified-desc': 'All members are vetted for quality and authenticity',
        'secure-payments': 'Secure Payments',
        'secure-desc': 'Safe transactions with buyer and seller protection',
        'live-sessions': 'Live Sessions',
        'live-sessions-desc': 'Real-time video sessions with screen sharing',
        'browse-title': 'Browse Skills',
        'all': 'All',
        'languages': 'Languages',
        'music': 'Music',
        'business': 'Business',
        'tech': 'Tech',
        'testimonials': 'What Our Users Say',
        'signup': 'Sign Up',
        'login': 'Login'
    },
    sw: {
        'how-it-works': 'Jinsi Inavyofanya Kazi',
        'features': 'Sifa',
        'browse-skills': 'Kuzalia Ujumbe',
        'hero-title': 'Badilisha Ujumbe. Jifunze Kwa Uhuru. Kuunganisha Duniani.',
        'hero-subtitle': 'Jiunge na jamii yetu ya watumiaji 50,000+ katika nchi 100+',
        'cta-button': 'Anza',
        'create-profile': 'Tengeneza Wasifu Wako wa Ujumbe',
        'create-profile-desc': 'Onyesha kinachoweza kufundisha na kinachoweza kujifunza',
        'match-learners': 'Sambaza na Wanafunzi Duniani',
        'match-learners-desc': 'AI yetu inakuunganisha na washirikiano kamili duniani',
        'exchange-lessons': 'Badilisha Masomo Mabishi',
        'exchange-lessons-desc': 'Fundisha na jifunze kupitia jukwaa letu linalozingira video',
        'global-banner': 'Jamii yetu ya ulimwengu inaenea nchi 100+ katika sehemu zote za saa',
        'features-title': 'Kwa Nini Chagua Skill Swap?',
        'verified-users': 'Watumiaji Waliothibitishwa',
        'verified-desc': 'Wanachama wote wanathibitishwa kwa ubora na uhalisia',
        'secure-payments': 'Malipo Salama',
        'secure-desc': 'Miamala salama na ulinzi wa mnunuzi na muuzaji',
        'live-sessions': 'Vikao Mabishi',
        'live-sessions-desc': 'Vikao vya video halisi na kugawana skrini',
        'browse-title': 'Kuzalia Ujumbe',
        'all': 'Zote',
        'languages': 'Lugha',
        'music': 'Muziki',
        'business': 'Biashara',
        'tech': 'Teknolohia',
        'testimonials': 'Watumiaji Wanasema Nini',
        'signup': 'Jiandikishe',
        'login': 'Ingia'
    },
    es: {
        'how-it-works': 'Cómo Funciona',
        'features': 'Características',
        'browse-skills': 'Explorar Habilidades',
        'hero-title': 'Intercambia Habilidades. Aprende Libremente. Conecta Globalmente.',
        'hero-subtitle': 'Únete a nuestra comunidad de 50,000+ usuarios en 100+ países',
        'cta-button': 'Comenzar',
        'create-profile': 'Crear tu Perfil de Habilidad',
        'create-profile-desc': 'Muestra lo que puedes enseñar y lo que quieres aprender',
        'match-learners': 'Empareja con Estudiantes Globales',
        'match-learners-desc': 'Nuestra IA te conecta con socios perfectos en todo el mundo',
        'exchange-lessons': 'Intercambiar Lecciones en Vivo',
        'exchange-lessons-desc': 'Enseña y aprende a través de nuestra plataforma de video integrada',
        'global-banner': 'Nuestra comunidad global abarca 100+ países en todas las zonas horarias',
        'features-title': '¿Por Qué Elegir Skill Swap?',
        'verified-users': 'Usuarios Verificados',
        'verified-desc': 'Todos los miembros están verificados por calidad y autenticidad',
        'secure-payments': 'Pagos Seguros',
        'secure-desc': 'Transacciones seguras con protección de comprador y vendedor',
        'live-sessions': 'Sesiones en Vivo',
        'live-sessions-desc': 'Sesiones de video en tiempo real con intercambio de pantalla',
        'browse-title': 'Explorar Habilidades',
        'all': 'Todos',
        'languages': 'Idiomas',
        'music': 'Música',
        'business': 'Negocios',
        'tech': 'Tecnología',
        'testimonials': 'Lo que dicen nuestros usuarios',
        'signup': 'Registrarse',
        'login': 'Iniciar Sesión'
    }
    fr: {
        'how-it-works': 'Comment ça marche',
        'features': 'Fonctionnalités',
        'browse-skills': 'Parcourir les compétences',
        'hero-title': 'Échangez des compétences. Apprenez librement. Connectez-vous globalement.',
        'hero-subtitle': 'Rejoignez notre communauté de plus de 50 000 utilisateurs dans plus de 100 pays',
        'cta-button': 'Commencer',
        'create-profile': 'Créez votre profil de compétences',
        'create-profile-desc': 'Montrez ce que vous pouvez enseigner et ce que vous voulez apprendre',
        'match-learners': 'Mettez en relation avec des apprenants du monde entier',
        'match-learners-desc': "Notre IA vous connecte avec des partenaires parfaits dans le monde entier",
        'exchange-lessons': 'Échangez des leçons en direct',
        'exchange-lessons-desc': 'Enseignez et apprenez via notre plateforme vidéo intégrée',
        'global-banner': 'Notre communauté mondiale s\'étend sur plus de 100 pays à travers tous les fuseaux horaires',
        'features-title': 'Pourquoi choisir Skill Swap ?',
        'verified-users': 'Utilisateurs vérifiés',
        'verified-desc': 'Tous les membres sont vérifiés pour leur qualité et leur authenticité',
        'secure-payments': 'Paiements sécurisés',
        'secure-desc': 'Transactions sûres avec protection acheteur et vendeur',
        'live-sessions': 'Sessions en direct',
        'live-sessions-desc': 'Sessions vidéo en temps réel avec partage d\'écran',
        'browse-title': 'Parcourir les compétences',
        'all': 'Tous',
        'languages': 'Langues',
        'music': 'Musique',
        'business': 'Affaires',
        'tech': 'Technologie',
        'testimonials': 'Ce que disent nos utilisateurs',
        'signup': "S'inscrire",
        'login': 'Connexion'
    }  
    de: {
        'how-it-works': 'Wie es funktioniert',
        'features': 'Funktionen',
        'browse-skills': 'Fähigkeiten durchsuchen',
        'hero-title': 'Tausche Fähigkeiten. Lerne frei. Verbinde dich global.',
        'hero-subtitle': 'Tritt unserer Gemeinschaft von über 50.000 Nutzern in über 100 Ländern bei',
        'cta-button': 'Loslegen',
        'create-profile': 'Erstelle dein Fähigkeitsprofil',
        'create-profile-desc': 'Zeige, was du lehren kannst und was du lernen möchtest',
        'match-learners': 'Finde globale Lernende',
        'match-learners-desc': 'Unsere KI verbindet dich mit perfekten Partnern weltweit',
        'exchange-lessons': 'Tausche Live-Unterricht aus',
        'exchange-lessons-desc': 'Lehre und lerne über unsere integrierte Videoplattform',
        'global-banner': 'Unsere globale Gemeinschaft erstreckt sich über mehr als 100 Länder in allen Zeitzonen',
        'features-title': 'Warum Skill Swap wählen?',
        'verified-users': 'Verifizierte Nutzer',
        'verified-desc': 'Alle Mitglieder werden auf Qualität und Authentizität geprüft',
        'secure-payments': 'Sichere Zahlungen',
        'secure-desc': 'Sichere Transaktionen mit Käufer- und Verkäuferschutz',
        'live-sessions': 'Live-Sitzungen',
        'live-sessions-desc': 'Echtzeit-Videositzungen mit Bildschirmfreigabe',
        'browse-title': 'Fähigkeiten durchsuchen',
        'all': 'Alle',
        'languages': 'Sprachen',
        'music': 'Musik',
        'business': 'Geschäft',
        'tech': 'Technik',
        'testimonials': 'Was unsere Nutzer sagen',
        'signup': 'Anmelden',
        'login': 'Einloggen'
    }



};

function changeLanguage(lang) {
    // Store selected language
    localStorage.setItem('selectedLanguage', lang);

    // Update page elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update document language attribute
    document.documentElement.lang = lang;
}

const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = savedLanguage;
    changeLanguage(savedLanguage);

    languageSelect.addEventListener('change', function () {
        changeLanguage(this.value);
    });
}

// Testimonial carousel auto-scroll
const testimonialCarousel = document.querySelector('.testimonial-carousel');
if (testimonialCarousel) {
    let scrollAmount = 0;
    const scrollWidth = testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth;

    function autoScrollTestimonials() {
        scrollAmount += 300;
        if (scrollAmount > scrollWidth) {
            scrollAmount = 0;
        }
        testimonialCarousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Auto-scroll every 5 seconds
    setInterval(autoScrollTestimonials, 5000);
}