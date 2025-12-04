document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // ==========================
    // ==========================
// Hamburger Menu - Improved
// ==========================
if (hamburger && menu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && 
            !menu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

    // ==========================
    // Smooth scrolling for anchor links
    // (works for both desktop and mobile)
    // ==========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; // ignore empty anchors

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Close mobile menu if open
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    if (menu) menu.classList.remove('active');
                }
            }
        });
    });

    // ==========================
    // World clocks
    // ==========================
    function updateClocks() {
        const clocks = document.querySelectorAll('.clock');

        clocks.forEach(clock => {
            const timezone = clock.getAttribute('data-timezone');
            const timeElement = clock.querySelector('.time');

            try {
                const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: true };
                const timeString = new Date().toLocaleTimeString('en-US', options);
                if (timeElement) timeElement.textContent = timeString;
            } catch (err) {
                // Fallback: local time
                if (timeElement) timeElement.textContent = new Date().toLocaleTimeString();
            }
        });
    }

    updateClocks();
    setInterval(updateClocks, 60000);
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // ==========================
    // Hamburger / Mobile Menu
    // ==========================
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Close when clicking a menu link (and smooth scroll handled below)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }

    // ==========================
    // Smooth scrolling for anchor links
    // (works for both desktop and mobile)
    // ==========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; // ignore empty anchors

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Close mobile menu if open
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    if (menu) menu.classList.remove('active');
                }
            }
        });
    });

    // ==========================
    // World clocks
    // ==========================
    function updateClocks() {
        const clocks = document.querySelectorAll('.clock');

        clocks.forEach(clock => {
            const timezone = clock.getAttribute('data-timezone');
            const timeElement = clock.querySelector('.time');

            try {
                const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: true };
                const timeString = new Date().toLocaleTimeString('en-US', options);
                if (timeElement) timeElement.textContent = timeString;
            } catch (err) {
                // Fallback: local time
                if (timeElement) timeElement.textContent = new Date().toLocaleTimeString();
            }
        });
    }

    updateClocks();
    setInterval(updateClocks, 60000);

    // ==========================
    // Filters (category + level)
    // ==========================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const levelFilterButtons = document.querySelectorAll('.level-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    function filterSkills() {
        const activeCategoryBtn = document.querySelector('.filter-btn.active');
        const activeCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'all';

        const activeLevelBtn = document.querySelector('.level-filter-btn.active');
        const activeLevel = activeLevelBtn ? activeLevelBtn.dataset.level : null;

        skillCards.forEach(card => {
            const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;

            let levelMatch = true;
            if (activeLevel) {
                const cardLevels = (card.dataset.level || '').split(' ');
                levelMatch = cardLevels.includes(activeLevel);
            }

            card.style.display = (categoryMatch && levelMatch) ? 'block' : 'none';
        });
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                filterSkills();
            });
        });
    }

    if (levelFilterButtons.length > 0) {
        levelFilterButtons.forEach(button => {
            button.addEventListener('click', function () {
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

    // ==========================
    // Forms (signup / login)
    // ==========================
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            const timezone = document.getElementById('signup-timezone').value;

            if (!name || !email || !password || !timezone) {
                alert('Please fill in all required fields');
                return;
            }

            console.log('Signup form submitted:', { name, email, password, timezone });
            alert('Thank you for signing up! Redirecting to your dashboard...');
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            console.log('Login form submitted:', { email, password });
            alert('Login successful! Redirecting to your dashboard...');
        });
    }

    // ==========================
    // Animate on scroll
    // ==========================
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
    animateOnScroll();

    // ==========================
    // Translations / Language Switcher
    // ==========================
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
            'features-title': 'Platform Features',
            'browse-title': 'Browse Popular Skills',
            'all': 'All Categories',
            'languages': 'Languages',
            'testimonials': 'What Our Global Community Says',
            'signup': 'Sign Up',
            'login': 'Login'
        },
        sw: {
            'how-it-works': 'Jinsi Inavyofanya Kazi',
            'features': 'Sifa',
            'browse-skills': 'Vifungo vya Ujuzi',
            'hero-title': 'Badilishana Ujuzi. Jifunze Bila Malipo. Unganisha Duniani.',
            'hero-subtitle': 'Jiunge na jamii yetu ya watumiaji 50,000+ katika nchi 100+',
            'cta-button': 'Anza',
            'create-profile': 'Tengeneza Wasifu wako wa Ujuzi',
            'create-profile-desc': 'Onyesha unachoweza kufundisha na unachotaka kujifunza',
            'match-learners': 'Patanisha na Wanafunzi wa Ulimwenguni',
            'match-learners-desc': 'AI yetu inakuunganisha na washirika bora duniani',
            'exchange-lessons': 'Badilishana Masomo Moja kwa Moja',
            'exchange-lessons-desc': 'Fundisha na jifunze kupitia jukwaa letu la video',
            'global-banner': 'Jamii yetu inahusisha nchi 100+ katika maeneo yote ya saa',
            'features-title': 'Sifa za Jukwaa',
            'browse-title': 'Vifungo vya Ujuzi',
            'all': 'Vyote',
            'languages': 'Lugha',
            'testimonials': 'Jamii Yetu Inasema Nini',
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
            'features-title': 'Por Qué Elegir Skill Swap',
            'browse-title': 'Explorar Habilidades',
            'all': 'Todos',
            'languages': 'Idiomas',
            'testimonials': 'Lo que dicen nuestros usuarios',
            'signup': 'Registrarse',
            'login': 'Iniciar Sesión'
        },
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
            'global-banner': 'Notre communauté mondiale s\'étend sur plus de 100 pays',
            'features-title': 'Fonctionnalités de la plateforme',
            'browse-title': 'Parcourir les compétences',
            'all': 'Tous',
            'languages': 'Langues',
            'testimonials': 'Ce que disent nos utilisateurs',
            'signup': 'S\'inscrire',
            'login': 'Connexion'
        },
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
            'global-banner': 'Unsere globale Gemeinschaft erstreckt sich über mehr als 100 Länder',
            'features-title': 'Warum Skill Swap wählen?',
            'browse-title': 'Fähigkeiten durchsuchen',
            'all': 'Alle',
            'languages': 'Sprachen',
            'testimonials': 'Was unsere Nutzer sagen',
            'signup': 'Anmelden',
            'login': 'Einloggen'
        }
    };

    function changeLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (!key) return;

            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.documentElement.lang = lang;
    }

    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        if (translations[savedLanguage]) languageSelect.value = savedLanguage;
        changeLanguage(savedLanguage);

        languageSelect.addEventListener('change', function () {
            const val = this.value;
            if (translations[val]) changeLanguage(val);
        });
    }

    // ==========================
    // Testimonial carousel auto-scroll
    // ==========================
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        let scrollAmount = 0;

        function autoScrollTestimonials() {
            const scrollWidth = testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth;
            scrollAmount += 300;
            if (scrollAmount > scrollWidth) scrollAmount = 0;
            testimonialCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }

        setInterval(autoScrollTestimonials, 5000);
    }

});