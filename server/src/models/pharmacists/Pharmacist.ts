import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { IPharmacist } from "./interfaces/IPharmacist";
import bcrypt from "bcrypt";
import PasswordResetSchema from "../users/PasswordReset";
import NotificationSchema from "../notifications/Notification";
import WalletSchema from "../wallets/Wallet";

export interface IPharmacistModel extends IPharmacist, Document {}

// TODO: Add the world "Url" to the end of the needed fields
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
      default: "unspecified"
    },
    mobileNumber: { type: String, required: false }, //TO BE REQUIRED
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    identification: { type: String },
    pharmacyDegree: { type: String },
    workingLicense: { type: String },
    wallet: {
      type: WalletSchema,
      select: false,
      required: false
    },
    passwordReset: {
      type: PasswordResetSchema,
      select: false
    },
    receivedNotifications: {
      type: Array<typeof NotificationSchema>,
      select: false,
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

// TODO: Remove this I guess? Check bcrypt hashing across models.
// PharmacistSchema.plugin(bcrypt);

PharmacistSchema.plugin(require("mongoose-bcrypt"), { rounds: 10 });

PharmacistSchema.methods.verifyPasswordResetOtp = function (otp: string) {
  return bcrypt.compare(otp, this.passwordReset.otp);
};
PharmacistSchema.methods.verifyWalletPinCode = function (pinCode: string) {
  return bcrypt.compare(pinCode, this.wallet.pinCode);
};

export default mongoose.model<IPharmacistModel>("Pharmacist", PharmacistSchema);
