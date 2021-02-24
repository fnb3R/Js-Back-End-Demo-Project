const router = require('express').Router();
//Controllers
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const expenseController = require('./controllers/expenseController');
//Use controllers
router.use('/', homeController);
router.use('/auth', authController); 
router.use('/expense', expenseController);

module.exports = router;