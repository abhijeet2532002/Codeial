const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    }]
}, {
    timestamps: true
});
const commentSchema = mongoose.model('comment',schema);
module.exports = commentSchema;