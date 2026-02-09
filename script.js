// Console welcome message
console.log('%c Welcome to Elishama Paluku\'s Portfolio! ', 
            'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c Fun: Click the "Click Me!" button to see it grow and morph! 🎯', 
            'background: #fbbf24; color: #1f2937; font-size: 12px; padding: 5px; border-radius: 3px;');

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('theme-toggle');

    // Theme Toggle Functionality
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeToggle(theme);
    };

    const updateThemeToggle = (theme) => {
        const thumb = themeToggle.querySelector('.theme-toggle-thumb');
        if (theme === 'dark') {
            thumb.style.transform = 'translateX(28px)';
        } else {
            thumb.style.transform = 'translateX(0)';
        }
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Show notification
        showNotification(`${newTheme === 'dark' ? '🌙 Enhanced Dark' : '☀️ Enhanced Light'} mode activated`, 'success');
    };

    themeToggle.addEventListener('click', toggleTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeToggle(newTheme);
        }
    });

    // Initialize theme on load
    initTheme();

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
    });

    // Initial call
    updateActiveNavLink();
    updateNavbarBackground();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Create mailto link
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:skyssando@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Opening your email client...', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Resume download functionality
    const resumeButtons = document.querySelectorAll('a[href="#contact"]');
    resumeButtons.forEach(button => {
        if (button.textContent.includes('Download Résumé')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                downloadResume();
            });
        }
    });

    // Add download resume button to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const contactInfo = contactSection.querySelector('.contact-info');
        if (contactInfo) {
            const resumeButton = document.createElement('div');
            resumeButton.className = 'contact-item resume-download';
            resumeButton.innerHTML = `
                <i class="fas fa-download"></i>
                <div>
                    <h3>Download Résumé</h3>
                    <a href="#" id="resume-link" class="resume-link">Get my latest CV in PDF format</a>
                </div>
            `;
            contactInfo.appendChild(resumeButton);
            
            // Add event listener to the new resume link
            document.getElementById('resume-link').addEventListener('click', function(e) {
                e.preventDefault();
                downloadResume();
            });
        }
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .certification-card, .course-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced 3D Name Animation
    const init3DTitle = () => {
        const title3DContainer = document.querySelector('.title-3d-container');
        const title3DElements = document.querySelectorAll('.title-3d');
        
        if (!title3DContainer) return;
        
        // Mouse move effect for 3D title
        title3DContainer.addEventListener('mousemove', (e) => {
            const rect = title3DContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / centerY) * -15;
            const rotateY = (mouseX / centerX) * 15;
            
            title3DContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset on mouse leave
        title3DContainer.addEventListener('mouseleave', () => {
            title3DContainer.style.transform = 'rotateX(0) rotateY(0)';
        });
        
        // Individual word animations
        title3DElements.forEach((element, index) => {
            // Entrance animation
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) translateZ(-100px) rotateX(90deg)';
            
            setTimeout(() => {
                element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) translateZ(0) rotateX(0)';
            }, 1000 + (index * 300));
            
            // Click interaction
            element.addEventListener('click', function() {
                this.style.transform = 'translateZ(50px) rotateX(360deg) scale(1.1)';
                this.style.color = 'var(--accent-color)';
                
                // Create particle effect
                createParticles(this);
                
                setTimeout(() => {
                    this.style.transform = 'translateZ(0) rotateX(0) scale(1)';
                    this.style.color = 'var(--text-primary)';
                }, 600);
            });
        });
    };
    
    // Particle effect for title clicks
    const createParticles = (element) => {
        const rect = element.getBoundingClientRect();
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'title-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            const lifetime = 1000 + Math.random() * 500;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: lifetime,
                easing: 'cubic-bezier(0, 0.9, 0.57, 1)'
            }).onfinish = () => particle.remove();
        }
    };

    // Skill Orbit Animation
    const initSkillOrbit = () => {
        const orbitIcons = document.querySelectorAll('.orbit-icon');
        let currentAngle = 0;
        let isAnimating = true;
        
        const animateOrbit = () => {
            if (!isAnimating) return;
            
            currentAngle += 0.5; // Rotation speed
            
            orbitIcons.forEach((icon, index) => {
                const angle = (currentAngle + (index * 60)) * (Math.PI / 180);
                const radius = 140;
                
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                icon.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            requestAnimationFrame(animateOrbit);
        };
        
        // Start orbit animation
        setTimeout(() => {
            animateOrbit();
        }, 2000);
        
        // Click handlers for orbit icons
        orbitIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const skill = this.dataset.skill;
                const section = this.dataset.section;
                
                // Remove active class from all icons
                orbitIcons.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked icon
                this.classList.add('active');
                
                // Highlight corresponding skill category
                highlightSkillCategory(skill);
                
                // Scroll to skills section
                if (section === 'skills') {
                    const skillsSection = document.getElementById('skills');
                    if (skillsSection) {
                        skillsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                // Remove active class after 3 seconds
                setTimeout(() => {
                    this.classList.remove('active');
                }, 3000);
                
                // Create orbit particle effect
                createOrbitParticles(this);
            });
            
            // Hover effect
            icon.addEventListener('mouseenter', function() {
                this.style.zIndex = '20';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.zIndex = '';
            });
        });
    };
    
    const highlightSkillCategory = (skill) => {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const text = category.textContent.toLowerCase();
            
            if (text.includes(skill.toLowerCase()) || 
                (skill === 'react' && text.includes('web')) ||
                (skill === 'python' && text.includes('machine')) ||
                (skill === 'security' && text.includes('cyber')) ||
                (skill === 'database' && text.includes('database')) ||
                (skill === 'ai' && text.includes('machine')) ||
                (skill === 'linux' && text.includes('devops'))) {
                
                category.style.transform = 'translateY(-10px) scale(1.05)';
                category.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
                category.style.borderColor = 'var(--primary-color)';
                
                setTimeout(() => {
                    category.style.transform = '';
                    category.style.boxShadow = '';
                    category.style.borderColor = '';
                }, 2000);
            }
        });
    };
    
    const createOrbitParticles = (element) => {
        const rect = element.getBoundingClientRect();
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'orbit-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 150 + Math.random() * 100;
            const lifetime = 1500 + Math.random() * 500;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: lifetime,
                easing: 'cubic-bezier(0, 0.9, 0.57, 1)'
            }).onfinish = () => particle.remove();
        }
    };
    
    // Initialize 3D title
    init3DTitle();
    initSkillOrbit();
    
    // Animated hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 2000);
    }
    
    // Animated hero description
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroDescription.style.transition = 'all 0.8s ease';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 2500);
    }
    
    // Animated hero buttons
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroButtons.style.transition = 'all 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 3000);
    }

    // Enhanced skill category interactions
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((skill, index) => {
        // Staggered entrance animation
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            skill.style.transition = 'all 0.6s ease';
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Interactive hover effects
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = 'var(--accent-color)';
            }
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-sm)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--primary-color)';
            }
        });
        
        // Click interaction
        skill.addEventListener('click', function() {
            createRipple(event, this);
            
            // Pulse effect
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                createRipple(e, this);
            }
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            
            // Animate project image icon
            const icon = this.querySelector('.project-image i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-sm)';
            
            // Reset icon animation
            const icon = this.querySelector('.project-image i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Enhanced certification card interactions
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach((card, index) => {
        // Staggered entrance
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 150);
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(139, 92, 246, 0.2)';
            
            const icon = this.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.color = 'var(--accent-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-sm)';
            
            const icon = this.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--primary-color)';
            }
        });
    });
    
    // Interactive course items
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach((item, index) => {
        // Staggered entrance
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 50);
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.15)';
            this.style.borderColor = 'var(--primary-color)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
            this.style.borderColor = 'var(--border-color)';
        });
    });
    const style = document.createElement('style');
    style.textContent = `
        .resume-download {
            cursor: pointer;
            transition: var(--transition);
        }
        
        .resume-download:hover {
            transform: translateY(-2px);
        }
        
        .resume-link {
            color: var(--accent-color) !important;
            font-weight: 600;
        }
        
        .resume-link:hover {
            color: var(--primary-color) !important;
        }
        
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: var(--shadow-lg);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .notification.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .skill-progress {
            height: 8px;
            background: var(--bg-alt);
            border-radius: 4px;
            overflow: hidden;
            margin-top: 0.5rem;
        }
        
        .skill-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            border-radius: 4px;
            width: 0;
            transition: width 1.5s ease;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-100px);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
                background: rgba(99, 102, 241, 0.3);
            }
            100% {
                transform: scale(4);
                opacity: 0;
                background: rgba(99, 102, 241, 0);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        }
        
        .project-card, .skill-category, .certification-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function downloadResume() {
    const { jsPDF } = window.jspdf;
    
    // Create PDF document
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Set fonts
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    
    // Header
    pdf.setTextColor(99, 102, 241); // Primary color
    pdf.text('SHAMMAH PALUKU', 105, 30, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Software Developer | AI & Cybersecurity', 105, 40, { align: 'center' });
    
    // Contact info
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Email: skyssando@gmail.com', 105, 50, { align: 'center' });
    pdf.text('Phone: +250 607-123-456', 105, 55, { align: 'center' });
    pdf.text('GitHub: github.com/shammahpaluku', 105, 60, { align: 'center' });
    
    // Line separator
    pdf.setDrawColor(99, 102, 241);
    pdf.setLineWidth(0.5);
    pdf.line(20, 70, 190, 70);
    
    // Professional Summary
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(99, 102, 241);
    pdf.text('PROFESSIONAL SUMMARY', 20, 85);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    const summary = `Information Technology professional with experience in full-stack development, 
