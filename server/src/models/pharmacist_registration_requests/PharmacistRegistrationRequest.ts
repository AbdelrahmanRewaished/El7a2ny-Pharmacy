import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

import { IPharmacistRegistrationRequest } from "./interfaces/IPharmacistRegistrationRequest";

export interface IPharmacistRegistrationRequestModel
  extends IPharmacistRegistrationRequest,
    Document {}

export const PharmacistRegistrationRequestSchema =
  new Schema<IPharmacistRegistrationRequestModel>(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      email: {
        type: String,
        validate: [isEmail, "invalid email"],
        required: true,
        unique: true,
      },
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
      identificationUrl: { type: String, select: true },
      pharmacyDegreeUrl: { type: String },
      workingLicenseUrl: { type: String },
      contractUrl: { type: String, select: false },
      status: {
        type: String,
        enum: [
          "accepted",
          "pending documents upload",
          "pending contract acceptance",
          "rejected",
        ],
        default: "pending documents upload",
        required: true,
      },
    },
    { timestamps: true }
  );

PharmacistRegistrationRequestSchema.methods.verifyPassword = function (
  password: string
) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IPharmacistRegistrationRequestModel>(
  "PharmacistRegistrationRequest",
  PharmacistRegistrationRequestSchema
);
