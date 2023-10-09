const comment = require('../model/CommentSchema');
const like = require('../model/LikeSchema');
const post = require('../model/PostSchema');

module.exports.Reaction = async (req, res) => {
    console.log('\ntype = ', req.query.type);
    console.log('id = ', req.query.id);

    let likeable;
    let removeLike = false;
    if (req.query.type == 'Post')
        likeable = await post.findById(req.query.id).populate('likes');
    else
        likeable = await comment.findById(req.query.id).populate('likes');
    console.log(likeable);

    let existingLikes = await like.findOneAndRemove({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type
    });
    console.log(existingLikes);

    if (existingLikes) {
        likeable.likes.pull(existingLikes._id);
        likeable.save();

        deleted = true;
    } else {
        let newLike = await like.create({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });

        likeable.likes.push(newLike._id);
        likeable.save();
    }

    return res.redirect('back');
}