// Initiate the server
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set up port and app
const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
app.use(express.static('public'));

// Use apiRoutes
app.use(routes);

// Serve up static assets
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Here is the link http://localhost:${PORT}`)
    });

});