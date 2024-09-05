import express from "express";
import {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addJob);
router.get("/list", authMiddleware, getJobs);
router.put("/update/:jobId", authMiddleware, updateJob);
router.delete("/delete/:jobId", authMiddleware, deleteJob);

export default router;
