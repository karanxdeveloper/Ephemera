import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: { type: Date, required: true }
});

postSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Post = mongoose.model("Post", postSchema);

export default Post;
