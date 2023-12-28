import mongoose from "mongoose";
const { Schema, model } = mongoose;

const favouriteSchema = new Schema({
  user_id: String,
  coords: [Number],
  name: String,
  updated: { type: Date, default: Date.now },
});

const Favourite = model("Favourite", favouriteSchema);
export default Favourite;
