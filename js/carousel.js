document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements
    const carousel = document.getElementById('heroCarousel');
    const container = document.getElementById('carouselContainer');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('carouselIndicators');
    
    // Set initial state
    let currentIndex = 0;
    let slideWidth = carousel.clientWidth;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 seconds between slides
    
    // Create indicator dots
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
        indicators.appendChild(indicator);
    });
    
    // Update indicator dots
    function updateIndicators() {
        const allIndicators = document.querySelectorAll('.carousel-indicator');
        allIndicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    }
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoplay();
    });
    
    // Handle keyboard navigation for accessibility
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        }
    });
    
    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoplayDelay);
    }
    
    // Reset autoplay timer
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = carousel.clientWidth;
        goToSlide(currentIndex);
    });
    
    // Initialize carousel
    startAutoplay();
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            goToSlide(currentIndex + 1);
            resetAutoplay();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            goToSlide(currentIndex - 1);
            resetAutoplay();
        }
    }
    
    // Add focus management for accessibility
    carousel.setAttribute('tabindex', '0');
    prevBtn.setAttribute('tabindex', '0');
    nextBtn.setAttribute('tabindex', '0');
});
