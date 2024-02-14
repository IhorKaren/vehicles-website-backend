import { Schema, model, Document } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../../helpers";

export interface IVehicle extends Document {
  type: string;
  make: string;
  model: string;
  mileage: number;
  year: number;
  color: string;
  bodyType: string;
  engine: {
    displacement: number;
    fuelType: string;
    horsepower: number;
  };
  transmission: string;
  drivetrain: string;
  features: string[];
  price: number;
  condition: {
    new: boolean;
    technicalCondition: string;
    damage: boolean;
  };
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    city: string;
  };
  additionalInfo: {
    description: string;
    photos: string[];
  };
}

declare global {
  namespace Express {
    interface Request {
      vehicle?: IVehicle;
    }
  }
}

const vehicleSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["car", "van", "truck", "bike"],
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    bodyType: {
      type: String,
      required: true,
      enum: ["sedan", "suv", "hatchback", "coupe"],
    },
    engine: {
      displacement: { type: Number, required: true },
      fuelType: { type: String, required: true },
      horsepower: { type: Number, required: true },
    },
    transmission: {
      type: String,
      required: true,
      enum: ["manual", "automatic"],
    },
    drivetrain: {
      type: String,
      required: true,
      enum: ["front-wheel", "rear-wheel", "four-wheel"],
    },
    features: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      new: { type: Boolean, required: true },
      technicalCondition: { type: String, required: true },
      damage: { type: Boolean, required: true },
    },
    contactInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      city: { type: String, required: true },
    },
    additionalInfo: {
      description: { type: String, required: true },
      photos: { type: [String], required: true },
    },
  },
  { versionKey: false, timestamps: true }
);

vehicleSchema.post("save", handleMongooseError);

const Vehicle = model<IVehicle>("vehicle", vehicleSchema);

export { Vehicle };
