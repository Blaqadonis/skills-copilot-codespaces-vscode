// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Load the comments
const comments = require('./comments.json');

// Load the Node File System module
const fs = require('fs');

// Load the Node path module
const path = require('path');

// Set the path to the public directory
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// Set up Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Handle GET requests to /comments
app.get('/comments', (req, res) => {

    // Send all of the comments
    res.send(comments);

});

// Handle POST requests to /comments
app.post('/comments', (req, res) => {

    // Get the comment from the request body
    const comment = req.body;

    // Add the comment to the array
    comments.unshift(comment);

    // Send a copy of the comment back as a response
    res.send(comment);

    // Write the comments back to the file
    const commentsJSON = JSON.stringify(comments, null, 2);
    fs.writeFile('./comments.json', commentsJSON, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

});

// Start the server
app.listen(3000, () => {
    console.log('Comments server listening on port 3000!');
});
