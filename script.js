// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('bg-white', 'shadow-lg');
        nav.classList.remove('bg-transparent');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Counter animation for stats
const counters = document.querySelectorAll('.stat-counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const count = parseInt(counter.innerText);
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target + '+';
    }
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-counter');
            counters.forEach(counter => {
                const target = counter.getAttribute('data-target');
                counter.innerText = '0';
                animateCounter(counter);
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('#home .grid');
if (statsSection) {
    observer.observe(statsSection);
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary');
        }
    });
});

// Product card hover effects
const productCards = document.querySelectorAll('.card-hover');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// See More / See Less functionality for products
document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const moreProducts = document.getElementById('more-products');
    const seeMoreIcon = document.getElementById('seeMoreIcon');
    let isExpanded = false;
    
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                // Show more products
                moreProducts.classList.remove('hidden');
                seeMoreBtn.innerHTML = '<span>Show Less</span> <i class="fas fa-arrow-up ml-2" id="seeMoreIcon"></i>';
                // Smooth scroll to new products
                setTimeout(() => {
                    moreProducts.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                // Hide extra products
                moreProducts.classList.add('hidden');
                seeMoreBtn.innerHTML = '<span>See More Resources</span> <i class="fas fa-arrow-down ml-2" id="seeMoreIcon"></i>';
                // Scroll back to section top
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            isExpanded = !isExpanded;
        });
    }
});

// Lazy load images
const images = document.querySelectorAll('img');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // Trigger load
            img.classList.add('opacity-100');
            imageObserver.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => {
    img.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    imageObserver.observe(img);
});

// Add to cart functionality (placeholder for Gumroad)
const previewButtons = document.querySelectorAll('.bg-primary.text-white');
previewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // This would link to Gumroad product page
        console.log('Redirect to Gumroad product');
        // window.location.href = 'https://gumroad.com/l/product-id';
    });
});

// Form validation for contact (if you add a form later)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form validation logic here
        console.log('Form submitted');
    });
}

// Print current year in footer
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}