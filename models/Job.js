import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  salary: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", JobSchema);
