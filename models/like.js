const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    user_id: { type: Number, required: true },
    post_id: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: 'Likes',
    versionKey: false,
  }
);

likeSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);

