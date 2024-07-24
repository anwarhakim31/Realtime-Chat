import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth-middleware.js";
import {
  signup,
  login,
  getUserData,
  updateProfile,
  addProfileImage,
  removeProfileImage,
} from "../controllers/auth-controller.js";

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "uploads/profiles"); // Directory to save uploaded files
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname); // File name
  },
});

const upload = multer({ storage: storage });

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-data", verifyToken, getUserData);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);

authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);

export default authRoutes;
