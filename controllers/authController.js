const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

router.get('/', (req, res) => {
    res.send('Auth Controller')
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    authService.login(username, password)
        .then(token => {

            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
})

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {

        const { username, password, passwordRepeat, amount } = req.body;

        if (password !== passwordRepeat) {
            throw new Error('Password Mismatch');
            return;
        };
        authService.register(username, password, amount)
            .then(createdUser => {
                console.log('createdUser');
                console.log(createdUser);
                authService.login(username, password)
            .then(token => {

                res.cookie(COOKIE_NAME, token, { httpOnly: true });
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
        });
            
    }
    
);

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;