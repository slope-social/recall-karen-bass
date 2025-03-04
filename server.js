import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Create a data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Helper function to save form data
const saveFormData = (formName, data) => {
  const filePath = path.join(dataDir, `${formName}.json`);
  let existingData = [];
  
  // Read existing data if file exists
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading ${formName} data:`, error);
    }
  }
  
  // Add timestamp to the data
  const dataWithTimestamp = {
    ...data,
    timestamp: new Date().toISOString()
  };
  
  // Add new data and save
  existingData.push(dataWithTimestamp);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  
  return dataWithTimestamp;
};

// API endpoint for petition form
app.post('/api/petition', (req, res) => {
  try {
    const formData = req.body;
    const savedData = saveFormData('petition', formData);
    
    console.log('Petition submission received:', savedData);
    res.status(200).json({ success: true, message: 'Petition signed successfully!' });
  } catch (error) {
    console.error('Error processing petition submission:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// API endpoint for volunteer form
app.post('/api/volunteer', (req, res) => {
  try {
    const formData = req.body;
    const savedData = saveFormData('volunteer', formData);
    
    console.log('Volunteer submission received:', savedData);
    res.status(200).json({ success: true, message: 'Volunteer form submitted successfully!' });
  } catch (error) {
    console.error('Error processing volunteer submission:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// API endpoint for contact form
app.post('/api/contact', (req, res) => {
  try {
    const formData = req.body;
    const savedData = saveFormData('contact', formData);
    
    console.log('Contact submission received:', savedData);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact submission:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the site`);
}); 