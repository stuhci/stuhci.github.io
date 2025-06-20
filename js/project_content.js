// Enhanced project content auto-generation script
document.addEventListener('DOMContentLoaded', async function() {

    function getProjectIdFromQuery() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'));
    }

    async function loadCurrentProjData() {
        const projectId = getProjectIdFromQuery();
        if (!projectId) {
            console.error('Project ID not specified in URL');
            return null;
        }

        const response = await fetch('../data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const projectsData = await response.json();
        const currentProject = projectsData.find(project => project.id === projectId);

        if (!currentProject) {
            console.error('Project not found with id:', projectId);
            return null;
        }

        return currentProject;
    }

    // async function loadCurrentProjData(){
    //     // Get current project ID from the page URL or a data attribute
    //     const currentPath = window.location.pathname;
    //     const projectPageMatch = currentPath.match(/project_pages\/project_(\w+)\.html/);
        
    //     if (!projectPageMatch) {
    //         console.log('Not a project page, skipping resource loading');
    //         return;
    //     }

    //     const projectSlug = projectPageMatch[1];
        
    //     // Fetch projects data
    //     const response = await fetch('../data/projects.json');
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const projectsData = await response.json();
        
    //     // Find the current project by matching the project page URL
    //     const currentProject = projectsData.find(project => 
    //         project.project_page.includes(`project_${projectSlug}.html`)
    //     );

    //     if (!currentProject) {
    //         console.log('Project not found in data');
    //         return;
    //     }

    //     return currentProject;

    // }
    
    // Function to create video elements
    function createVideoElement(videoData) {
        if (!videoData) return null;
        
        const videoContainer = document.createElement('div');
        videoContainer.className = 'project-video';
        
        if (videoData.type === 'youtube') {
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = videoData.url;
            iframe.title = videoData.title || 'Project Video';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;
            
            videoContainer.appendChild(iframe);
        } else if (videoData.type === 'vimeo') {
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = videoData.url;
            iframe.title = videoData.title || 'Project Video';
            iframe.frameBorder = '0';
            iframe.allow = 'autoplay; fullscreen; picture-in-picture';
            iframe.allowFullscreen = true;
            
            videoContainer.appendChild(iframe);
        } else if (videoData.type === 'local') {
            const video = document.createElement('video');
            video.width = 560;
            video.height = 315;
            video.controls = true;
            video.src = videoData.url;
            video.title = videoData.title || 'Project Video';
            
            videoContainer.appendChild(video);
        }
        
        return videoContainer;
    }
    
    // Function to create image gallery
    function createImageGallery(imagesData) {
        if (!imagesData || !imagesData.gallery || imagesData.gallery.length === 0) {
            return null;
        }
        
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'project-images';
        
        imagesData.gallery.forEach(imageData => {
            const img = document.createElement('img');
            img.src = '../' + imageData.src;
            img.alt = imageData.alt || 'Project Image';
            img.className = 'project-image';
            img.onclick = () => openModal('../' + imageData.src, imageData.caption || imageData.alt);
            
            galleryContainer.appendChild(img);
        });
        
        return galleryContainer;
    }
    
    // Function to create content sections
    function createContentSection(contentData) {
        if (!contentData) return null;
        
        const contentContainer = document.createElement('div');
        contentContainer.className = 'project-description';
        
        // Main description
        if (contentData.description) {
            const descTitle = document.createElement('h2');
            descTitle.className = 'section-subtitle';
            descTitle.textContent = 'About the Project';
            
            const descParagraph = document.createElement('p');
            descParagraph.style.textAlign = 'left';
            descParagraph.textContent = contentData.description;
            
            contentContainer.appendChild(descTitle);
            contentContainer.appendChild(descParagraph);
        }
        
        // Key contributions
        if (contentData.contributions && contentData.contributions.length > 0) {
            const contributionsTitle = document.createElement('p');
            contributionsTitle.style.marginTop = '1rem';
            contributionsTitle.textContent = 'Key contributions in this project include:';
            
            const contributionsList = document.createElement('ul');
            contributionsList.style.marginLeft = '1.5rem';
            contributionsList.style.marginTop = '0.5rem';
            
            contentData.contributions.forEach(innovation => {
                const listItem = document.createElement('li');
                listItem.textContent = innovation;
                contributionsList.appendChild(listItem);
            });
            
            contentContainer.appendChild(contributionsTitle);
            contentContainer.appendChild(contributionsList);
        }
        
        // Key features
        if (contentData.key_features && contentData.key_features.length > 0) {
            const featuresTitle = document.createElement('p');
            featuresTitle.style.marginTop = '1rem';
            featuresTitle.textContent = 'Key features:';
            
            const featuresList = document.createElement('ul');
            featuresList.style.marginLeft = '1.5rem';
            featuresList.style.marginTop = '0.5rem';
            
            contentData.key_features.forEach(feature => {
                const listItem = document.createElement('li');
                listItem.textContent = feature;
                featuresList.appendChild(listItem);
            });
            
            contentContainer.appendChild(featuresTitle);
            contentContainer.appendChild(featuresList);
        }
        
        // Applications
        if (contentData.applications && contentData.applications.length > 0) {
            const appsTitle = document.createElement('p');
            appsTitle.style.marginTop = '1rem';
            appsTitle.textContent = 'Potential applications:';
            
            const appsList = document.createElement('ul');
            appsList.style.marginLeft = '1.5rem';
            appsList.style.marginTop = '0.5rem';
            
            contentData.applications.forEach(app => {
                const listItem = document.createElement('li');
                listItem.textContent = app;
                appsList.appendChild(listItem);
            });
            
            contentContainer.appendChild(appsTitle);
            contentContainer.appendChild(appsList);
        }
        
        return contentContainer;
    }
    
    // Function to load and render project content
    async function loadProjectContent(currentProject) {
        try {
            // Update page title if available
            if (currentProject.name) {
                document.title = currentProject.name + " - Multimodal HCI Lab @ STU";
                const heroTitle = document.querySelector('.project-name-short h1');
                if (heroTitle && currentProject.title_short) {
                    if(currentProject.name)
                        heroTitle.textContent = currentProject.name;
                }
                const projectNameFull = document.querySelector('.project-name-full h1');
                if(projectNameFull && currentProject.title_short){
                    projectNameFull.textContent = currentProject.title_short;
                }
            }
            
            // Handle video content
            const mediaContainer = document.querySelector('.project-media');
            if (mediaContainer && currentProject.videos) {
                // Clear existing hardcoded video content
                const existingVideo = mediaContainer.querySelector('iframe');
                if (existingVideo) {
                    existingVideo.remove();
                }
                
                // Add demo video if available
                if (currentProject.videos.demo_video) {
                    const videoElement = createVideoElement(currentProject.videos.demo_video);
                    if (videoElement) {
                        mediaContainer.insertBefore(videoElement, mediaContainer.firstChild);
                    }
                }
                
                // Add presentation video if available
                if (currentProject.videos.presentation_video) {
                    const videoElement = createVideoElement(currentProject.videos.presentation_video);
                    if (videoElement) {
                        mediaContainer.appendChild(videoElement);
                    }
                }
            }

            // If no videos, show thumbnail image
            if(mediaContainer && !currentProject.videos){
                const img = document.createElement('img');
                img.src = '../' + currentProject.image;
                img.alt = "Project Thumbnail";
                img.style.cssText = "width: 90%; border-radius: 8px;";
                mediaContainer.appendChild(img);
            }
            
            // Handle image gallery
            if (mediaContainer && currentProject.images) {
                // Clear existing hardcoded images
                const existingImages = mediaContainer.querySelector('.project-images');
                if (existingImages) {
                    existingImages.remove();
                }
                
                // Add new image gallery
                const imageGallery = createImageGallery(currentProject.images);
                if (imageGallery) {
                    mediaContainer.appendChild(imageGallery);
                }
            }
            
            // Handle text content
            const projectInfo = document.querySelector('.project-info');
            if (projectInfo && currentProject.content) {
                // Clear existing hardcoded description
                const existingDescription = projectInfo.querySelector('.project-description');
                if (existingDescription) {
                    existingDescription.remove();
                }
                
                // Add new content section
                const contentSection = createContentSection(currentProject.content);
                if (contentSection) {
                    projectInfo.insertBefore(contentSection, projectInfo.firstChild);
                }
            }
            
        } catch (error) {
            console.error('Error loading project content:', error);
        }
    }

    // Function to create SVG icons for different resource types
    function createIcon(type) {
        const icons = {
            source_code: `<svg class="project-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16,18 22,12 16,6"></polyline>
                <polyline points="8,6 2,12 8,18"></polyline>
            </svg>`,
            demo_video: `<svg class="project-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5,3 19,12 5,21"></polygon>
            </svg>`,
            presentation_video: `<svg class="project-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m22 8-6 4 6 4V8Z"></path>
                <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
            </svg>`,
            dataset: `<svg class="project-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>`,
            slides: `<svg class="project-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
            </svg>`
        };
        return icons[type] || '';
    }

    // Function to get button class based on resource type
    function getButtonClass(type) {
        const classMap = {
            source_code: 'project-btn project-btn-primary',
            demo_video: 'project-btn project-btn-demo',
            presentation_video: 'project-btn project-btn-video',
            dataset: 'project-btn project-btn-dataset',
            slides: 'project-btn project-btn-slides'
        };
        return classMap[type] || 'project-btn project-btn-secondary';
    }

    // Function to get button text based on resource type
    function getButtonText(type) {
        const textMap = {
            source_code: 'Source Code',
            demo_video: 'Demo Video',
            presentation_video: 'Presentation',
            dataset: 'Dataset',
            slides: 'Slides'
        };
        return textMap[type] || type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Function to load project resources and generate buttons
    async function loadProjectResources(currentProject) {
        try {
            
            // Handle resources
            if (!currentProject || !currentProject.resources) {
                console.log('No resources found for this project');
                return;
            }

            const mediaContainer = document.querySelector('.project-resources');

            // Create the outer container div
            const projectLinksDiv = document.createElement('div');
            projectLinksDiv.className = 'project-links';
            projectLinksDiv.id = 'projectResources';

            // Create the h2 element
            const subtitle = document.createElement('h2');
            subtitle.className = 'section-subtitle';
            subtitle.textContent = 'Project Resources';

            // Create the inner div for buttons
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'project-buttons';
            buttonsContainer.id = 'projectButtons';

            // Append h2 and inner div to the outer container
            projectLinksDiv.appendChild(subtitle);
            projectLinksDiv.appendChild(buttonsContainer);

            mediaContainer.appendChild(projectLinksDiv);

            // Generate buttons for available resources
            // const buttonsContainer = document.getElementById('projectButtons');
            if (!buttonsContainer) {
                console.log('Project buttons container not found');
                return;
            }

            // Clear existing buttons
            buttonsContainer.innerHTML = '';

            // Create buttons for each resource
            Object.entries(currentProject.resources).forEach(([resourceType, resourceUrl]) => {
                if (resourceUrl) {
                    const button = document.createElement('a');
                    button.href = resourceUrl;
                    button.target = '_blank';
                    button.rel = 'noopener noreferrer';
                    button.className = getButtonClass(resourceType);
                    
                    button.innerHTML = `
                        ${createIcon(resourceType)}
                        <span>${getButtonText(resourceType)}</span>
                    `;
                    
                    buttonsContainer.appendChild(button);
                }
            });
            
            // If no buttons were created, hide the resources section
            if (buttonsContainer.children.length === 0) {
                const resourcesSection = document.getElementById('projectResources');
                if (resourcesSection) {
                    resourcesSection.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Error loading project resources:', error);
        }
    }

     async function loadProjectPublication(currentProject) {
        try {
            // Handle publications
            const infoContainer = document.querySelector('.project-info');

            // Create the outer container div
            const publicationsContainer = document.createElement('div');
            publicationsContainer.className = 'project-publications';
            publicationsContainer.style.marginTop = '2rem';

            // Create the inner loading indicator div
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading-indicator';
            loadingDiv.textContent = 'Loading publications...';

            // Append the loading div to the outer container
            publicationsContainer.appendChild(loadingDiv);
            infoContainer.appendChild(publicationsContainer)

            // const publicationsContainer = document.querySelector('.project-publications');
            if (!publicationsContainer) {
                console.log('No publications container found on this page');
                return;
            }
            if (!currentProject || !currentProject.publications || currentProject.publications.length === 0) {
                // Hide the publications section if no publications found
                publicationsContainer.style.display = 'none';
                return;
            }

            // Clear existing content except the title
            const existingTitle = publicationsContainer.querySelector('.section-subtitle');
            publicationsContainer.innerHTML = '';
            
            // Re-add the title
            if (existingTitle) {
                publicationsContainer.appendChild(existingTitle);
            } else {
                const titleElement = document.createElement('h2');
                titleElement.className = 'section-subtitle';
                titleElement.textContent = 'Related Publications';
                publicationsContainer.appendChild(titleElement);
            }

            // Render each publication
            currentProject.publications.forEach((pub, index) => {
                const pubItem = document.createElement('div');
                pubItem.className = 'publication-item animate-on-scroll visible';
                
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
                
                // Buttons section
                const buttonsSection = document.createElement('div');
                buttonsSection.className = 'publication-buttons';
                
                if (pub.file) {
                    const pdfLink = document.createElement('a');
                    pdfLink.href = "../" + pub.file;
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
                
                // Assemble publication item
                pubItem.appendChild(titleElement);
                pubItem.appendChild(authorsElement);
                pubItem.appendChild(venueElement);
                pubItem.appendChild(buttonsSection);
                
                publicationsContainer.appendChild(pubItem);
            });
            

        } catch (error) {
            console.error('Error loading project resources:', error);
        }
    }
    
    const projData = await loadCurrentProjData();
    // Initialize project content loading
    loadProjectContent(projData);
    loadProjectResources(projData);
    loadProjectPublication(projData);
});

