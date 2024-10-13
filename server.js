const mongoose = require('mongoose');
const Budget = require('./models/Budget'); // Import the Budget model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal-budget', {
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.use(express.json()); // Add this to parse JSON

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
  try {
    const budgetData = await Budget.find(); // Fetch all documents from MongoDB
    res.json(budgetData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching budget data" });
  }
});

app.post('/add-budget', async (req, res) => {
  const { title, value, color } = req.body;

  if (!title || !value || !color) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newBudget = new Budget({ title, value, color });
    await newBudget.save();
    res.json({ message: "Budget entry added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding budget entry" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
