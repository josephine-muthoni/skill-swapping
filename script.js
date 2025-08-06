document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // Toggle menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Hide menu on link click and scroll to section
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

// Language selector functionality
const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    languageSelect.addEventListener('change', function () {
        // In a real app, this would change the language of the page
        console.log('Language changed to:', this.value);
        alert('Language changed to ' + this.options[this.selectedIndex].text);
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