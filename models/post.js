const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    post_id: { type: Number, required: true, unique: true },
    author_id: { type: Number, required: true },
    title: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    image_url: { type: String, trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    collection: 'Posts',
    versionKey: false,
  }
);

module.exports = mongoose.model('Post', postSchema);
