import express from "express";
import Favourite from "../middleware/db/model/favouriteModel";

export const fetchFavourites = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const favourites = await Favourite.find({ user_id: req.query.user_id });
    res.send({ status: 1, content: favourites });
  } catch (error) {
    res.send({ status: 0, content: "No favourites found" });
  }
};

export const addFavourites = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const favourite = new Favourite({
      user_id: req.body.user_id,
      coords: req.body.coords,
      name: req.body.name,
    });
    await favourite.save();
    res.send({ status: 1, content: "favourite added" });
  } catch (error) {
    res.send({ status: 0, content: "favourite failed to add" });
  }
};
