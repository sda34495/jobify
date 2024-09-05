import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Company", CompanySchema);
