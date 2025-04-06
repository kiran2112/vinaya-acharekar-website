// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav item
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Updated typing effect with sustainability-focused text
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('cursor');
    cursorSpan.textContent = '|';
    typedTextSpan.after(cursorSpan);

    const textArray = ["Sustainability Consultant", "ESG Strategist", "Environmental Advocate"];
    const typingDelay = 100;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Enhanced project filtering with animation
    const filterButtons = document.querySelectorAll('.filter');
    const projectCards = document.querySelectorAll('.project-card');

    // Make sure all projects are visible initially with smooth animation
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter clicked:', this.getAttribute('data-filter')); // Fixed missing closing parenthesis
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            console.log('Filter value:', filterValue);
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                console.log('Card category:', cardCategory);
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.add('show');
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    }, 10);
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Match this to your CSS transition time
                }
            });
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Form submission (you would need to add your own backend or service)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // You can add form submission logic here or connect to a backend service
            alert('Thank you for your message! This is a demo - in a real site, your message would be sent.');
            contactForm.reset();
        });
    }

    // Add bounce effect to highlighted words
    const highlights = document.querySelectorAll('.highlight');
    
    highlights.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Remove bounce class from all elements
            highlights.forEach(el => el.classList.remove('bounce'));
            // Add bounce class to current element
            element.classList.add('bounce');
        });
        
        element.addEventListener('mouseleave', () => {
            // Keep the bounce animation until it completes
            setTimeout(() => {
                element.classList.remove('bounce');
            }, 800); // Match the animation duration
        });
        
        // Also trigger on touch for mobile devices
        element.addEventListener('touchstart', () => {
            highlights.forEach(el => el.classList.remove('bounce'));
            element.classList.add('bounce');
            
            // Remove class after animation completes
            setTimeout(() => {
                element.classList.remove('bounce');
            }, 800);
        });
    });

    // Add video play functionality
    const videoContainer = document.querySelector('.video-card .project-image');
    const video = document.querySelector('.video-card .project-image video');
    const overlay = document.querySelector('.video-overlay');
    
    if (videoContainer && video && overlay) {
        videoContainer.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoContainer.classList.add('playing');
            } else {
                video.pause();
                videoContainer.classList.remove('playing');
            }
        });
        
        // Show overlay when video ends or is paused
        video.addEventListener('pause', function() {
            videoContainer.classList.remove('playing');
        });
        
        video.addEventListener('ended', function() {
            videoContainer.classList.remove('playing');
        });
    }

    // Check all images on page load to ensure they're loading correctly
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);
            // You can implement fallback behavior here
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});
