import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

import PasswordResetSchema from "../users/PasswordReset";
import { IPharmacist } from "./interfaces/IPharmacist";

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
    mobileNumber: { type: String, required: false }, //TODO: TO BE REQUIRED
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    identificationUrl: { type: String },
    pharmacyDegreeUrl: { type: String },
    workingLicenseUrl: { type: String },
    contractUrl: { type: String, select: false },
    contractStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
      default: "accepted",
      select: false,
    },
    passwordReset: {
      type: PasswordResetSchema,
      select: false,
    },
  },
  { timestamps: true }
);

PharmacistSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

PharmacistSchema.methods.verifyPasswordResetOtp = function (otp: string) {
  return bcrypt.compare(otp, this.passwordReset.otp);
};

export default mongoose.model<IPharmacistModel>("Pharmacist", PharmacistSchema);
