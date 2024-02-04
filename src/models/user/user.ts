import { Schema, model, Document } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../../helpers";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  smtp: string;
  password: string;
  accountType: string;
  membership: string;
  companyName?: string;
  companyCode?: string;
  companyAddress?: string;
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    smtp: { type: String, default: "" },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
    accountType: {
      type: String,
      required: true,
      enum: ["private", "trader", "business", "admin"],
    },
    companyName: {
      type: String,
    },
    companyCode: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    membership: {
      type: String,
      enum: ["guest", "basic", "premier"],
      default: "guest",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  companyName: Joi.string(),
  companyCode: Joi.string(),
  companyAddress: Joi.string(),
  accountType: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model<IUser>("user", userSchema);

export { User, schemas };
