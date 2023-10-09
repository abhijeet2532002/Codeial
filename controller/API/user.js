const jwtToken= require('jsonwebtoken')
const User= require('../../model/UserSchema')
module.exports.userSignIn= async (req,res)=>{
    console.log(req.body);
    try{
      const user= await User.findOne({email:req.body.email});
      console.log(user)
      if(!user || user.password != req.body.password) {
        return res.status(404).json({
            message: "Invalid crediential ..."
        });
      }
      return res.status(200).json({
        message: "login successfully",
        accessToken: {
           token: jwtToken.sign(user.toJSON(),'abhijeet',{expiresIn:1000})
        }
      });
    }catch(err){
        console.log("there is proble with signIn",err);
        return;
    }
    return res.send("JWT project");
}

module.exports.home=(req,res)=>{
   return res.json({
    message: 'this field is authenticated by jwt'
   })
}