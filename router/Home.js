const express = require('express');
const router = express.Router();
const homeController = require('../controller/Home');

router.get('/signIn',homeController.SignIn);
router.get('/signup_page',homeController.SignUp);

router.use('/user',require('./User'));
router.use('/post',require('./Post'));
router.use('/comment',require('./Comment'));
router.use('/Image',require('./uploadImage'));
router.use('/likes',require('./Like'));
router.use('/friend',require('./Friend'));

router.use('/api/user',require('./API/UserRouter'));

module.exports = router;