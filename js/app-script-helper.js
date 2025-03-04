/**
 * Google Sheets + App Script Integration Helper
 * 
 * This file contains utilities to help with Google Sheets + App Script integration.
 */

/**
 * How to deploy your App Script as a web app:
 * 
 * 1. In your Google Sheet, go to Extensions > Apps Script
 * 2. Paste the appropriate script (petition_form_script.js, volunteer_form_script.js, or contact_form_script.js)
 * 3. Click on Deploy > New deployment
 * 4. Select "Web app" as the deployment type
 * 5. Set "Who has access" to "Anyone, even anonymous"
 * 6. Click "Deploy"
 * 7. Copy the Web app URL that is generated
 * 8. Update the appScriptUrls object in main.js with these URLs
 */

/**
 * Submits form data to a Google Sheets App Script endpoint
 * 
 * @param {Object} formData - The form data to submit
 * @param {string} appScriptUrl - The URL of the App Script web app
 * @param {string} successMessage - Message to display on successful submission
 * @param {string} errorMessage - Message to display if submission fails
 * @param {HTMLElement} submitButton - The form's submit button
 * @param {string} originalButtonText - The original text of the submit button
 * @returns {Promise} - A promise that resolves when the submission is complete
 */
function submitToAppScript(formData, appScriptUrl, successMessage, errorMessage, submitButton, originalButtonText) {
  // Prepare the request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  };
  
  // Send the request to the App Script endpoint
  return fetch(appScriptUrl, options)
    .then(response => {
      // Check if the response is ok
      if (!response.ok && response.status !== 0) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Try to parse the response as JSON
      return response.json().catch(() => {
        // If we can't parse as JSON (e.g., due to CORS), assume success
        return { status: 'success' };
      });
    })
    .then(data => {
      // Reset the submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
      
      // Show success message
      showToast('Success', successMessage);
      
      return data;
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      
      // Reset the submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
      
      // Show error message
      showToast('Error', errorMessage, 'error');
      
      throw error;
    });
}

/**
 * Important Notes:
 * 
 * 1. Make sure your App Script web app is deployed with "Anyone, even anonymous" access.
 * 
 * 2. You may encounter CORS issues when testing locally. To work around this:
 *    - Add the setCorsHeaders function to your App Script
 *    - Test on a deployed website rather than localhost
 * 
 * 3. The App Script URL should end with "/exec" for the deployed web app.
 * 
 * 4. If you update your App Script code, you need to create a new deployment
 *    for the changes to take effect.
 */ 