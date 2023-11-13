import UserRole from "../../../types/enums/UserRole";
import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";
import { IWallet } from "../../wallets/interfaces/IWallet";

export interface IPharmacist extends IUserBaseInfo {
  role?: UserRole.PHARMACIST;
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  identificationUrl?: string;
  pharmacyDegreeUrl?: string;
  workingLicenseUrl?: string;
  wallet?: IWallet;
  contractUrl?: string;
  contractStatus?: "pending" | "accepted" | "rejected";
  passwordReset?: {
    otp: string;
    expiryDate: Date;
  };
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
