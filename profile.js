// We need to get the required https module first
const https = require('https');

// Requre http module for status codes
const http = require('http');

// Print Error Messages
function printError(error) {
  console.error(error.message);
}

// Function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}


function getProfile (username) {
  // using try-catch for easy to understand error messages
  try {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      // we check the http status code for 200 - OK  
      if (response.statusCode === 200) { 

        let body = "";

        // Read the data
        response.on('data', data => {
            body += data.toString();
        });

        response.on('end', () => {
          // this try-catch will catch invalid user names
          try {
            // Parse the data
            // Store the object as a constant variable called profile
            const profile = JSON.parse(body);
            // We can use the dir output to figure out how many badges and points we have 
            // console.dir(profile);

            // we have a badges array, so we can print a message to show our badge count. There is a points object segmented into topic areas. 
            // Print the data
            printMessage(username, profile.badges.length,
                profile.points.JavaScript);
            } catch (error) {
              console.error('Problem with request. User does not exist');
            }
        });

      // if there is a different http status code, it will be thrown here.
      // the http.status_codes template literal in const message allows the user to see what type of http status code error they are getting rather than just getting a number. 
      } else {
          const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
          const statusCodeError = new Error (message);
          printError(statusCodeError);
      }
    });

    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

module.exports.get = getProfile;