import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../../models/user/user";
import { HttpError } from "../../helpers";

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

export default register;
