import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { IPharmacist } from "./interfaces/IPharmacist";
import bcrypt from "bcrypt";
import PasswordResetSchema from "../users/PasswordReset";

export interface IPharmacistModel extends IPharmacist, Document {}

export const PharmacistSchema = new Schema<IPharmacistModel>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, bcrypt: true },
    email: { type: String, validate: [isEmail, "invalid email"], unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["unspecified", "male", "female"],
      default: "unspecified",
    },
    mobileNumber: { type: String, required: false }, //TO BE REQUIRED
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    identification: { type: String },
    pharmacyDegree: { type: String },
    workingLicense: { type: String },
    passwordReset: {
      type: PasswordResetSchema,
      select: false,
    },
  },
  { timestamps: true }
);

// PharmacistSchema.plugin(bcrypt);

PharmacistSchema.plugin(require("mongoose-bcrypt"), { rounds: 10 });

PharmacistSchema.methods.verifyPasswordResetOtp = function (otp: string) {
  return bcrypt.compare(otp, this.passwordReset.otp);
};

export default mongoose.model<IPharmacistModel>("Pharmacist", PharmacistSchema);