AI-powered medical imaging applications, and secure system design. 
Specializing in building scalable web applications and implementing machine 
learning pipelines for real-world solutions.`;
    
    const summaryLines = pdf.splitTextToSize(summary, 170);
    let yPosition = 95;
    summaryLines.forEach(line => {
        pdf.text(line, 20, yPosition);
        yPosition += 5;
    });
    
    // Skills Section
    yPosition += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(99, 102, 241);
    pdf.text('TECHNICAL SKILLS', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    
    const skills = [
        'Programming Languages: Python, JavaScript, TypeScript, Java, C++, SQL',
        'Web Technologies: React, Node.js, HTML5, CSS3, Express.js, Next.js',
        'AI/ML: TensorFlow, PyTorch, Scikit-learn, Keras, OpenCV',
        'Cybersecurity: Network Security, Penetration Testing, Cryptography, SIEM',
        'Databases: PostgreSQL, MongoDB, MySQL, Redis',
        'Tools & Platforms: Git, Docker, AWS, Google Cloud, Linux'
    ];
    
    skills.forEach(skill => {
        const skillLines = pdf.splitTextToSize(skill, 170);
        skillLines.forEach(line => {
            pdf.text(line, 20, yPosition);
            yPosition += 5;
        });
        yPosition += 2;
    });
    
    // Experience Section
    yPosition += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(99, 102, 241);
    pdf.text('PROFESSIONAL EXPERIENCE', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Full Stack Developer', 20, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Tech Company | 2022 - Present', 20, yPosition + 5);
    
    yPosition += 12;
    const experience = [
        '• Developed and maintained full-stack web applications using React and Node.js',
        '• Implemented machine learning models for predictive analytics and data processing',
        '• Conducted security assessments and implemented robust security measures',
        '• Optimized database queries and improved application performance by 40%',
        '• Collaborated with cross-functional teams to deliver high-quality software solutions'
    ];
    
    experience.forEach(exp => {
        const expLines = pdf.splitTextToSize(exp, 170);
        expLines.forEach(line => {
            pdf.text(line, 25, yPosition);
            yPosition += 5;
        });
    });
    
    // Education Section
    yPosition += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(99, 102, 241);
    pdf.text('EDUCATION', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Bachelor of Science in Computer Science', 20, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('University Name | 2018 - 2022', 20, yPosition + 5);
    
    // Projects Section
    yPosition += 15;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(99, 102, 241);
    pdf.text('PROJECTS', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    pdf.text('AI-Powered Portfolio Website', 20, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const projectDesc = 'Personal portfolio featuring AI-powered interactions, responsive design, and modern web technologies.';
    const projectLines = pdf.splitTextToSize(projectDesc, 170);
    yPosition += 5;
    projectLines.forEach(line => {
        pdf.text(line, 20, yPosition);
        yPosition += 5;
    });
    
    yPosition += 5;
    pdf.text('Technologies: React, JavaScript, CSS3, AI/ML Libraries', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Ekelea App - E-commerce Platform', 20, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const ekeleaDesc = 'Comprehensive e-commerce platform with product catalog, secure payments, and real-time inventory management.';
    const ekeleaLines = pdf.splitTextToSize(ekeleaDesc, 170);
    yPosition += 5;
    ekeleaLines.forEach(line => {
        pdf.text(line, 20, yPosition);
        yPosition += 5;
    });
    
    yPosition += 5;
    pdf.text('Technologies: React, Node.js, MongoDB, Express.js, Stripe API', 20, yPosition);
    
    // Footer
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Generated from shammahpaluku.github.io', 105, 280, { align: 'center' });
    
    // Save the PDF
    pdf.save('Shammah_Paluku_Resume.pdf');
    
    showNotification('Resume PDF downloaded successfully!', 'success');
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll-related functions are already handled in the main event listener
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add loading state for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class styling
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body.loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Console welcome message
console.log('%c Welcome to Elishama Paluku\'s Portfolio! ', 
            'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c Fun: Click the "Click Me!" button to see it grow and morph! 🎯', 
            'background: #fbbf24; color: #1f2937; font-size: 12px; padding: 5px; border-radius: 3px;');

// Interactive Click Me Button
class ClickMeButton {
    constructor() {
        this.button = document.getElementById('click-me-btn');
        this.btnText = document.querySelector('.btn-text');
        this.btnEmoji = document.querySelector('.btn-emoji');
        this.clickCount = 0;
        this.messages = [
            "Click Me!",
            "Again!",
            "More!",
            "Keep Going!",
            "Don't Stop!",
            "Almost There!",
            "One More!",
            "You're Crazy!",
            "INSANE!",
            "🎯🎯🎯"
        ];
        this.emojis = ['🎯', '🌟', '🚀', '💫', '⭐', '✨', '🎪', '🎭', '🎨', '🎯'];
        
        this.init();
    }
    
    init() {
        this.button.addEventListener('click', (e) => {
            this.handleClick(e);
        });
    }
    
    handleClick(e) {
        this.clickCount++;
        
        // Create ripple effect
        this.createRipple(e);
        
        // Change shape and size
        this.morphButton();
        
        // Update text and emoji
        this.updateContent();
        
        // Add particle effect
        this.createParticles();
        
        // Reset after 7 clicks
        if (this.clickCount >= 10) {
            setTimeout(() => {
                this.resetButton();
            }, 2000);
        }
    }
    
    morphButton() {
        // Remove all shape classes
        for (let i = 1; i <= 7; i++) {
            this.button.classList.remove(`shape-${i}`);
            this.btnText.classList.remove(`shape-${i}`);
            this.btnEmoji.classList.remove(`shape-${i}`);
        }
        
        // Add new shape based on click count
        const shapeNumber = Math.min(this.clickCount, 7);
        this.button.classList.add(`shape-${shapeNumber}`);
        this.btnText.classList.add(`shape-${shapeNumber}`);
        this.btnEmoji.classList.add(`shape-${shapeNumber}`);
        
        // Add random rotation
        const randomRotation = (Math.random() - 0.5) * 30;
        this.button.style.transform = `rotate(${randomRotation}deg) scale(${1 + (this.clickCount * 0.1)})`;
    }
    
    updateContent() {
        const messageIndex = Math.min(this.clickCount - 1, this.messages.length - 1);
        const emojiIndex = Math.min(this.clickCount - 1, this.emojis.length - 1);
        
        if (this.messages[messageIndex]) {
            this.btnText.textContent = this.messages[messageIndex];
        }
        
        if (this.emojis[emojiIndex]) {
            this.btnEmoji.textContent = this.emojis[emojiIndex];
        }
        
        // Change colors based on click count
        const hue = (this.clickCount * 30) % 360;
        this.button.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${hue + 60}, 70%, 50%))`;
    }
    
    createRipple(e) {
        const ripple = document.createElement('span');
        ripple.className = 'click-btn-ripple';
        
        const rect = this.button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    createParticles() {
        const rect = this.button.getBoundingClientRect();
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            const lifetime = 1000 + Math.random() * 500;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: lifetime,
                easing: 'cubic-bezier(0, 0.9, 0.57, 1)'
            }).onfinish = () => particle.remove();
        }
    }
    
    resetButton() {
        this.clickCount = 0;
        
        // Remove all shape classes
        for (let i = 1; i <= 7; i++) {
            this.button.classList.remove(`shape-${i}`);
            this.btnText.classList.remove(`shape-${i}`);
            this.btnEmoji.classList.remove(`shape-${i}`);
        }
        
        // Reset content
        this.btnText.textContent = "Click Me!";
        this.btnEmoji.textContent = "🎯";
        
        // Reset styles
        this.button.style.transform = '';
        this.button.style.background = '';
        
        // Show celebration message
        this.showCelebration();
    }
    
    showCelebration() {
        const celebration = document.createElement('div');
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-primary);
            color: var(--text-primary);
            padding: 2rem;
            border-radius: var(--border-radius-lg);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            animation: celebrationPop 0.5s ease-out;
        `;
        
        celebration.innerHTML = `
            <div>🎉 Congratulations! 🎉</div>
            <div style="font-size: 1rem; margin-top: 1rem; font-weight: normal;">You clicked ${this.clickCount} times!</div>
            <div style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-secondary);">Button reset for more fun!</div>
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }
}

// Add celebration animation
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(celebrationStyle);

// Initialize click me button
const clickMeButton = new ClickMeButton();
