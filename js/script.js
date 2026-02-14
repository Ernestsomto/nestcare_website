// ===== PAGE LOADER =====
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.page-loader');
    
    // Hide loader after page load with minimum display time for branding
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            
            // Trigger fade-in animation for page content after loader hides
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(function() {
                document.body.style.opacity = '1';
            }, 50);
        }, 1500); // Minimum 1.5 seconds for branding
    });
    
    // Fallback: hide loader after 3 seconds if page takes too long to load
    setTimeout(function() {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.opacity = '1';
        }
    }, 3000);
});

// ===== MODERN NAVBAR TOGGLE - COMPLETELY FIXED =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (hamburger && navMenuContainer) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenuContainer.classList.toggle('active');
            
            // Change aria-expanded attribute for accessibility
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
        });
        
        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenuContainer.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenuContainer.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenuContainer.classList.contains('active') && 
                !hamburger.contains(e.target) && 
                !navMenuContainer.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenuContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                hamburger.classList.remove('active');
                navMenuContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ===== WHATSAPP BUTTON ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        // Add bounce effect on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 300 && Math.abs(currentScroll - lastScroll) > 10) {
                whatsappBtn.style.transform = 'scale(1.08)';
                setTimeout(() => {
                    whatsappBtn.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
                lastScroll = currentScroll;
            }
        });
        
        // Show button after scrolling down 500px
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                whatsappBtn.style.opacity = '1';
                whatsappBtn.style.transform = 'scale(1) rotate(0deg)';
            } else {
                whatsappBtn.style.opacity = '0';
                whatsappBtn.style.transform = 'scale(0.7) rotate(0deg)';
            }
        });
        
        // Initialize with hidden state
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.transform = 'scale(0.7)';
        whatsappBtn.style.transition = 'all 0.5s ease';
    }
});

