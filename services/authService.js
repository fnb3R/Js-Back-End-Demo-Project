const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const addAmount = (id, amount) => {
    let user = getOneById(id).lean()
        .then(us => {
            console.log(us);
            let total = Number(us.amount) + Number(amount);
            User.findByIdAndUpdate(id, {amount: total})
        .then(smth => {
            return smth;
        })
            return;
        })
}

const register = (username, password) => {
    let user = new User({username, password});
    
    return user.save();
};

const getOneById = (expenseId) => {
    let expense = User.findById(expenseId).lean();
    //console.log(expense);
    return expense;
}

const login = async (username, password) => {
    let user = await User.findOne({username});

    if (!user) return Promise.reject({message: 'No such user', status: 404});
        // if(!user) throw {message: 'No such user', status: 404};

    let areEqual = await bcrypt.compare(password, user.password);
    if(!areEqual) return Promise.reject({message: 'Invalid Password', status: 404});

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET);
    return token;
    
};

module.exports = {
    register,
    login,
    getOneById,
    addAmount
}