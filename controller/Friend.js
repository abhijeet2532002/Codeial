const user = require('../model/UserSchema');
const friend = require('../model/FriendSchema');

module.exports.frnd = async (req, res) => {
    console.log('frnd is called');
    console.log('frnd id : ', req.query.id);
    console.log('user id : ', req.user._id);
    try {
        const frnd = await friend.findOne({
            $or: [
                { user: req.user._id, friend: req.query.id },
                { user: req.query.id, friend: req.user._id }
            ]
        });
        console.log(`\nFriends :  ${frnd}\n`)
        if(!frnd) {
            const frndCreate = await friend.create({
                user: req.user._id,
                friend: req.query.id
            });
            
            const userInfo = await user.findById(req.user._id);
            userInfo.friend.push(frndCreate);
            userInfo.save();

            const userData = await user.findById(req.query.id);
            userData.friend.push(frndCreate);
            userData.save();

            // console.log(userInfo);
        }else {
            console.log('already frnd ....');
        }
    } catch (err) {
        console.log('error in frnd fetching', err);
    }
    return res.redirect('back');
}