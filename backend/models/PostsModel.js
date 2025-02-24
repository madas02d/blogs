import  { model, Schema } from "mongoose";

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  categories: { type: String, enum:["general", "tech"]},
  coverImage: { type: String },
  published: { type: Boolean, default: false }, // Defaults to unpublished
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Reference to comments
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = model("Post", postSchema);
export default Post;
