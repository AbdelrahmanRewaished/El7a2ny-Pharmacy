import { IPasswordResetInfo } from "../../../models/users/interfaces/IPasswordReset";
import { User } from "../../../types/User";
import { IUserModel } from "../../../types/UserModel";
import { generateOTP, getOTPExpirationDate } from "../../../utils/OTP";
import { sendEmail } from "../../../utils/email";
import { findUserByEmail, findUser } from "../../users";

export const sendPasswordResetOTPIfUserExists = async (
  email: string
): Promise<User> => {
  const user = await findUserByEmail(email, { _id: 1, role: 1 });
  if (!user) throw new Error("User not found");
  const passwordResetInfo = getPasswordResetInfo();
  console.log(passwordResetInfo);
  await savePasswordResetInfo(user, passwordResetInfo);
  await sendPasswordResetOTPEmail(email, passwordResetInfo.otp);
  return { id: user._id, role: user.role } as User;
};

const getPasswordResetInfo = () => {
  const otp = generateOTP();
  const expiryDate = getOTPExpirationDate();
  return { otp, expiryDate };
};

const sendPasswordResetOTPEmail = async (email: string, otp: string) => {
  await sendEmail({
    to: email,
    subject: "Password Reset Request",
    text: `Your password reset OTP is ${otp}`,
    html: `<h1>El7a2ny</h1><h2>Password Reset OTP</h2><p>Your password reset OTP is <b>${otp}</b></p>`,
  });
};

const savePasswordResetInfo = async (
  user: IUserModel,
  passwordResetInfo: IPasswordResetInfo
) => {
  user.passwordReset = passwordResetInfo;
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

export const deletePasswordResetInfo = async (user: IUserModel) => {
  if (!user) throw new Error("User not found");
  user.passwordReset = undefined;
  await user.save();
};

export const validateOTP = async (
  userPayload: User,
  otp: string
): Promise<IUserModel> => {
  const user = await findUser(userPayload, { _id: 1, passwordReset: 1 });
  if (!user) throw new Error("User not found");
  // console.log(user);

  console.log(user.passwordReset);
  if (!user.passwordReset) throw new Error("Password reset info not found");

  if (user.passwordReset.expiryDate < new Date())
    throw new Error("OTP expired");

  console.log("CHECK OTP----", otp);
  const isOtpValid: boolean = await user.verifyPasswordResetOtp?.(otp)!;
  if (!isOtpValid) throw new Error("Invalid OTP");

  deletePasswordResetInfo(user);
  return user;
};
