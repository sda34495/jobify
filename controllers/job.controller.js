import Job from "../models/Job.js";
import Company from "../models/Company.js";
import { validateJob } from "../validators/jobValidation.js";

export const addJob = async (req, res) => {
  const {
    title,
    description,
    salary,
    jobType,
    experienceLevel,
    employmentType,
    location,
    remote,
    skillsRequired,
    educationLevel,
    applicationDeadline,
    benefits,
    companyId,
  } = req.body;

  try {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ msg: "Company not found" });

    const newJob = new Job({
      title,
      description,
      salary,
      jobType,
      experienceLevel,
      employmentType,
      location,
      remote,
      skillsRequired,
      educationLevel,
      applicationDeadline,
      benefits,
      company: companyId,
    });

    const savedJob = await newJob.save();
    res
      .status(201)
      .json({
        status: 200,
        message: "Job created succssfully.",
        data: savedJob,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getJobs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const jobs = await Job.find()
      .populate("company", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
