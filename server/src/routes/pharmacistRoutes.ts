import express from "express";
import {
  changePharmacistPassword,
  deletePharmacist,
  getPharmacists,
  searchPharmacists,
} from "../controllers/pharmacistController";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeUser } from "../middlewares/authorization";
import UserRole from "../types/UserRole";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.use(authenticateUser);

router.delete("/:id", deletePharmacist);
router.get("/", getPharmacists);
router.get("/search", searchPharmacists);
router.post("/change-password", changePharmacistPassword);

export default router;
