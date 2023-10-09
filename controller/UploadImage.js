const User= require('../model/UserSchema');
const path = require('path');
module.exports.upload =async (req,res) => {
    // console.log(req.body);
    try{
        const user={
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
        if(req.file){
            user.avatar = path.join(User.avatarPath,req.file.filename);
            console.log(req.file)
        }
        console.log(user);
        const userData= await User.create(user);
        return res.status(200).json(userData)
    }catch(err){
        console.log("There is error during post User",err);
        return;
    }
    // return res.send('upload image url called ..... ');
}

module.exports.create = (req,res) => {
    return res.render('saveImage',{
        title: 'upload'
    });
}