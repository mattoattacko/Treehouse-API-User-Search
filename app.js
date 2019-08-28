// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// We need to get the required https module first
const https = require('https');
const username = "chalkers";

// Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

// Connect to the API URL (https://teamtreehouse.com/username.json)
const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
  // console.dir(response); this will show us all possible properties that are available to us, but its a bit much
  // console.log(response.statusCode); will give us the status code

  let body = "";

  // Read the data
  response.on('data', data => {
   body += data.toString();
  });

  response.on('end', () => {
    // Parse the data

    console.log(body);
    // Print the data
  });


});