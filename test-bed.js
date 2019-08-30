// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// We need to get the required https module first
const https = require('https');

// Function to print message to console
function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}


function getProfile(username) {

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
			printMessage(username, profile.badges.length, profile.points.JavaScript);
		});

	});

}

// Non-blocking https response cycle will allow whichever profile with the least amount of information in it to be returned first. This will not work in other languages since we are streaming in data and dealing with it when we can. 
// getProfile("chalkers");
// getProfile("matthewmcquain");

// const users = ["chalkers", "matthewmcquain"];

// We can cycle over each memeber of the array with the forEach() method. forEach will iterate over the array and passes each member into a callback function. Each memeber being a username. 

/** 
users.forEach(username => {
  getProfile(username);
});
*/

// But since the getProfile function takes one parameter and forEach passes one in, we can shorten the code to this...
// users.forEach(getProfile);

// Even better is to use the Node global object "process" with the array property "argv" that will allow us to enter usernames into the command line as arguments and return the information we need. 
// We use "slice" to cut out the first two irrelevant array data pieces to get to the usernames we want. 

const users = process.argv.slice(2);
users.forEach(getprofile);