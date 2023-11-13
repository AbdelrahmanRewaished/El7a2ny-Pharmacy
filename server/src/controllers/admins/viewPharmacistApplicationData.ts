import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  findPharmacistRegistrationRequestByEmail,
  findPharmacistRegistrationRequestById,
} from "../../services/pharmacists/registration_requests";

const getPharmacistRegistrationRequest = async (
  req: Request,
  res: Response
) => {
  const email = req.params.email;

  try {
    const request = await findPharmacistRegistrationRequestByEmail(email);

    if (!request) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Pharmacist registration request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error("Error fetching Pharmacist registration request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const getPharmacistRegistrationRequestbyId = async (
  req: Request,
  res: Response
) => {
  const pharmacistId = req.params.pharmacistId;

  try {
    const request = await findPharmacistRegistrationRequestById(pharmacistId);

    if (!request) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Pharmacist registration request not found" });
    }
    res.json(request);
  } catch (error) {
    console.error("Error fetching Pharmacist registration request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export default getPharmacistRegistrationRequest;
