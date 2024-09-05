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

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ msg: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500 });
  }
};

export const updateCompany = async (req, res) => {
  const { companyId } = req.params;
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const company = await Company.findByIdAndUpdate(companyId, req.body, {
      new: true,
    });
    if (!company)
      return res.status(404).json({ messsage: "Company not found" });
    return res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { active: false },
      {
        new: true,
      }
    );
    if (!company) return res.status(404).json({ msg: "Company not found" });

    res.json({ status: 200, message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
