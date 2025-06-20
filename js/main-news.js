// Main page news section loading and rendering script
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

  // Function to render news summary items on the main page
  async function renderMainPageNews() {
    const newsContainer = document.getElementById('mainNewsContainer');
    if (!newsContainer) return;

    const newsData = await fetchNewsData();
    
    // Clear any existing content
    newsContainer.innerHTML = '';
    
    // Sort news by date (newest first)
    newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Only show the 3 most recent news items on the main page
    const recentNews = newsData.slice(0, 3);
    
    // Render each news item
    recentNews.forEach(news => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      
      // Create date element
      const dateElement = document.createElement('div');
      dateElement.className = 'news-date';
      dateElement.textContent = news.date;
      
      // Create title element
      const titleElement = document.createElement('h3');
      titleElement.className = 'news-title';
      titleElement.textContent = news.title;
      
      // Create content container
      const contentElement = document.createElement('div');
      contentElement.className = 'news-content';
      
      // Add summary paragraph
      const p = document.createElement('p');
      p.textContent = news.summary;
      contentElement.appendChild(p);
      
      // Assemble the news item
      newsItem.appendChild(dateElement);
      newsItem.appendChild(titleElement);
      newsItem.appendChild(contentElement);
      
      // Add to container
      newsContainer.appendChild(newsItem);
    });
  }

  // Initialize the main page news section
  renderMainPageNews();
});
