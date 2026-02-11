// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryCategories = document.querySelectorAll('.gallery-category');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter gallery categories
        galleryCategories.forEach(category => {
            const photos = category.querySelectorAll('.photos');
            const videos = category.querySelectorAll('.videos');
            
            if (filterValue === 'all') {
                category.style.display = 'block';
                category.style.opacity = '1';
            } else if (filterValue === 'photos') {
                if (photos.length > 0) {
                    category.style.display = 'block';
                    category.style.opacity = '1';
                } else {
                    category.style.opacity = '0';
                    setTimeout(() => category.style.display = 'none', 300);
                }
            } else if (filterValue === 'videos') {
                if (videos.length > 0) {
                    category.style.display = 'block';
                    category.style.opacity = '1';
                } else {
                    category.style.opacity = '0';
                    setTimeout(() => category.style.display = 'none', 300);
                }
            }
        });
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Format message for WhatsApp
            const whatsappMessage = `*Prayer Request*%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
            
            // WhatsApp number (replace with your church's number)
            const phoneNumber = '919442323523'; // Replace with actual number
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
            
            alert(`Thank you ${name}! Your prayer request has been sent via WhatsApp.`);
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe founder cards and info cards
document.querySelectorAll('.founder-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('Website initialized successfully!');
