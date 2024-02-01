import { Request, Response } from "express";

import { User } from "../../models/user/user";
import { HttpError, emailSender } from "../../helpers";

const resendSMTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Invalid email address");
  }

  const smtp = Math.floor(1000 + Math.random() * 9000);

  emailSender({ email, smtp });

  await User.findOneAndUpdate(user._id, {
    smtp,
  });

  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email,
  });
};

export default resendSMTP;
