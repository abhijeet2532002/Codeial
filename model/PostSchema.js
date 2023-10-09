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
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    }]
}, {
    timestamps: true
});

const PostSchema = mongoose.model('post',schema);
module.exports = PostSchema;