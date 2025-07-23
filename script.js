
 document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLeft.classList.toggle('active');
        navRight.classList.toggle('active');
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
                }
            }
        });
    });
});
