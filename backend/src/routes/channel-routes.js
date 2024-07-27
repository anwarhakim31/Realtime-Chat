import express from "express";
import { verifyToken } from "../middlewares/auth-middleware.js";
import {
  createChannels,
  getChannels,
} from "../controllers/channel-controller.js";

const channelRoutes = express.Router();

channelRoutes.post("/create-channel", verifyToken, createChannels);
channelRoutes.get("/get-channel", verifyToken, getChannels);

export default channelRoutes;
