import mongoose,{ model, Schema } from "mongoose";

const commentsSchema = new Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Related post
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Comment author
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = model("Comment", commentsSchema);
export default Comment;
