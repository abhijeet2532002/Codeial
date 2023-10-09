const express = require('express');
const router = express.Router();
const userController = require('../controller/User');
const passport = require('passport');
const passportconfig = require('../config/PassportConfig')
const passportGoogle = require('../config/PassportGoogleAuth');
const passportGithub = require('../config/passportGitHubAuth');

router.post('/signUp', userController.signUp);
router.post('/signIn', passport.authenticate( 'local', {failureRedirect:'/signup_page'} ), userController.signIn);
router.get('/findAll', userController.findAllUser);
router.get('/logout',userController.signout);

// Google Router
router.get('/auth/google', passport.authenticate('google',{ scope: ['profile','email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signIn' }), userController.signIn);

// Linkdin Router
router.get('/auth/github', passport.authenticate('github',{scope: ['user:email']}));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/signIn' }),userController.signIn);


module.exports = router;