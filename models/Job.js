import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    salary: {
      type: Number,
      min: 0,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior"],
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["Permanent", "Temporary", "Freelance", "Internship"], // Type of employment
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    educationLevel: {
      type: String,
      enum: ["High School", "Associate", "Bachelor", "Master", "PhD", "None"],
    },
    applicationDeadline: {
      type: Date,
    },
    benefits: {
      type: [String],
      default: [],
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", JobSchema);
