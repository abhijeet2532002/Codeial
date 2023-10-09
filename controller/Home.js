module.exports.SignIn = (req,res) => {
    if(req.user){
        return res.redirect('/post')
    }
    return res.render('Sign_In',{
        title: 'Sign-In'
    });
}

module.exports.SignUp = (req,res) => {
    return res.render('Sign_Up',{
        title: 'Sign-Up'
    });
}