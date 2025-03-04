/**
 * Petition Form Handler - Google Apps Script
 * 
 * This script receives petition form submissions and appends them to a Google Sheet.
 * Deploy this as a web app with "Anyone, even anonymous" access.
 */

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  var response = ContentService.createTextOutput();
  response = setCorsHeaders(response);
  return response;
}

// The doGet function is required but we'll redirect to an error page
function doGet(e) {
  var response = ContentService.createTextOutput(JSON.stringify({
    'status': 'error',
    'message': 'This endpoint only accepts POST requests'
  })).setMimeType(ContentService.MimeType.JSON);
  
  response = setCorsHeaders(response);
  return response;
}

// The doPost function handles form submissions
function doPost(e) {
  try {
    // Parse the incoming data
    const data = e.postData.contents ? JSON.parse(e.postData.contents) : {};
    console.log('Received petition form data:', data);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    console.log('Spreadsheet ID:', ss.getId());
    
    let sheet = ss.getSheetByName('Sheet1');
    console.log('Found sheet with name "Sheet1":', !!sheet);
    
    if (!sheet) {
      // Try alternative sheet names if the first one doesn't exist
      const alternativeSheet = ss.getSheets()[0]; // Get the first sheet
      console.log('Using first sheet instead:', alternativeSheet ? alternativeSheet.getName() : 'No sheets found');
      
      if (!alternativeSheet) {
        throw new Error('Sheet not found');
      }
      sheet = alternativeSheet;
    }
    
    // Check if the sheet has headers
    const hasHeaders = sheet.getLastRow() > 0;
    
    // If this is a new sheet or the first row, add headers
    if (!hasHeaders) {
      const headers = [
        'Timestamp',
        'First Name',
        'Last Name',
        'Street Address',
        'City/Town',
        'Zip',
        'Phone',
        'Email'
      ];
      sheet.appendRow(headers);
      console.log('Added headers to sheet');
    }
    
    // Create a timestamp
    const timestamp = new Date().toISOString();
    
    // Prepare the row data in the correct order based on your CSV structure
    const rowData = [
      timestamp,                          // Timestamp
      data.firstName || '',               // First Name
      data.lastName || '',                // Last Name
      data.street || '',                  // Street Address
      data.city || '',                    // City/Town
      data.zip || '',                     // Zip
      data.phone || '',                   // Phone
      data.email || ''                    // Email
    ];
    
    console.log('Appending row data:', rowData);
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    console.log('Row appended successfully');
    
    // Return a success response with CORS headers
    var response = ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Petition submission received'
    })).setMimeType(ContentService.MimeType.JSON);
    
    response = setCorsHeaders(response);
    return response;
    
  } catch (error) {
    // Log the error
    console.error('Error processing petition form submission:', error);
    
    // Return an error response with CORS headers
    var response = ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': 'Error processing submission: ' + error.message
    })).setMimeType(ContentService.MimeType.JSON);
    
    response = setCorsHeaders(response);
    return response;
  }
}

/**
 * Set up CORS to allow cross-origin requests
 */
function setCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Max-Age', '3600');
  return response;
} 