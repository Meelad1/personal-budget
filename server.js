const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

// Load the budget data from the JSON file
const budget = JSON.parse(fs.readFileSync('budget-data.json', 'utf8'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
