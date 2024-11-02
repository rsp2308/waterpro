// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data from form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file (survey form)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/survey.html');
});

// Handle form submission
app.post('/submit-survey', (req, res) => {
    const formData = req.body;

    // Save form data to a JSON file
    fs.readFile('survey_data.json', 'utf8', (err, data) => {
        if (err) throw err;
        let surveys = JSON.parse(data);
        surveys.push(formData);
        fs.writeFile('survey_data.json', JSON.stringify(surveys, null, 2), (err) => {
            if (err) throw err;
            console.log('Survey data saved!');
        });
    });

    // Send a response back to the client
    res.send('Thank you for your feedback!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
