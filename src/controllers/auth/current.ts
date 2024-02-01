import { Request, Response } from "express";
import { IUser } from "../../models/user/user";

const getCurrent = async (req: Request, res: Response) => {
  const { email, firstName, lastName, accountType, membership, token }: IUser =
    req.user as IUser;

  res.json({
    email,
    firstName,
    lastName,
    accountType,
    membership,
    token,
  });
};

export default getCurrent;
