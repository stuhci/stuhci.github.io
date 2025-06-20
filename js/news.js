// News data loading and rendering script
document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch news data from JSON file
  async function fetchNewsData() {
    try {
      const response = await fetch('data/news.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching news data:', error);
      return [];
    }
  }

  // Function to render full news items on the news page
  async function renderNewsPage() {
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) return;

    const newsData = await fetchNewsData();
    
    // Clear any existing content
    newsContainer.innerHTML = '';
    
    // Sort news by date (newest first)
    newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render each news item
    newsData.forEach(news => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      
      // Create date element
      const dateElement = document.createElement('div');
      dateElement.className = 'news-date';
      dateElement.textContent = news.date;
      
      // Create title element
      const titleElement = document.createElement('h2');
      titleElement.className = 'news-title';
      titleElement.textContent = news.title;
      
      // Create content container
      const contentElement = document.createElement('div');
      contentElement.className = 'news-content';
      
      // Add each paragraph of content
      news.content.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        contentElement.appendChild(p);
      });

      if(news.links.length > 0){
        news.links.forEach(link => {
          // Create link element
          const linkElement = document.createElement('a');
          linkElement.className = 'card-link';
          linkElement.href = link['link'];
          linkElement.textContent = link['name']+" →";
          linkElement.style.cssText = "margin-top: 0.5rem";
          contentElement.appendChild(linkElement);
          contentElement.append(document.createElement('br'))
        })
      }
      
      // Add image if available
      if (news.hasImage && news.image) {
        const img = document.createElement('img');
        img.src = news.image;
        img.alt = news.title;
        img.style.maxWidth = '100%';
        img.style.borderRadius = '8px';
        contentElement.appendChild(img);
      }
      
      // Assemble the news item
      newsItem.appendChild(dateElement);
      newsItem.appendChild(titleElement);
      newsItem.appendChild(contentElement);

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
      newsItem.classList.add('animate-on-scroll');
      // Start observing
      observer.observe(newsItem);
      
      // Add to container
      newsContainer.appendChild(newsItem);
    });
  }

  // Initialize the news page
  renderNewsPage();
});
