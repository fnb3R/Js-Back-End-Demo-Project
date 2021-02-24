const mongoose = require('mongoose');
const User = require('./User');

const expenseScheme = new mongoose.Schema({
    merchant: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    report: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Expense', expenseScheme);
