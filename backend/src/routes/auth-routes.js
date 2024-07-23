import express from "express";
import {
  signup,
  login,
  getUserData,
  updateProfile,
} from "../controllers/auth-controller.js";
import { verifyToken } from "../middlewares/auth-middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-data", verifyToken, getUserData);
authRoutes.post("/update-profile", verifyToken, updateProfile);

export default authRoutes;
