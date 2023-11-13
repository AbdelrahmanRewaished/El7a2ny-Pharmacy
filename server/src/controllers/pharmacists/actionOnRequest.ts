import { Request, Response } from "express";
import PharmacistRegistrationRequest from "../../models/pharmacist_registration_requests/PharmacistRegistrationRequest";
import Pharmacist, {
  IPharmacistModel,
} from "../../models/pharmacists/Pharmacist";
import { StatusCodes } from "http-status-codes";
import { sendPharmacistContract } from "../../services/pharmacists/registration_requests";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const acceptPharmacistRegistrationRequest = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const request = await PharmacistRegistrationRequest.findOne({
      _id: req.user?.id,
    }).select({
      username: 1,
      password: 1,
      email: 1,
      name: 1,
      dateOfBirth: 1,
      gender: 1,
      mobileNumber: 1,
      hourlyRate: 1,
      affiliation: 1,
      educationalBackground: 1,
      identificationUrl: 1,
      pharmacyDegreeUrl: 1,
      workingLicenseUrl: 1,
      contractUrl: 1,
    });

    if (!request) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Request not found" });
    }

    const pharmacist = await Pharmacist.findOne({
      username: request.username,
    });

    if (pharmacist) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Pharmacist already exists" });
    }

    const newPharmacist: IPharmacistModel = new Pharmacist({
      username: request.username,
      password: request.password,
      email: request.email,
      name: request.name,
      dateOfBirth: request.dateOfBirth,
      gender: request.gender,
      mobileNumber: request.mobileNumber,
      hourlyRate: request.hourlyRate,
      affiliation: request.affiliation,
      educationalBackground: request.educationalBackground,
      identificationUrl: request.identificationUrl,
      pharmacyDegreeUrl: request.pharmacyDegreeUrl,
      workingLicenseUrl: request.workingLicenseUrl,
      contractUrl: request.contractUrl,
      contractStatus: "accepted",
    });

    await newPharmacist.save();

    request.status = "accepted";

    await request.save();

    res.status(StatusCodes.OK).json({ message: "Request accepted" });
  } catch (error: any) {
    console.error("Error accepting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const rejectPharmacistRegistrationRequest = async (
  req: Request,
  res: Response
) => {
  const { PharmacistId } = req.params;

  try {
    const request = await PharmacistRegistrationRequest.findByIdAndUpdate(
      PharmacistId
    ).set({ status: "rejected" });

    if (!request) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Request not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Request rejected" });
  } catch (error: any) {
    console.error("Error rejecting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const sendContract = async (req: Request, res: Response) => {
  const { PharmacistId } = req.params;
  const contractUrl = req.body.contract;
  try {
    const request = await sendPharmacistContract(PharmacistId, contractUrl);

    if (!request) {
      return res.status(StatusCodes.OK).json({ message: "Request not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Contract Sent" });
  } catch (error: any) {
    console.error("Error rejecting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
