import express from "express";
import bcrypt from "bcrypt";
import User from "../middleware/db/model/userModel";

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  const loginDetails = req.body;

  const user = await User.findOne({ email: loginDetails.email });

  bcrypt.compare(loginDetails.password, user?.hash!, function (err, result) {
    if (result === true) {
      res.send({
        status: 1,
        message: "login complete",
        access: true,
        user_id: user?._id,
      });
    } else {
      res.send({
        status: 0,
        message: "Password or Email was incorrect",
        access: false,
      });
    }
  });
};

export const signupUser = async (
  req: express.Request,
  res: express.Response
) => {
  const saltRounds = 10;

  const userCheck = await User.findOne({ email: req.body.email });

  if (userCheck) {
    res.send({ status: 0, message: "user already exists", access: false });
  } else {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          hash: hash,
          board: "",
        });
        await user.save();
        res.send({
          status: 1,
          message: "user created",
          user_id: user._id.toString(),
          access: true,
        });
      });
    });
  }
};
