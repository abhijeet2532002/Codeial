const user = require('../model/UserSchema');

module.exports.signUp = (req, res) => {
    console.log(req.body);
    user.findOne({ email: req.body.email }).then((userInfo) => {
        if (!userInfo) {
            user.create(req.body).then((userCreate) => {
                console.log(`User create successfully ${userCreate}`);
                return res.redirect('back');
            })
        } else {
            console.log('Already id is available');
            return res.redirect('back');
        }
    }).catch((err) => {
        console.log(err);
        return res.redirect('back');
    });
}

module.exports.signIn = (req, res) => {
    return res.redirect('/post');
}

module.exports.signout = (req, res) => {
    req.logout((user => {
        console.log(user)
        // req.flash('success','LogOut Successfully')

    }))

    return res.redirect('/signin');
}

module.exports.findAllUser = async (req, res) => {
    console.log('entered in all user find ')
    try {
        const userInfornation = await user.find({});
        console.log('user : ',userInfornation);
        return res.render('UserInfo', {
            title: 'UserInfo',
            data: userInfornation
        });
    } catch (err) {
        console.log(err);
    }
    
    // .then((userData) => {
    //     console.log(userData);

    //     return res.render('UserInfo',{
    //         title: 'UserInfo',
    //         data: userData
    //     });
    // }).catch((err) => {
    //     console.error(`Error on finding All Users : \n ${err}`);
    //     return;
    // })
}