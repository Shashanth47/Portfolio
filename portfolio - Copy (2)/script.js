document.addEventListener('DOMContentLoaded', function() {
    // Project category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projects = document.querySelectorAll('.project');

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                // Show/hide projects based on category
                projects.forEach(project => {
                    if (category === 'all' || project.getAttribute('data-type') === category) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Logo tooltip for resume download
    const logoLink = document.querySelector('.logo a');
    logoLink.setAttribute('title', 'Click to download my resume');
    
    // Theme persistence across pages
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check if theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeToggle.checked = true;
    }
    
    // Save theme preference when changed
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Close mobile menu when clicking on overlay
    overlay.addEventListener('click', function() {
        mobileMenuToggle.checked = false;
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.checked = false;
        });
    });
    
    // Disable body scroll when mobile menu is open
    mobileMenuToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Add touch swipe gesture to close menu
    let startX;
    const mobileMenu = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    mobileMenu.addEventListener('touchmove', function(e) {
        if (!startX) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        // If swiping left (diff > 0) and menu is open
        if (diff > 50 && mobileMenuToggle.checked) {
            mobileMenuToggle.checked = false;
            document.body.style.overflow = '';
            startX = null;
        }
    });
}); 