# Recall Karen Bass Campaign Website

This repository contains the website for the Recall Karen Bass campaign.

## Local Development

To run the site locally:

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Visit `http://localhost:3000` in your browser

## Deployment

The site is deployed using GitHub Pages with a custom domain.

## Features

- Responsive design for all devices
- Form submissions for petition signing, volunteering, and contact
- Interactive UI elements
- Privacy Policy and Cookie Policy modals
- Smooth scrolling navigation

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Recall-Karen-Bass
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   NODE_ENV=development
   ```

### Running the Server

1. Start the development server:
   ```
   npm run dev
   ```

2. The website will be available at:
   ```
   http://localhost:3000
   ```

### Production Deployment

1. For production deployment, set the NODE_ENV to production:
   ```
   NODE_ENV=production
   ```

2. Start the server:
   ```
   npm start
   ```

## Project Structure

- `index.html` - Main HTML file
- `css/` - CSS stylesheets
- `js/` - JavaScript files
- `assets/` - Images and other assets
- `server.js` - Express server for handling form submissions
- `data/` - Directory where form submissions are stored (created automatically)

## Form Submissions

All form submissions are stored in JSON files in the `data/` directory:
- `petition.json` - Petition form submissions
- `volunteer.json` - Volunteer form submissions
- `contact.json` - Contact form submissions

## License

All rights reserved. © 2025 Recall Karen Bass Committee.