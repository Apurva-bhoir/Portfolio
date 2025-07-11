// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollIndicator.style.setProperty('--scroll-width', scrollPercent + '%');
        scrollIndicator.style.background = `linear-gradient(to right, #667eea ${scrollPercent}%, rgba(102, 126, 234, 0.2) ${scrollPercent}%)`;
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .section-header, .contact-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Typing effect for hero text
    const heroTitle = document.querySelector('.name-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Show success message (you can replace this with actual form submission)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill bars animation (if you want to add a skills section later)
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            const fill = bar.querySelector('.skill-fill');
            
            if (fill) {
                fill.style.width = percentage + '%';
            }
        });
    }

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Cursor trail effect (optional)
    let mouseCursor = document.createElement('div');
    mouseCursor.className = 'cursor-trail';
    document.body.appendChild(mouseCursor);

    document.addEventListener('mousemove', function(e) {
        mouseCursor.style.left = e.clientX + 'px';
        mouseCursor.style.top = e.clientY + 'px';
    });

    // Add cursor trail styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
            transform: translate(-50%, -50%);
        }
        
        .cursor-trail.active {
            transform: translate(-50%, -50%) scale(1.5);
            background: rgba(102, 126, 234, 0.5);
        }
    `;
    document.head.appendChild(cursorStyle);

    // Active cursor effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            mouseCursor.classList.add('active');
        });
        
        element.addEventListener('mouseleave', function() {
            mouseCursor.classList.remove('active');
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            case 'warning':
                notification.style.background = '#f59e0b';
                break;
            default:
                notification.style.background = '#667eea';
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Theme toggle (optional dark mode)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: white;
        border: 2px solid #667eea;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(themeToggle);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Apply debounce to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Your scroll handling code here
        console.log('Scroll event handled');
    }, 100);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Initialize all animations and effects
    console.log('Portfolio website initialized successfully!');
});

// Additional utility functions

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Text animation effect
function animateText(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Particle effect for background (optional)
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
    }
}

// Call particle effect (uncomment if you want particles)
// createParticles();
