const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  body: String,
  email: String,
  createdAt: String,
  comments: [
    {
      body: String,
      email: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      email: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model('Post', postSchema);


module.exports = Post
 