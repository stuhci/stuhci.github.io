// Projects data loading and rendering script
document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch projects data from JSON file
  async function fetchMembersData() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching members data:', error);
      return [];
    }
  }

  // Function to render members page
  async function renderMembersPage() {
    const membersContainer = document.getElementById('membersContainer');
    if (!membersContainer) return;

    const membersData = await fetchMembersData();
    
    // Clear any existing content
    membersContainer.innerHTML = '';
    
    // Group members by type
    const membersByType = {};
    membersData.forEach(member => {
      if (!membersByType[member.type]) {
        membersByType[member.type] = [];
      }
      membersByType[member.type].push(member);
    });
    

    // Render each type section
    Object.keys(membersByType).forEach(type => {
      // Create team section
      const teamSection = document.createElement('div');
      teamSection.className = 'team-section';
      
      // team title
      const teamTitle = document.createElement('h2');
      teamTitle.className = 'section-subtitle';
      teamTitle.textContent = type;
      teamSection.appendChild(teamTitle);

      const memberGrid = document.createElement('div');
      memberGrid.className = 'member-grid'
      
      // Render each member card
      membersByType[type].forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card'
        
        // Image
        const memberImg = document.createElement('img');
        memberImg.src = member.image;
        memberImg.className = "member-photo";
        
        // Name
        const memberName = document.createElement('h3');
        memberName.className = 'member-name';
        memberName.textContent = member.name;
        
        // Title
        const memberTitle = document.createElement('p');
        memberTitle.className = 'member-title';
        memberTitle.textContent = member.title;
        memberTitle.style.cssText = "margin-bottom: 0";

        // Position
        const memberPosition = document.createElement('p');
        memberPosition.className = 'member-title';
        memberPosition.textContent = member.position;
        
        // Email
        const memberEmail = document.createElement('p');
        memberEmail.textContent = member.email;
        
        // Personal Page
        const pageButton = document.createElement('a');
        pageButton.href = member.link;
        pageButton.className = 'btn btn-secondary';
        pageButton.style.cssText = 'margin-top: 0.5rem;';
        pageButton.textContent = 'Personal Page'

        memberCard.appendChild(memberImg);
        memberCard.appendChild(memberName);
        memberCard.appendChild(memberTitle);
        memberCard.appendChild(memberPosition);
        memberCard.appendChild(memberEmail);
        memberCard.appendChild(pageButton);

        // Setup card animation
        memberCard.addEventListener('mousemove', function(e) {
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
        memberCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        // Remove transition on mouse enter for smoother movement
        memberCard.addEventListener('mouseenter', function() {
            this.style.transition = 'box-shadow 0.3s ease';
        });

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
        memberCard.classList.add('animate-on-scroll');
        // Start observing
        observer.observe(memberCard);
                
        // Assemble member item
        memberGrid.appendChild(memberCard);
          
        });
      
      teamSection.appendChild(memberGrid);
      membersContainer.appendChild(teamSection);
    });

    // enhancePublicationAbstracts();
  }

  // Initialize the projects page
  renderMembersPage();

});