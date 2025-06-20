// Collaborations data loading and rendering script
document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch collaborations data from JSON file
  async function fetchCollaborationsData() {
    try {
      const response = await fetch('data/collaborations.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching collaborations data:', error);
      return [];
    }
  }

  // Function to render collaborations on the main page
  async function renderCollaborationsSection() {
    const collaborationContainer = document.getElementById('collaborationContainer');
    if (!collaborationContainer) return;

    const collaborationsData = await fetchCollaborationsData();
    
    // Clear any existing content
    collaborationContainer.innerHTML = '';
    
    // Render each collaboration
    collaborationsData.forEach((collaboration, index) => {
      const collaborationCard = document.createElement('div');
      collaborationCard.className = 'collaboration-card';
      
      // Create image element
      const imageElement = document.createElement("img");
      imageElement.src = collaboration.image;
      imageElement.alt = collaboration.name;
      imageElement.className = "collaboration-logo";
      
      // Add specific style for MEI Lab logo
      if (collaboration.name === "MEI Lab") {
        collaborationCard.style.backgroundColor = "dimgray"; // Or any dark color
      }
      
      // Add click handler to open link
      collaborationCard.addEventListener('click', function() {
        if (collaboration.link && collaboration.link !== '#') {
          window.open(collaboration.link, '_blank');
        }
      });
      
      // Add hover effect for cursor
      if (collaboration.link && collaboration.link !== '#') {
        collaborationCard.style.cursor = 'pointer';
      }
      
      // Assemble the card
      collaborationCard.appendChild(imageElement);

      // Scrolling animation - similar to project cards
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
      
      // Add initial state class for animation
      collaborationCard.classList.add('animate-on-scroll');
      // Start observing
      observer.observe(collaborationCard);
        
      // Add to container
      collaborationContainer.appendChild(collaborationCard);
    });
  }

  // Initialize the collaborations section
  renderCollaborationsSection();
});

