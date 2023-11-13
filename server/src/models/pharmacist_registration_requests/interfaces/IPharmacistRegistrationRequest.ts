import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";

export interface IPharmacistRegistrationRequest extends IUserBaseInfo {
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  identificationUrl?: string;
  pharmacyDegreeUrl?: string;
  workingLicenseUrl?: string;
  contractUrl?: string;
  status:
    | "accepted"
    | "pending documents upload"
    | "pending contract acceptance"
    | "rejected";
  verifyPassword?: (password: string) => Promise<boolean>;
}
