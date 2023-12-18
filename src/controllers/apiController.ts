import express from "express";
import { fetchStormGlassData } from "../utils/fetchStormGlass";
export const fetchAPIData = async (
  req: express.Request,
  res: express.Response
) => {
  const data = await fetchStormGlassData();

  res.send(data);
};
