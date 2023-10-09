const mongoose = require('mongoose');

const frndSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const FriendSchema = mongoose.model('Friend',frndSchema);
module.exports = FriendSchema;