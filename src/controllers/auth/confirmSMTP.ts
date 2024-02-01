import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/user/user";
import { HttpError } from "../../helpers";

const confirmSMTP = async (req: Request, res: Response) => {
  const { email, smtp } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Invalid email address");
  }

  if (user.smtp !== smtp) {
    throw HttpError(403, "Invalid one-time password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1w",
  });

  await User.findOneAndUpdate(user._id, {
    smtp: "",
    token,
  });

  res.status(200).json({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token,
  });
};

export default confirmSMTP;
