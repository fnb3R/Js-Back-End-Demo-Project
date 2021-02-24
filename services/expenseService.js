const User = require('../models/User');
const Expense = require('../models/Expense');

const addExpense = (merchant, total, category, description, report, user) => {
    let expense = new Expense({merchant, total, category, description, report, user});
    
    return expense.save();
};

const getByUser = (userId) => {
    let expensesOfUser = Expense.find({user: userId}).lean();
    
    return expensesOfUser;
}

const deleteExpense = (expenseId) => {
    let deletedExpense = Expense.deleteOne({_id: expenseId});
    return deletedExpense;
}

const getOneById = (expenseId) => {
    let expense = Expense.findById(expenseId).lean();
    console.log(expense);
    return expense;
}

module.exports = {
    addExpense,
    getByUser,
    deleteExpense,
    getOneById
};