const commentSchema = require('../model/CommentSchema');
const postSchema = require('../model/PostSchema');
const likeSchema = require('../model/LikeSchema');

const commentMailer = require('../mailers/comment_mailers');
const commentEmailWorker = require('../workers/comment_email_worker');
const kue = require('../config/kue');

module.exports.callPage = (req, res) => {
    return res.send('<h1>Comment page called</h1>');
}

module.exports.create = async (req, res) => {
    try {
        const posts = await postSchema.findById(req.params.id);
        if (posts) {
            let comment = await commentSchema.create({
                msg: req.body.content,
                post: req.params.id,
                user: req.user._id
            });

            posts.comment.push(comment);
            posts.save();

            const email = await commentSchema.findById(comment._id).populate('user');
            const postEmail = await posts.populate('user');

            const info = {
                sender: email,
                reciver: postEmail
            }
            // commentMailer.newComment(info);
            let job = kue.create('emails', info).save((err) => {
                if (err) {
                    console.log('error in creating job on delaymailer', err);
                    return;
                }
                console.log(job.id);
            });
        }
    } catch (err) {
        console.log(err);
    }

    return res.redirect('back');
}

module.exports.delete = async (req, res) => {
    try {
        const comments = await commentSchema.findByIdAndDelete(req.params.id);
        const posts = await postSchema.findByIdAndUpdate(comments.post, {
            $pull: {
                comment: req.params.id
            }
        });
        
        const like = await likeSchema.deleteMany({
            likeable: req.params.id
        });

        console.log('comment deleted',comments);
        console.log('Likes deleted',like);
        console.log('comment removed from post',posts)
    } catch (err) {
        console.log(err);
    }

    return res.redirect('back');
}