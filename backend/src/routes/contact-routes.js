import express from "express";
import { verifyToken } from "../middlewares/auth-middleware.js";
import { searchContact } from "../controllers/contact-controller.js";

const contactsRoutes = express.Router();

contactsRoutes.post("/search", verifyToken, searchContact);

export default contactsRoutes;
