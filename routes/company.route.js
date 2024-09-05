import express from "express";
import {
  addCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addCompany);
router.get("/list", authMiddleware, getCompanies);
router.put("/update/:companyId", authMiddleware, updateCompany);
router.get("/:id", authMiddleware, getCompanyById);
router.delete("/delete/:id", authMiddleware, deleteCompany);

export default router;
