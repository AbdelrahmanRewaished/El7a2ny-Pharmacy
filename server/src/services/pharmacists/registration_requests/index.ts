import PharmacistRegistrationRequest from "../../../models/pharmacist_registration_requests/PharmacistRegistrationRequest";
import { IPharmacist } from "../../../models/pharmacists/interfaces/IPharmacist";

export const findAllPharmacistRegistrationRequests = async () =>
  await PharmacistRegistrationRequest.find();

export const findPharmacistRegistrationRequestByEmail = async (email: string) =>
  await PharmacistRegistrationRequest.findOne({ email });

export const findPharmacistRegistrationRequestById = async (id: string) =>
  await PharmacistRegistrationRequest.findById(id);

export const findPharmacistRegistrationRequestByUsername = async (
  username: string
) => await PharmacistRegistrationRequest.findOne({ username });

export const sendPharmacistContract = async (
  id: string,
  contractUrl: string
) => {
  return await PharmacistRegistrationRequest.findByIdAndUpdate(id).set({
    contractUrl,
    status: "accepted",
  });
};

export const getPharmacistRegistrationContract = async (id: string) => {
  return await PharmacistRegistrationRequest.findById(id).select({
    _id: 1,
    contractUrl: 1,
  });
};

export const addPharmacistRegistrationFiles = async (
  id: string,
  files: any
) => {
  return await PharmacistRegistrationRequest.findByIdAndUpdate(id, files);
};

export const rejectSentContract = async (id: string) => {
  return await PharmacistRegistrationRequest.findByIdAndUpdate(id).set({
    status: "rejected",
  });
};

export const createNewPharmacistRegistrationRequest = async (
  request: IPharmacist
) => {
  const existingPharmacistRequestByEmail =
    await PharmacistRegistrationRequest.findOne({ email: request.email });
  const existingPharmacistRequestByUsername =
    await PharmacistRegistrationRequest.findOne({ username: request.username });

  if (existingPharmacistRequestByEmail) {
    throw new Error("Email already exists. Please use a different email.");
  }

  if (existingPharmacistRequestByUsername) {
    throw new Error(
      "Username already exists. Please choose a different username."
    );
  }

  if (isAWeakPassword(request.password)) {
    throw new Error(
      "Password must be strong (min 8 characters, uppercase, lowercase, number, special character)."
    );
  }

  const newPharmacistRegistrationRequest = new PharmacistRegistrationRequest({
    username: request.username,
    password: request.password,
    email: request.email,
    name: request.name,
    gender: request.gender,
    mobileNumber: request.mobileNumber,
    dateOfBirth: request.dateOfBirth,
    hourlyRate: request.hourlyRate,
    affiliation: request.affiliation,
    educationalBackground: request.educationalBackground,
  });
  return await newPharmacistRegistrationRequest.save();
};

function isAWeakPassword(password: string) {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return !strongPasswordRegex.test(password);
}
