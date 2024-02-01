import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/user/user";
import { HttpError, emailSender } from "../../helpers";

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const smtp = Math.floor(1000 + Math.random() * 9000);

  emailSender({ email, smtp });

  const newUser = await User.create({
    ...req.body,
    smtp,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1w",
  });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    membership: newUser.membership,
    accountType: newUser.accountType,
    token,
  });
};

export default register;
