const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: { type: Number, required: true, unique: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password_hash: { type: String, required: true, trim: true },
    display_name: { type: String, trim: true },
    avatar_url: { type: String, trim: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: 'Users',
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);
