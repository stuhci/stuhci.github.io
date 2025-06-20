// Enhanced animations and interaction effects
document.addEventListener('DOMContentLoaded', function() {
  // Function to add enhanced scroll-triggered animations
  function setupScrollAnimations() {
    // Get all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.section, .card, .section-title, .member-card, .publication-item, .team-section');
    
    // Create an Intersection Observer with enhanced options
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add 'visible' class when element enters viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust trigger point to be slightly before element is fully in view
    });
    
    // Observe each element
    animatedElements.forEach(element => {
      // Add initial state class
      element.classList.add('animate-on-scroll');
      // Start observing
      observer.observe(element);
    });
  }
  
  // Enhanced function for interactive hover effects
  function setupHoverEffects() {
    // Add 3D tilt effect to cards
    const cards = document.querySelectorAll('.card, .member-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        // Calculate mouse position relative to card
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20; // Adjust divisor to control tilt sensitivity
        const rotateY = (centerX - x) / 20;
        
        // Apply 3D transform
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      // Reset transform on mouse leave
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        this.style.transition = 'transform 0.5s ease';
      });
      
      // Remove transition on mouse enter for smoother movement
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'box-shadow 0.3s ease';
      });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        
        // Position the ripple
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add hover effect to images
    const images = document.querySelectorAll('.card-image img, .member-photo');
    images.forEach(image => {
      // Create overlay for image hover effect if not already present
      if (!image.parentElement.querySelector('.image-overlay')) {
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');
        image.parentElement.style.position = 'relative';
        image.parentElement.appendChild(overlay);
      }
    });
  }
  
  // Enhanced page transitions
  function setupPageTransitions() {
    // Get all internal links
    const internalLinks = document.querySelectorAll('a[href^="index"], a[href^="news"], a[href^="projects"], a[href^="members"], a[href^="publications"], a[href^="project"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only if it's an internal link
        if (this.getAttribute('href').indexOf('http') !== 0) {
          e.preventDefault();
          const targetPage = this.getAttribute('href');
          
          // Add custom transition class based on target page
          let transitionClass = 'page-transition-out';
          
          // Different transitions for different page types
          if (targetPage.includes('project')) {
            transitionClass = 'page-transition-project';
          } else if (targetPage.includes('members')) {
            transitionClass = 'page-transition-team';
          } else if (targetPage.includes('publications')) {
            transitionClass = 'page-transition-publications';
          }
          
          document.body.classList.add(transitionClass);
          
          // Navigate after transition
          setTimeout(() => {
            window.location.href = targetPage;
          }, 400);
        }
      });
    });
    
    // Add class to body when page loads
    document.body.classList.add('page-transition-in');
    
    // Add custom CSS for different page types
    const style = document.createElement('style');
    style.textContent = `
      .page-transition-project {
        animation: slideOutLeft 0.4s ease-out forwards;
      }
      .page-transition-team {
        animation: slideOutUp 0.4s ease-out forwards;
      }
      .page-transition-publications {
        animation: slideOutDown 0.4s ease-out forwards;
      }
      @keyframes slideOutLeft {
        to {
          opacity: 0;
          transform: translateX(-30px);
        }
      }
      @keyframes slideOutUp {
        to {
          opacity: 0;
          transform: translateY(-30px);
        }
      }
      @keyframes slideOutDown {
        to {
          opacity: 0;
          transform: translateY(30px);
        }
      }
      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(26, 115, 232, 0.2) 0%, rgba(26, 115, 232, 0) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .card-image:hover .image-overlay,
      .member-photo:hover + .image-overlay {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Enhanced parallax effect for hero section
  function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      // Create parallax layers if they don't exist
      if (!heroSection.querySelector('.parallax-layer')) {
        // Add subtle background layers for parallax effect
        const layer1 = document.createElement('div');
        layer1.classList.add('parallax-layer', 'layer-1');
        
        const layer2 = document.createElement('div');
        layer2.classList.add('parallax-layer', 'layer-2');
        
        heroSection.appendChild(layer1);
        heroSection.appendChild(layer2);
        
        // Add CSS for parallax layers
        const style = document.createElement('style');
        style.textContent = `
          .hero {
            position: relative;
            overflow: hidden;
          }
          .parallax-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
          .layer-1 {
            background: radial-gradient(circle at 20% 80%, rgba(26, 115, 232, 0.05) 0%, rgba(26, 115, 232, 0) 50%);
          }
          .layer-2 {
            background: radial-gradient(circle at 80% 20%, rgba(26, 115, 232, 0.05) 0%, rgba(26, 115, 232, 0) 50%);
          }
        `;
        document.head.appendChild(style);
      }
      
      // Enhanced parallax scroll effect
      window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 800) { // Only apply effect near the top of the page
          const layer1 = heroSection.querySelector('.layer-1');
          const layer2 = heroSection.querySelector('.layer-2');
          
          if (layer1 && layer2) {
            layer1.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            layer2.style.transform = `translateY(${scrollPosition * 0.1}px)`;
          }
          
          heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
      });
    }
  }
  
  // Enhanced carousel animations
  function enhanceCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
      const slides = carousel.querySelectorAll('.carousel-slide');
      
      // Add active class to current slide for enhanced animations
      const updateSlideClasses = () => {
        const activeIndex = parseInt(carousel.getAttribute('data-active-slide') || '0');
        slides.forEach((slide, index) => {
          if (index === activeIndex) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
      };
      
      // Observe carousel for attribute changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-active-slide') {
            updateSlideClasses();
          }
        });
      });
      
      observer.observe(carousel, { attributes: true });
      
      // Initial update
      setTimeout(updateSlideClasses, 100);
    }
  }
  
  // Initialize all enhanced animation features
  setupScrollAnimations();
  // setupHoverEffects();
  // setupPageTransitions();
  setupParallaxEffect();
  enhanceCarousel();
});
