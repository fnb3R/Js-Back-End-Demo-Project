const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS, SECRET} = require('../config/config');

const Expense = require('./Expense');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        validate: /^[a-zA-Z0-9]+$/  
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    expense: [{
        type: mongoose.Types.ObjectId,
        ref: 'Expense'
    }]
});

userScheme.pre('save', function(next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', userScheme)