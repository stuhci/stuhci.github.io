
// Publications data loading and rendering script
document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch publications data from JSON file
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

  // Function to render publications page
  async function renderPublicationsPage() {
    const publicationsContainer = document.getElementById('publicationsContainer');
    if (!publicationsContainer) return;

    const projectsData = await fetchProjectsData();
    publicationsData = projectsData["publications"]
    
    // Clear any existing content
    publicationsContainer.innerHTML = '';
    
    // Group publications by year
    const publicationsByYear = {};

    projectsData.forEach(proj => {
      proj["publications"].forEach(pub => {
        if (!publicationsByYear[pub.year]) {
          publicationsByYear[pub.year] = [];
        }
        publicationsByYear[pub.year].push(pub);
      })
    })
    
    // Sort years in descending order
    const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b - a);
    
    // Render each year section
    sortedYears.forEach(year => {
      // Create year section
      const yearSection = document.createElement('div');
      yearSection.className = 'year-section';
      
      // Year title
      const yearTitle = document.createElement('h2');
      yearTitle.className = 'section-subtitle';
      yearTitle.textContent = year;
      yearSection.appendChild(yearTitle);
      
      // Sort publications within year by title
      const yearPublications = publicationsByYear[year].sort((a, b) => a.title.localeCompare(b.title));
      
      // Render each publication
      yearPublications.forEach((pub, index) => {
        const pubItem = document.createElement('div');
        pubItem.className = 'publication-item';
        
        // Title
        const titleElement = document.createElement('h3');
        titleElement.className = 'publication-title';
        titleElement.textContent = pub.title;
        
        // Authors
        const authorsElement = document.createElement('p');
        authorsElement.className = 'publication-authors';
        authorsElement.textContent = pub.authors.join(', ');
        
        // Venue
        const venueElement = document.createElement('p');
        venueElement.className = 'publication-venue';
        venueElement.textContent = pub.venue;
        
        // Abstract section
        const abstractSection = document.createElement('div');
        abstractSection.style.cssText = 'margin: 0.5rem 0;';
        
        const abstractButton = document.createElement('button');
        abstractButton.className = 'btn btn-secondary btn-show_abstract';
        abstractButton.textContent = 'Show Abstract';
        
        const abstractId = `abstract_${year}_${index}`;
        const abstractDiv = document.createElement('div');
        abstractDiv.className = 'abstract';
        abstractDiv.id = abstractId;
        abstractDiv.style.cssText = 'display: none; margin-top: 0.5rem; padding: 1rem; border-radius: 4px;';
        
        const abstractText = document.createElement('p');
        abstractText.textContent = pub.abstract;
        abstractDiv.appendChild(abstractText);
        
        abstractSection.appendChild(abstractButton);
        abstractSection.appendChild(abstractDiv);
        
        // Buttons section
        const buttonsSection = document.createElement('div');
        buttonsSection.className = 'publication-buttons';
        
        if (pub.file) {
          const pdfLink = document.createElement('a');
          pdfLink.href = pub.file;
          pdfLink.className = 'btn btn-primary';
          pdfLink.style.marginRight = '0.5rem';
          pdfLink.textContent = 'PDF';
          pdfLink.target = '_blank';
          buttonsSection.appendChild(pdfLink);
        }
        
        if (pub.link) {
          const doiLink = document.createElement('a');
          doiLink.href = pub.link;
          doiLink.className = 'btn btn-secondary';
          doiLink.textContent = 'DOI';
          doiLink.target = '_blank';
          buttonsSection.appendChild(doiLink);
        }

        if (pub.project_page){
          const projectPage = document.createElement('a');
          projectPage.href = pub.project_page;
          projectPage.className = "btn btn-secondary";
          projectPage.style = "margin-left: 0.5rem;";
          projectPage.textContent = "Related Project";
          buttonsSection.appendChild(projectPage);
        }
        
        // Toggle abstract functionality
        abstractButton.addEventListener('click', function() {
            // const abstract = item.querySelector('.abstract');
            // const publication_btn = item.querySelector('.publication-buttons')

            if (abstractDiv.style.display === 'none' || abstractDiv.style.display === '') {
            abstractDiv.style.display = 'block';
            abstractDiv.style.opacity = '0';
            // abstract.style.transform = 'scaleY(0)';
            abstractDiv.classList.add('animate-fadeIn-down');
            
            buttonsSection.classList.add('shifted');

            // Trigger reflow
            abstractDiv.offsetHeight;
            abstractDiv.style.opacity = '1';
            // abstract.style.transform = 'scaleY(1)';
            
            abstractDiv.classList.add('visible');
            this.textContent = 'Hide Abstract';

          } else {
            abstractDiv.style.opacity = '0';
            // abstract.style.transform = 'scaleY(0)';
            abstractDiv.classList.remove('visible');

            buttonsSection.classList.remove('shifted');
            
            setTimeout(() => {
              abstractDiv.style.display = 'none';
              this.textContent = 'Show Abstract';
            }, 300);
          }
        });
        
        // Assemble publication item
        pubItem.appendChild(titleElement);
        pubItem.appendChild(authorsElement);
        pubItem.appendChild(venueElement);
        pubItem.appendChild(abstractSection);
        pubItem.appendChild(buttonsSection);

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
        pubItem.classList.add('animate-on-scroll');
        // Start observing
        observer.observe(pubItem);
        
        yearSection.appendChild(pubItem);
      });
      
      publicationsContainer.appendChild(yearSection);
    });

    // enhancePublicationAbstracts();
  }

  // Initialize the publications page
renderPublicationsPage();

});

