import { Request, Response } from "express";
import { IUser } from "../../models/user/user";

const getCurrent = async (req: Request, res: Response) => {
  const { email, firstName, lastName, token }: IUser = req.user as IUser;

  res.json({
    email,
    firstName,
    lastName,
    token,
  });
};

export default getCurrent;
