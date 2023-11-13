import express from "express";
import { registerAsPharmacist } from "../../controllers/pharmacists/pharmacistRegisterController";

const registrationRouter = express.Router();

registrationRouter.post("/pharmacist-registration", registerAsPharmacist);

export default registrationRouter;
