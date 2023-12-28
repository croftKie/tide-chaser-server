import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  hash: String,
  board: String,
});

const User = model("User", userSchema);
export default User;
