import ResponseError from "../error/response-error.js";
import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import { validate } from "../validations/validation.js";
import {
  signUpValidate,
  signInValidate,
} from "../validations/auth-validation.js";
import { compare } from "bcrypt";

const maxExp = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

const createToken = (email, userId) => {
  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new Error("JWT_KEY is not defined");
  }
  return jwt.sign({ email, userId }, secret, { expiresIn: maxExp });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    validate(signUpValidate, req.body);

    const alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      throw new ResponseError(400, "Email has been taken");
    }

    const user = await User.create({ email, password });

    // const user = await newUser.save();
    res.cookie("jwt", createToken(email, user.id), {
      maxAge: maxExp,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
      message: "Successfully created account",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    validate(signInValidate, req.body);

    const user = await User.findOne({ email });

    if (!user) {
      throw new ResponseError(404, "Email or Password is wrong");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new ResponseError(400, "Email or Password is wrong");
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxExp,
      secure: true,
      sameSite: "None",
    });

    const {
      _id: id,
      email: emails,
      profileSetup,
      firstName,
      lastName,
      image,
      color,
    } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login Succesfully",
      user: {
        id,
        email: emails,
        profileSetup,
        firstName,
        lastName,
        image,
        color,
      },
    });
  } catch (error) {
    next(error);
  }
};
