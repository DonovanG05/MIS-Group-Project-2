// Class Roots - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handlers
    initializeForms();
    
    // Add smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Add fade-in animations
    initializeAnimations();
});

// Form handling
function initializeForms() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (signInForm) {
        signInForm.addEventListener('submit', handleSignIn);
    }
    
    if (signUpForm) {
        signUpForm.addEventListener('submit', handleSignUp);
    }
}

// Sign In Handler
function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    showLoadingState(submitBtn);
    
    // Simulate API call (replace with actual authentication)
    setTimeout(() => {
        hideLoadingState(submitBtn);
        
        // For now, just show success message
        showAlert('Sign in successful! Redirecting...', 'success');
        
        // In a real app, you would redirect to dashboard
        console.log('Sign In:', { email, password });
        
        // Reset form
        e.target.reset();
    }, 1500);
}

// Sign Up Handler
function handleSignUp(e) {
    e.preventDefault();
    
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const userType = document.getElementById('userType').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validate password strength
    if (!validatePassword(password)) {
        showAlert('Password must be at least 8 characters with letters and numbers', 'danger');
        return;
    }
    
    // Show loading state
    showLoadingState(submitBtn);
    
    // Simulate API call (replace with actual registration)
    setTimeout(() => {
        hideLoadingState(submitBtn);
        
        // For now, just show success message
        showAlert(`Welcome to Class Roots, ${name}! Please check your email to verify your account.`, 'success');
        
        // In a real app, you would handle the registration
        console.log('Sign Up:', { name, email, password, userType });
        
        // Reset form
        e.target.reset();
    }, 2000);
}

// Password validation
function validatePassword(password) {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return password.length >= minLength && hasLetter && hasNumber;
}

// Loading state management
function showLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function hideLoadingState(button) {
    button.classList.remove('loading');
    button.disabled = false;
}

// Alert system
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation initialization
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .text-center, .list-unstyled');
    animateElements.forEach(el => observer.observe(el));
}

// Support modal functions
function openSupportModal() {
    const modal = new bootstrap.Modal(document.getElementById('supportModal'));
    modal.show();
}

function submitSupportForm() {
    const form = document.getElementById('supportForm');
    const formData = new FormData(form);
    
    const supportData = {
        name: formData.get('supportName') || document.getElementById('supportName').value,
        email: formData.get('supportEmail') || document.getElementById('supportEmail').value,
        subject: formData.get('supportSubject') || document.getElementById('supportSubject').value,
        message: formData.get('supportMessage') || document.getElementById('supportMessage').value
    };
    
    // Validate form
    if (!supportData.name || !supportData.email || !supportData.subject || !supportData.message) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Simulate sending support request
    showAlert('Support request sent! We\'ll get back to you within 24 hours.', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('supportModal'));
    modal.hide();
    
    // Reset form
    form.reset();
    
    console.log('Support Request:', supportData);
}

// Utility function to check if user is on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Handle window resize
window.addEventListener('resize', function() {
    // Add any responsive behavior here if needed
    if (isMobile()) {
        // Mobile-specific adjustments
        console.log('Mobile view detected');
    } else {
        // Desktop-specific adjustments
        console.log('Desktop view detected');
    }
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.col-md-4 .text-center');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
