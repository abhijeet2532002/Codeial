const mongoose = require('mongoose');

const schemas = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },    
    // this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'comment']
    }
},{
    timestamps: true
});

const LikeSchema = mongoose.model('like',schemas);
module.exports = LikeSchema;