import express from "express";

import {
  getPharmacistContract,
  addPharmacistRegistrationRequestFiles,
  rejectOffer,
} from "../../controllers/pharmacists/pharmacistRegisterController";
import { acceptPharmacistRegistrationRequest } from "../../controllers/pharmacists/actionOnRequest";
import { authenticateUser } from "../../middlewares/authentication";

const registrationRouter = express.Router();
registrationRouter.use(authenticateUser);

registrationRouter
  .put("/users/pharmacist-registration", addPharmacistRegistrationRequestFiles)
  .post("/users/accept-contract", acceptPharmacistRegistrationRequest)
  .post("/users/reject-contract", rejectOffer)
  .get("/users/contract", getPharmacistContract);

export default registrationRouter;
