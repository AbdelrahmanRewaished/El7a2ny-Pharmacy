import express from "express";
import { registerPatient, registerPharmacist } from "../controllers/registrationController";
const router = express.Router();

// --> Path: /registration/

router.post("/patient", registerPatient);
router.post("/pharmacist", registerPharmacist);

export default router;
