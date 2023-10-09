const express = require('express');
const router = express.Router();
const passport= require('passport')
const user = require('../../controller/API/user')
const passportconfig = require('../../config/passportJWTConfig')


router.post('/sigiIn',user.userSignIn);
router.get('/home',passport.authenticate('jwt',{session: false}),user.home);
console.log("API user router loaded ....");


module.exports=router