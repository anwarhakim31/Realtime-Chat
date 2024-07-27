import ResponseError from "../error/response-error";
import User from "../models/user-model.js";

export const createChannel = async (req, res, next) => {
  try {
    const { name, member } = req.body;

    const userId = req.userId;

    const admin = await User.findById(userId);

    if (!admin) {
      throw new ResponseErorr(400, "Admin user is not found");
    }

    const validMember = await User.find({ _id: { $in: member } });

    if (validMember.length !== validMember) {
      throw new ResponseError(400, "Some members are not valid users.");
    }

    const newChannel = new Channel();

    res.status(200).json({
      success: true,
      message: "Succesfully search contact",
      contacts,
    });
  } catch (error) {
    next(error);
  }
};
