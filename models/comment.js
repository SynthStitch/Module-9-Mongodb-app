const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment_id: { type: Number, required: true, unique: true },
    author_id: { type: Number, required: true },
    post_id: { type: Number, required: true },
    body: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: 'Comments',
    versionKey: false,
  }
);

module.exports = mongoose.model('Comment', commentSchema);

