// Navbar scroll effect
const navbar = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle (Basic setup for future expansion)
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navbar.classList.toggle('menu-open');
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if(window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Fan Zone MVP Poll Submission Logic
const pollForm = document.getElementById('mvp-poll-form');
if (pollForm) {
    pollForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        // Check if an option is selected
        const selectedOption = document.querySelector('input[name="mvp"]:checked');
        const messageContainer = document.getElementById('poll-message');
        
        if (selectedOption) {
            // Hide the button and show success message
            const submitBtn = pollForm.querySelector('button[type="submit"]');
            submitBtn.style.display = 'none';
            
            messageContainer.textContent = 'Your vote successfully submitted!';
            messageContainer.style.display = 'block';
            messageContainer.classList.add('animate-in');
            
            // Optional: disable radio buttons after voting
            const radios = pollForm.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => radio.disabled = true);
        } else {
            // Show error if no option selected
            messageContainer.textContent = 'Please select a player to vote.';
            messageContainer.style.color = '#ff4d4f'; // red error color
            messageContainer.style.display = 'block';
        }
    });
}
