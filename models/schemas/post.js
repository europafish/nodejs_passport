const { Schema } = require('mongoose');
const shortId = require('./types/short-id');
const CommentSchema = require('./comment');

const PostSchema = new Schema({
    shortId,
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
        index: true,
    },
    comments: [CommentSchema],
},{
    timestamps: true,
  })

module.exports = PostSchema;