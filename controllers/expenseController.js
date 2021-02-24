const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const expenseService = require('../services/expenseService');


router.get('/new-expense', isAuth, (req, res) => {
    res.render('new-expense')
    let user = res.locals.user;
    //console.log('tets');
});

router.get('/secret-action', isAuth, (req, res) => {
    res.send('very very secret')
});

router.post('/new-expense', isAuth, (req, res) => {
    const {merchant, total, category, description, report} = req.body;
    let userId = res.locals.user._id;
    //console.log(user);
    let r = false;
    if (report) {
        r = true;
    }

    expenseService.addExpense(merchant, total, category, description, r, userId)
    .then(res.redirect('/'));
    
});

router.get('/:expenseId/report', isAuth, (req, res) => {
    let idOfExpense = req.params.expenseId.slice(1);
    //console.log(idOfExpense);
    expenseService.getOneById(idOfExpense)
        .then(rep => {
            //console.log(rep);
            res.render('report', {rep});
        })
    
});

router.get('/:expenseId/delete', isAuth, (req, res) => {
    let idOfExpense = req.params.expenseId.slice(1);
    expenseService.deleteExpense(idOfExpense)
        .then(res.redirect('/'))
    
});

module.exports = router;