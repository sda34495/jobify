import Joi from "joi";

export const validateCompany = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(500).optional(),
    location: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployees: Joi.number().min(1).required(),
    companyType: Joi.string()
      .valid("Private", "Public", "Government", "Non-profit")
      .required(),
    founded: Joi.date().optional(),
    industry: Joi.string()
      .valid(
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "Manufacturing",
        "Other"
      )
      .required(),
    revenue: Joi.number().min(0).optional(),
    website: Joi.string().uri().optional(),
    culture: Joi.string().max(500).optional(),
  });

  return schema.validate(data);
};
