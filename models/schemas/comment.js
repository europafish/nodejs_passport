const { Schema } = require('mongoose');
const CommentSchema = new Schema(
    {
        // content, String, required,
        // author, User, required
        content: {
          type: String,
          required: true,
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
      {
        timestamps: true,
      },
);
module.exports = CommentSchema;