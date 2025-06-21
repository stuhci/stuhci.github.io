// Projects data loading and rendering script
document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch projects data from JSON file
  async function fetchProjectsData() {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects data:', error);
      return [];
    }
  }

  // Function to render projects on the projects page
  async function renderProjectsPage() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;

    const projectsData = await fetchProjectsData();

    // Get featured projects
    const featuredProjects = [];
    projectsData.forEach(pub => {
      if (pub.featured) {
        featuredProjects.push(pub);
      }
    });
    
    // Clear any existing content
    projectsContainer.innerHTML = '';
    
    // Render each project
    featuredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'card';
      
      // Create image element
      const imageElement = document.createElement('img');
      imageElement.src = project.image;
      imageElement.alt = project.title;
      imageElement.className = 'card-image';
      
      // Create content container
      const contentElement = document.createElement('div');
      contentElement.className = 'card-content';
      
      // Create title element
      const titleElement = document.createElement('h3');
      titleElement.className = 'card-title';
      titleElement.textContent = project.name;
      
      // Create abstract element
      const abstractElement = document.createElement('p');
      abstractElement.className = 'card-text';
      abstractElement.textContent = project.title_short;
      
      // Create link element
      const linkElement = document.createElement('a');
      linkElement.className = 'card-link';
      linkElement.href = `project_template.html?id=${project.id}`;
      linkElement.textContent = 'Learn More →';
      
      // Assemble the card
      contentElement.appendChild(titleElement);
      contentElement.appendChild(abstractElement);
      contentElement.appendChild(linkElement);
      
      projectCard.appendChild(imageElement);
      projectCard.appendChild(contentElement);

      // Scrolling animation
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
      
      // Add initial state class
      projectCard.classList.add('animate-on-scroll');
      // Start observing
      observer.observe(projectCard);
        
      // Add to container
      projectsContainer.appendChild(projectCard);
      });
  }

  // Initialize the projects page
  renderProjectsPage();
});