// ===== FORM SUBMISSION HANDLING WITH MODAL - COMPLETELY FIXED =====
document.addEventListener('DOMContentLoaded', function() {
    // Handle main contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // IMPORTANT: Replace with your actual email address
        const yourEmail = "your-email@example.com"; // <-- CHANGE THIS TO YOUR EMAIL
        contactForm.action = contactForm.action.replace("your-email@example.com", yourEmail);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // First run validation
            if (!validateForm(contactForm)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create FormData object
            const formData = new FormData(contactForm);
            
            // Submit to FormSubmit using fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Show success modal
                    showFormSuccessModal();
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or contact us directly at info@nestcarecleaningservices.co.uk');
            })
            .finally(() => {
                // Restore button
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        });
    }
    
    // Handle support form
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        // IMPORTANT: Replace with your actual email address
        const supportEmail = "support@nestcarecleaningservices.co.uk"; // <-- CHANGE THIS TO YOUR SUPPORT EMAIL
        supportForm.action = supportForm.action.replace("support@nestcarecleaningservices.co.uk", supportEmail);
        
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // First run validation
            if (!validateForm(supportForm)) {
                return;
            }
            
            // Show loading state
            const submitBtn = supportForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';
            submitBtn.disabled = true;
            
            // Create FormData object
            const formData = new FormData(supportForm);
            
            // Submit to FormSubmit using fetch
            fetch(supportForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Show success modal
                    showFormSuccessModal();
                    // Reset form
                    supportForm.reset();
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your support request. Please try again or contact us directly at support@nestcarecleaningservices.co.uk');
            })
            .finally(() => {
                // Restore button
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        });
    }
    
    // Form validation function
    function validateForm(form) {
        let isValid = true;
        
        // Clear previous errors
        form.querySelectorAll('.error-message').forEach(msg => {
            msg.textContent = '';
        });
        
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('shake');
            const input = group.querySelector('input, select, textarea');
            if (input) input.classList.remove('error');
        });
        
        // Validate Name
        const name = form.querySelector('#name, #fullName');
        if (!name || !name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        } else if (name && name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Email
        const email = form.querySelector('#email, #supportEmail');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (email && !emailPattern.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone (UK format)
        const phone = form.querySelector('#phone, #supportPhone');
        const ukPhonePattern = /^(?:(?:\+44\s?|0)(?:7\d{3}\s?\d{6}|20\s?\d{4}\s?\d{4}|1\d{3}\s?\d{6}|[1-9]\d{2}\s?\d{3}\s?\d{4}))$/;
        
        if (!phone || !phone.value.trim()) {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (phone && !ukPhonePattern.test(phone.value.trim().replace(/[\s\-()]/g, ''))) {
            showError(phone, 'Please enter a valid UK phone number (e.g., 07XXX XXXXXX or 020 XXXX XXXX)');
            isValid = false;
        }
        
        // Validate Service Selection (Contact form)
        const service = form.querySelector('#service');
        if (service && service.value === '') {
            showError(service, 'Please select a service');
            isValid = false;
        }
        
        // Validate Request Type (Support form)
        const requestType = form.querySelector('#requestType');
        if (requestType && requestType.value === '') {
            showError(requestType, 'Please select a request type');
            isValid = false;
        }
        
        // Validate Service Needed (Support form)
        const serviceNeeded = form.querySelector('#serviceType');
        if (serviceNeeded && serviceNeeded.value === '') {
            showError(serviceNeeded, 'Please select a service needed');
            isValid = false;
        }
        
        // Validate Location Selection
        const location = form.querySelector('#location');
        if (location && location.value === '') {
            showError(location, 'Please select your location');
            isValid = false;
        }
        
        // Validate Message
        const message = form.querySelector('#message, #supportMessage');
        if (!message || !message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message && message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        if (!input) return;
        
        const errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.classList.add('error');
        
        // Add shake animation to parent
        const parent = input.closest('.form-group');
        if (parent) {
            parent.classList.add('shake');
            setTimeout(() => {
                parent.classList.remove('shake');
            }, 500);
        }
        
        // Scroll to error if not in view
        if (!isElementInViewport(input)) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Focus the input
        input.focus();
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Show form success modal
    window.showFormSuccessModal = function() {
        // Create modal if it doesn't exist
        let modal = document.getElementById('formSuccessModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'formSuccessModal';
            modal.className = 'form-success-modal';
            modal.innerHTML = `
                <div class="success-content">
                    <button class="close-modal" aria-label="Close success message">&times;</button>
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h2 class="success-title">Thank You for Contacting Us!</h2>
                    <p class="success-message">We've received your message and will get back to you shortly. Our team typically responds within 2-4 hours during business hours. For urgent matters, please call our emergency line at 020 1234 5678.</p>
                    <button class="success-btn" id="closeSuccessModal" aria-label="Close this message">Got it, thanks!</button>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal functionality
            document.querySelector('.close-modal').addEventListener('click', () => {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
            
            document.getElementById('closeSuccessModal').addEventListener('click', () => {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
            
            // Close when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Show modal
        modal.classList.add('show');
        
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#home') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const navMenuContainer = document.querySelector('.nav-menu-container');
            const hamburger = document.querySelector('.hamburger');
            if (navMenuContainer && navMenuContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenuContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailInput.value.trim()) {
            alert('Please enter your email address');
            return;
        }
        
        if (!emailPattern.test(emailInput.value.trim())) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// ===== JOBS SCROLLER =====
document.addEventListener('DOMContentLoaded', function() {
    const jobsTrack = document.getElementById('jobsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (jobsTrack && prevBtn && nextBtn) {
        // Pause animation on hover
        jobsTrack.addEventListener('mouseenter', () => {
            jobsTrack.classList.add('paused');
        });
        
        jobsTrack.addEventListener('mouseleave', () => {
            jobsTrack.classList.remove('paused');
        });
        
        // Manual navigation
        let currentPosition = 0;
        const cardWidth = 298; // Approximate card width + gap
        const totalCards = 9; // Total number of cards in track
        const visibleCards = Math.floor(jobsTrack.parentElement.clientWidth / cardWidth);
        const maxPosition = totalCards - visibleCards;
        
        prevBtn.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                updateTrackPosition();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPosition < maxPosition) {
                currentPosition++;
                updateTrackPosition();
            }
        });
        
        function updateTrackPosition() {
            // Pause auto-scroll during manual navigation
            jobsTrack.classList.add('paused');
            
            // Calculate transform value
            const transformValue = -currentPosition * cardWidth;
            jobsTrack.style.transform = `translateX(${transformValue}px)`;
            
            // Resume auto-scroll after 5 seconds of inactivity
            setTimeout(() => {
                jobsTrack.classList.remove('paused');
            }, 5000);
        }
        
        // Reset to auto-scroll after window resize
        window.addEventListener('resize', () => {
            jobsTrack.classList.remove('paused');
            currentPosition = 0;
            jobsTrack.style.transform = 'translateX(0)';
        });
    }
    
    // ===== PARALLAX EFFECT FOR HERO =====
    window.addEventListener('scroll', function() {
        const heroBg = document.querySelector('.hero-bg img');
        if (heroBg) {
            const scrollPosition = window.pageYOffset;
            heroBg.style.transform = `scale(1.1) translateY(${-scrollPosition * 0.1}px)`;
        }
    });
    
    // ===== SERVICE CARD HOVER EFFECT =====
    const serviceCards = document.querySelectorAll('.service-card-modern');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
    
    // ===== SCROLL INDICATOR FUNCTIONALITY =====
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#services').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        
        button.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const expanded = button.getAttribute('aria-expanded') === 'true';
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherButton = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherButton.setAttribute('aria-expanded', 'false');
                    otherAnswer.hidden = true;
                }
            });
            
            // Toggle current item
            button.setAttribute('aria-expanded', !expanded);
            answer.hidden = expanded;
        });
    });
    
    // ===== FADE-IN ANIMATIONS ON SCROLL =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in
    document.querySelectorAll('.service-card-modern, .job-card, .area-card, .about-grid, .contact-grid, .stats, .feature-card, .testimonial-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'translateY(0)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(20px)';
    }
});

// ===== SEO ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Track form submissions in GA4
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form Submitted',
                    'value': 1
                });
            }
        });
    }
    
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Support',
                    'event_label': 'Support Form Submitted',
                    'value': 1
                });
            }
        });
    }
    
    // Track WhatsApp clicks
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'WhatsApp Click',
                    'value': 1
                });
            }
        });
    }
    
    // Track phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Click',
                    'value': 1
                });
            }
        });
    });
    
    // Implement scroll depth tracking
    let scrollDepthTracked = false;
    window.addEventListener('scroll', () => {
        if (!scrollDepthTracked && window.pageYOffset > document.body.scrollHeight * 0.75) {
            if (typeof gtag === 'function') {
                gtag('event', 'scroll_depth', {
                    'event_category': 'Engagement',
                    'event_label': '75% Scrolled',
                    'value': 1
                });
            }
            scrollDepthTracked = true;
        }
    });
});

// ===== ADDITIONAL HELPER FUNCTIONS =====
// Function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to show success notification
function showSuccess(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.innerHTML = `
        <i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add notification styles if not exists
if (!document.querySelector('#notification-style')) {
    const style = document.createElement('style');
    style.id = 'notification-style';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 50px;
            color: white;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            opacity: 1;
            transition: opacity 0.3s ease;
            font-family: 'Poppins', sans-serif;
        }
        .notification.success {
            background: linear-gradient(45deg, #27ae60, #2ecc71);
        }
        .notification.error {
            background: linear-gradient(45deg, #e74c3c, #c0392b);
        }
        @keyframes slideIn {
            from { transform: translateX(150px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}