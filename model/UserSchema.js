const mongoose = require('mongoose');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avtars');
const multer  = require('multer')

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    friend: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    }]
}, {
    timestamps: true
});

UserModel.statics.avatarPath = AVATAR_PATH;

const UserSchema = mongoose.model('user', UserModel);
module.exports = UserSchema;