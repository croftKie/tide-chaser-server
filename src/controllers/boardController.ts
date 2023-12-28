import express from "express";
import Board from "../middleware/db/model/boardModel";
import User from "../middleware/db/model/userModel";
export const fetchBoard = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const boards = await Board.find();

    res.send({ status: 1, content: boards });
  } catch (error) {
    res.send({ status: 0, content: "board sizes could not be retrieved" });
  }
};

export const insertBoard = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await User.updateOne(
      { _id: req.body.user_id },
      {
        board: req.body.board_id,
      }
    );

    res.send({ status: 1, content: "board added" });
  } catch (error) {
    res.send({ status: 0, content: "board sizes could not be retrieved" });
  }
};

export const fetchBoardSingle = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await User.findOne({ _id: req.query.user_id });
    const boards = await Board.find({ _id: user?.board });

    res.send({ status: 1, content: boards });
  } catch (error) {
    res.send({ status: 0, content: "board sizes could not be retrieved" });
  }
};
