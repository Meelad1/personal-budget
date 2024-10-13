const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    match: /^#[0-9A-F]{6}$/i, // Enforce 6-digit hexadecimal format
  }
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
