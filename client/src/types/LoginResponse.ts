import UserRole from "./enums/UserRole";
import { VerificationStatus } from ".";

export type LoginResponse = {
  accessToken: string;
  role: UserRole;
  verificationStatus?: VerificationStatus;
};
