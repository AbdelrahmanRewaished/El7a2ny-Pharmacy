import express from "express";

import getPharmacistRegistrationRequests from "../../controllers/admins/viewListOfRequests";
import { getPharmacistRegistrationRequestbyId } from "../../controllers/admins/viewPharmacistApplicationData";
import { authenticateUser } from "../../middlewares/authentication";

import {
  rejectPharmacistRegistrationRequest,
  sendContract,
} from "../../controllers/pharmacists/actionOnRequest";

const router = express.Router();

router.use(authenticateUser);
router.get(
  "/pharmacist-registration/:pharmacistId",
  getPharmacistRegistrationRequestbyId
);
// .post("/acceptPharmacist/:username", acceptPharmacistRegistrationRequest)
// .post("/rejectPharmacist/:username", rejectPharmacistRegistrationRequest)
router.get(
  "/pharmacist-registration-requests",
  getPharmacistRegistrationRequests
);
router.put(
  "/rejectPharmacist/:pharmacistId",
  rejectPharmacistRegistrationRequest
);
router.put("/accept-pharmacist/:pharmacistId", sendContract);

export default router;
