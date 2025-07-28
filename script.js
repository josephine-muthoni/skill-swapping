document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    const body = document.body;

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLeft.classList.toggle('active');
        navRight.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-left a, .nav-right a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLeft.classList.remove('active');
                navRight.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLeft.classList.remove('active');
                    navRight.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
    });

    // Responsive form handling for signup and login
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmission(this, 'signup');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmission(this, 'login');
        });
    }

    // Form validation and submission handler
    function handleFormSubmission(form, type) {
        const formData = new FormData(form);
        const data = {};
        let isValid = true;

        // Validate required fields
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        // Additional validation for password length in signup
        if (type === 'signup') {
            const password = form.querySelector('#signup-password');
            if (password && password.value.length < 8) {
                password.classList.add('error');
                isValid = false;
                showToast('Password must be at least 8 characters long', 'error');
            }
        }

        if (!isValid) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        // Process form data
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Simulate form submission (replace with actual AJAX call)
        console.log(`${type} form data:`, data);
        showToast(`${type === 'signup' ? 'Registration' : 'Login'} successful!`, 'success');

        // Reset form after submission
        if (type === 'signup') {
            form.reset();
            // Optional: Redirect to login or dashboard
            // setTimeout(() => window.location.href = '#login', 1500);
        }
    }

    // Show toast notifications
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }, 100);
    }

    // Responsive adjustments for auth sections
    function handleAuthSectionsResponsiveness() {
        const authContainers = document.querySelectorAll('.auth-container');
        const windowWidth = window.innerWidth;

        authContainers.forEach(container => {
            if (windowWidth <= 992) {
                container.classList.add('stacked');
            } else {
                container.classList.remove('stacked');
            }
        });
    }

    // Initial check and event listener for window resize
    handleAuthSectionsResponsiveness();
    window.addEventListener('resize', handleAuthSectionsResponsiveness);
});

// World clock functionality
function updateClocks() {
    document.querySelectorAll('.clock').forEach(clock => {
        const options = {
            timeZone: clock.dataset.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        clock.querySelector('.time').textContent =
            new Date().toLocaleTimeString('en-US', options);
    });
}

setInterval(updateClocks, 1000);
updateClocks();

// Timezone dropdown population
const timezones = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
    'Asia/Kolkata', 'Australia/Sydney', 'Pacific/Auckland'
];

const timezoneSelect = document.getElementById('signup-timezone');
if (timezoneSelect) {
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.split('/')[1].replace('_', ' ');
        timezoneSelect.appendChild(option);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const levelButtons = document.querySelectorAll('.skill-level span');
    const categoryButtons = document.querySelectorAll('.filter-btn');
    let activeLevel = null;
    let activeCategory = 'all';

    // Level filtering
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = this.classList.contains('level-beginner') ? 'beginner' :
                          this.classList.contains('level-intermediate') ? 'intermediate' :
                          'advanced';

            if (activeLevel === level) {
                this.classList.remove('active');
                activeLevel = null;
            } else {
                levelButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                activeLevel = level;
            }
            filterSkills();
        });
    });

    // Category filtering (existing code modified)
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.dataset.category;
            filterSkills();
        });
    });

    // Combined filtering function
    function filterSkills() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardLevels = card.dataset.level.split(' ');
            
            // Check category
            const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
            
            // Check level
            const levelMatch = !activeLevel || cardLevels.includes(activeLevel);
            
            // Show/hide based on both filters
            if (categoryMatch && levelMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});