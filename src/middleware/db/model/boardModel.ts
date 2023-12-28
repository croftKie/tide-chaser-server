import mongoose from "mongoose";
const { Schema, model } = mongoose;

const boardSchema = new Schema({
  length: String,
  type: String,
});

const Board = model("Board", boardSchema);
export default Board;
