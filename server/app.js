// server.js
const express = require('express');
const path = require('path');
const app = express();

const serve_path = path.resolve(__dirname + '/..');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(serve_path));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);