import { Request, Response } from "express";
import { findAllPharmacistRegistrationRequests } from "../../services/pharmacists/registration_requests";
import { StatusCodes } from "http-status-codes";

const getPharmacistRegistrationRequests = async (
  req: Request,
  res: Response
) => {
  try {
    const requests = await findAllPharmacistRegistrationRequests();
    res.status(StatusCodes.OK).json(requests);
  } catch (error: any) {
    console.error("Error fetching Pharmacist registration request:", error);
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};
export default getPharmacistRegistrationRequests;
