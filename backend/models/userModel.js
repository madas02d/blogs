import { model, Schema } from "mongoose";
const userSchema = new Schema({
  
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 profilePic: {
        type: String, 
        default: "https://example.com/default-profile-pic.png"
    },
});
const User = model("User", userSchema);
export default User;
