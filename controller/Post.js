const postSchema = require('../model/PostSchema');
const commentSchema = require('../model/CommentSchema');
const Like = require('../model/LikeSchema');

module.exports.display = (req, res) => {
    postSchema.find({})
        .populate('user')
        .populate({ path: 'comment', populate: { path: 'user' } })
        .then((posts) => {
            return res.render('Post', {
                title: 'Post Page',
                postInfo: posts
            })
        }).catch((err) => {
            console.error(err);
        })
}

module.exports.create = (req, res) => {
    postSchema.create({
        msg: req.body.content,
        user: req.user._id
    }).then((result) => {
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: result
                },
                message: 'Post Created By Ajax'
            })
        }
        return res.redirect('back');
    }).catch((err) => {
        console.error(err);
    })
}

module.exports.delete = async (req, res) => {
    console.log(`id: ${req.params.id}`);
    try {
        const postMsg = await postSchema.findById(req.params.id);
        if (req.user.id == postMsg.user) {
            await Like.deleteMany({
                likeable: postMsg
            });
            await Like.deleteMany({
                likeable: {
                    $in: postMsg.comment
                }
            });
            await postMsg.deleteOne();
            const comments = await commentSchema.deleteMany({ post: req.params.id });
            console.log(comments);
        };
    } catch (err) {
        console.log(err);
    }
    return res.redirect('back');
}