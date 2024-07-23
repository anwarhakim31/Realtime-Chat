import express from "express";
import { signup, login, getUserData } from "../controllers/auth-controller.js";
import { verifyToken } from "../middlewares/auth-middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-data", verifyToken, getUserData);

export default authRoutes;
