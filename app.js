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
    // Store the object as a constant variable called profile
    const profile = JSON.parse(body);
    // We can use the dir output to figure out how many badges and points we have 
    // console.dir(profile);

    // we have a badges array, so we can print a message to show our badge count. There is a points object segmented into topic areas. 
    // Print the data
    printMessage(username,profile.badges.length, profile.points.JavaScript);
  });


});