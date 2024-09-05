import Company from "../models/Company.js";
import { validateCompany } from "../validators/companyValidation.js";

export const addCompany = async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const {
    name,
    description,
    location,
    address,
    numberOfEmployees,
    companyType,
    founded,
    industry,
    revenue,
    website,
    culture,
  } = req.body;

  try {
    const newCompany = new Company({
      name,
      description,
      location,
      address,
      numberOfEmployees,
      companyType,
      founded,
      industry,
      revenue,
      website,
      culture,
    });

    const savedCompany = await newCompany.save();
    res.status(201).json({ status: 200, data: savedCompany });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCompanies = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const companies = await Company.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
