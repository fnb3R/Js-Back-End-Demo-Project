const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const expenseService = require('../services/expenseService');
const authService = require('../services/authService');
const Expense = require('../models/Expense');

router.get('/', (req, res) => {
    let isItAuth = res.locals.isAuth;
    if(isItAuth){
        let userId = res.locals.user._id;
        expenseService.getByUser(userId)
            .then(userExpenses => {
                res.render('home', {userExpenses});
                //console.log(userExpenses);
            })
        } else {
    res.render('guest-home')
        };
});

router.post('/', (req, res) => {
    const {refillAmount} = req.body;
    let userId = res.locals.user._id;
    authService.addAmount(userId, refillAmount);
    res.redirect('/account-user')
        
});

router.get('/account-user', isAuth, (req, res) => {
    let id = res.locals.user._id;
    let totalAmount = 0;
    let expenses = expenseService.getByUser(id)
        .then(ex => {
            ex.forEach(element => {
                totalAmount+=element.total;

            });
            let user = authService.getOneById(id)
            .then(us => {
                res.render('account-user', {user: us, amount: totalAmount, count: ex.length})
            })
        })
    
})

router.get('/secret-action', isAuth, (req, res) => {
    res.send('very very secret')
})

module.exports = router;