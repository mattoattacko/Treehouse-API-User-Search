// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const profile = require('./profile.js');

const users = process.argv.slice(2);
users.forEach(profile.get);

// Unsure of cause of bug that caused getProfiles to not be read. Removing the commented code that was here fixes that problem. Nebulous as to reasoning... 