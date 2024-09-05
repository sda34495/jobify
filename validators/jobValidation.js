import Joi from "joi";

export const validateJob = (data) => {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(1000).optional(),
    salary: Joi.number().min(0).optional(),
    jobType: Joi.string()
      .valid("Full-time", "Part-time", "Contract", "Internship")
      .required(),
    experienceLevel: Joi.string().valid("Entry", "Mid", "Senior").required(),
    employmentType: Joi.string()
      .valid("Permanent", "Temporary", "Freelance", "Internship")
      .required(),
    location: Joi.string().required(),
    remote: Joi.boolean().optional(),
    skillsRequired: Joi.array().items(Joi.string()).optional(),
    educationLevel: Joi.string()
      .valid("High School", "Associate", "Bachelor", "Master", "PhD", "None")
      .optional(),
    applicationDeadline: Joi.date().optional(),
    benefits: Joi.array().items(Joi.string()).optional(),
    companyId: Joi.string().required(),
  });

  return schema.validate(data);
};
