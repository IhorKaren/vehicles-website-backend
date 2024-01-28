import { Request, Response } from "express";
import { IUser } from "../../models/user/user";

const getCurrent = async (req: Request, res: Response) => {
  const { email, name, token }: IUser = req.user as IUser;

  res.json({
    email,
    name,
    token,
  });
};

export default getCurrent;
