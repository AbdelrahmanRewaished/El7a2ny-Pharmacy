import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types";
import {
  addPharmacistRegistrationFiles,
  createNewPharmacistRegistrationRequest,
  getPharmacistRegistrationContract,
  rejectSentContract,
} from "../../services/pharmacists/registration_requests";
import { Request, Response } from "express";

export const registerAsPharmacist = async (req: Request, res: Response) => {
  try {
    await createNewPharmacistRegistrationRequest(req.body);
    res
      .status(StatusCodes.CREATED)
      .send("Pharmacist Registration Request Sent Successfully!");
  } catch (err: any) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};

export const getPharmacistContract = async (
  req: AuthorizedRequest,
  res: Response
) => {
  if (!req.user?.id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "PharmacistId is required" });

  try {
    const pharmacistId = req.user?.id;

    const contract = await getPharmacistRegistrationContract(pharmacistId!);

    res.status(StatusCodes.CREATED).send(contract);
  } catch (err: any) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};

export const addPharmacistRegistrationRequestFiles = async (
  req: AuthorizedRequest,
  res: Response
) => {
  if (!req.user?.id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "PharmacistId is required" });
  try {
    await addPharmacistRegistrationFiles(req.user?.id!, req.body);
    res
      .status(StatusCodes.CREATED)
      .send("Pharmacist Registration Request Files Sent Successfully!");
  } catch (err: any) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};

export const rejectOffer = async (req: AuthorizedRequest, res: Response) => {
  if (!req.user?.id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "pharmacistId is required" });

  try {
    const pharmacistId = req.user?.id;

    const contract = await rejectSentContract(pharmacistId!);

    res.status(StatusCodes.CREATED).send("rejected successfully");
  } catch (err: any) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};
