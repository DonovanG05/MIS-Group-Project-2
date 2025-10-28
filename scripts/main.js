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

// API Configuration
const API_BASE_URL = '';

// API Helper Functions
async function apiRequest(endpoint, data = null, method = 'POST') {
    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        return { success: false, message: 'Network error. Please check your connection.' };
    }
}

// Predefined login credentials (fallback for demo)
const LOGIN_CREDENTIALS = {
    // Teacher credentials
    'teacher@classroots.edu': { password: 'teacher123', role: 'teacher', name: 'Sarah Johnson' },
    
    // Parent credentials
    'parent@classroots.edu': { password: 'parent123', role: 'parent', name: 'John Smith' },
    
    // Admin credentials
    'admin@classroots.edu': { password: 'admin123', role: 'admin', name: 'Robert Anderson' }
};

// User management functions (fallback to local storage if API fails)
function getRegisteredUsers() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : {};
}

function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

function registerUser(name, email, password, userType) {
    const users = getRegisteredUsers();
    users[email] = {
        password: password,
        role: userType,
        name: name,
        registeredAt: new Date().toISOString()
    };
    saveRegisteredUsers(users);
    return users[email];
}

// Sign In Handler
async function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    showLoadingState(submitBtn);
    
    try {
        // Try file-based API authentication first
        const apiResult = await apiRequest('api.php', {
            action: 'login',
            email: email,
            password: password
        });
        
        if (apiResult.success) {
            // Store user info in sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify({
                email: apiResult.user.email,
                role: apiResult.user.role,
                name: apiResult.user.name,
                id: apiResult.user.id
            }));
            
            showAlert(`Welcome back, ${apiResult.user.name}! Redirecting...`, 'success');
            
            // Redirect based on role
            setTimeout(() => {
                switch(apiResult.user.role) {
                    case 'teacher':
                        window.location.href = 'teacher.html';
                        break;
                    case 'parent':
                        window.location.href = 'parent.html';
                        break;
                    case 'admin':
                        window.location.href = 'admin.html';
                        break;
                    default:
                        showAlert('Invalid user role', 'danger');
                }
            }, 1000);
            
        } else {
            // Fallback to local authentication if API fails
            console.log('API failed, trying local authentication...');
            
            // Check predefined credentials first
            let user = LOGIN_CREDENTIALS[email];
            
            // If not found in predefined, check registered users
            if (!user) {
                const registeredUsers = getRegisteredUsers();
                user = registeredUsers[email];
            }
            
            if (user && user.password === password) {
                // Store user info in sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    role: user.role,
                    name: user.name
                }));
                
                showAlert(`Welcome back, ${user.name}! Redirecting...`, 'success');
                
                // Redirect based on role
                setTimeout(() => {
                    switch(user.role) {
                        case 'teacher':
                            window.location.href = 'teacher.html';
                            break;
                        case 'parent':
                            window.location.href = 'parent.html';
                            break;
                        case 'admin':
                            window.location.href = 'admin.html';
                            break;
                        default:
                            showAlert('Invalid user role', 'danger');
                    }
                }, 1000);
                
            } else {
                showAlert(apiResult.message || 'Invalid email or password. Please try again.', 'danger');
            }
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showAlert('Login failed. Please try again.', 'danger');
    } finally {
        hideLoadingState(submitBtn);
        // Reset form
        e.target.reset();
    }
}

// Sign Up Handler
async function handleSignUp(e) {
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
    
    try {
        // Try file-based API registration first
        const apiResult = await apiRequest('api.php', {
            action: 'register',
            name: name,
            email: email,
            password: password,
            userType: userType
        });
        
        if (apiResult.success) {
            showAlert(`Welcome to Class Roots, ${name}! Your account has been created successfully. You can now sign in.`, 'success');
            
            // Reset form
            e.target.reset();
            
            // Auto-fill the sign-in form
            document.getElementById('signInEmail').value = email;
            
        } else {
            // Fallback to local registration if API fails
            console.log('API failed, trying local registration...');
            
            // Check if user already exists
            const registeredUsers = getRegisteredUsers();
            if (registeredUsers[email] || LOGIN_CREDENTIALS[email]) {
                showAlert('An account with this email already exists. Please use a different email or sign in.', 'danger');
                return;
            }
            
            try {
                const newUser = registerUser(name, email, password, userType);
                
                // Show success message
                showAlert(`Welcome to Class Roots, ${name}! Your account has been created successfully. You can now sign in.`, 'success');
                
                // Reset form
                e.target.reset();
                
                // Auto-fill the sign-in form
                document.getElementById('signInEmail').value = email;
                
            } catch (error) {
                showAlert('There was an error creating your account. Please try again.', 'danger');
                console.error('Registration error:', error);
            }
        }
        
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('Registration failed. Please try again.', 'danger');
    } finally {
        hideLoadingState(submitBtn);
    }
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
