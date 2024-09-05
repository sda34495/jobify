import express from "express";
import { addCompany, getCompanies } from "../controllers/company.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addCompany);
router.get("/list", authMiddleware, getCompanies);

export default router;
