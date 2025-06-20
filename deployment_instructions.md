# Deploying Your Research Lab Static Website

This guide provides step-by-step instructions for deploying the static version of your Research Lab website on your own machine or web hosting service.

## Local Deployment Options

### Option 1: Simple Local Preview

#### For Windows:

1. **Install a local web server**:
   - Download and install [XAMPP](https://www.apachefriends.org/download.html) or [WampServer](https://www.wampserver.com/en/)
   
2. **Deploy the website**:
   - Copy the entire `research_lab_static` folder to the web server's document root:
     - For XAMPP: `C:\xampp\htdocs\`
     - For WampServer: `C:\wamp\www\`
   
3. **Access the website**:
   - Start the Apache service from the XAMPP or WampServer control panel
   - Open your browser and navigate to: `http://localhost/research_lab_static/`

#### For macOS:

1. **Use the built-in Python server**:
   - Open Terminal
   - Navigate to the website directory: `cd path/to/research_lab_static`
   - Run: `python -m http.server 8000`
   
2. **Access the website**:
   - Open your browser and navigate to: `http://localhost:8000/`

#### For Linux:

1. **Use the built-in Python server**:
   - Open Terminal
   - Navigate to the website directory: `cd path/to/research_lab_static`
   - Run: `python -m http.server 8000`
   
2. **Access the website**:
   - Open your browser and navigate to: `http://localhost:8000/`

### Option 2: Using Visual Studio Code with Live Server

This is a great option for development and making changes to the site.

1. **Install Visual Studio Code**:
   - Download and install from [code.visualstudio.com](https://code.visualstudio.com/)

2. **Install the Live Server extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X on Mac)
   - Search for "Live Server" and install the extension by Ritwick Dey

3. **Open the website folder**:
   - In VS Code, go to File > Open Folder
   - Select the `research_lab_static` folder

4. **Start Live Server**:
   - Right-click on `index.html` in the file explorer
   - Select "Open with Live Server"
   - The website will open in your default browser with live reload enabled

## Web Hosting Options

### Option 1: GitHub Pages (Free)

1. **Create a GitHub account** if you don't have one at [github.com](https://github.com/)

2. **Create a new repository**:
   - Name it `yourusername.github.io` (replace "yourusername" with your actual GitHub username)
   - Make it public

3. **Upload your website**:
   - Clone the repository to your computer
   - Copy all files from the `research_lab_static` folder into the repository folder
   - Commit and push the changes to GitHub

4. **Access your website**:
   - Your website will be available at `https://yourusername.github.io/`
   - It may take a few minutes for the site to be published

### Option 2: Netlify (Free tier available)

1. **Create a Netlify account** at [netlify.com](https://www.netlify.com/)

2. **Deploy your site**:
   - Click "New site from Git" if you have your site in a Git repository
   - Or simply drag and drop your `research_lab_static` folder onto the Netlify dashboard for manual deploy

3. **Configure your site**:
   - Set a custom domain name if desired
   - Your site will be available at a Netlify subdomain (e.g., `your-site-name.netlify.app`)

### Option 3: Traditional Web Hosting

1. **Choose a web hosting provider** such as:
   - [Bluehost](https://www.bluehost.com/)
   - [HostGator](https://www.hostgator.com/)
   - [SiteGround](https://www.siteground.com/)

2. **Purchase a hosting plan and domain name**

3. **Upload your website**:
   - Use the hosting provider's file manager
   - Or use an FTP client like FileZilla to upload the contents of the `research_lab_static` folder to the public_html or www directory of your hosting account

4. **Access your website**:
   - Your website will be available at your domain name

## Updating Your Website

To update your website:

1. Make changes to the HTML, CSS, or image files locally
2. Test the changes using one of the local deployment methods
3. Once satisfied, upload the updated files to your web hosting service

## Adding Content Management

Since this is a static website, adding a content management system would require additional development. Options include:

1. **Headless CMS solutions** like:
   - [Netlify CMS](https://www.netlifycms.org/)
   - [Forestry](https://forestry.io/)
   - [Contentful](https://www.contentful.com/)

2. **Static site generators** like:
   - [Jekyll](https://jekyllrb.com/)
   - [Hugo](https://gohugo.io/)
   - [Eleventy](https://www.11ty.dev/)

These solutions would require additional setup but would provide you with a user-friendly interface to manage your content without directly editing HTML files.

## Need Help?

If you encounter any issues during deployment or have questions about customizing your website, please reach out for assistance.
