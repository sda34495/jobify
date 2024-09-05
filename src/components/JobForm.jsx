import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../redux/companySlice";

const JobForm = ({ onSubmit, jobData: initialData = {} }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies || []);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    companyId: "",
    salary: "",
    jobType: "",
    experienceLevel: "",
    employmentType: "",
    location: "",
    remote: false,
    skillsRequired: [],
    benefits: [],
  });

  useEffect(() => {
    dispatch(fetchCompanies()); 
  }, [dispatch]);

  useEffect(() => {
    if (!initialData) return;
    setJobData((prevData) => ({
      ...prevData,
      title: initialData.title || "",
      description: initialData.description || "",
      companyId: initialData._id || "",
      salary: initialData.salary || "",
      jobType: initialData.jobType || "",
      experienceLevel: initialData.experienceLevel || "",
      employmentType: initialData.employmentType || "",
      location: initialData.location || "",
      remote: initialData.remote || false,
      skillsRequired: initialData.skillsRequired || [],
      benefits: initialData.benefits || [],
    }));
  }, []);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e, field) => {
    if (e.key === "Enter" && e.target.value) {
      setJobData({
        ...jobData,
        [field]: [...jobData[field], e.target.value],
      });
      e.target.value = ""; // clear input
    }
  };

  const removeTag = (index, field) => {
    setJobData({
      ...jobData,
      [field]: jobData[field].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobData);
  };

  const handleCompanyChange = (e) => {
    setJobData({ ...jobData, companyId: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl max-h-[70vh]  h-full overflow-y-auto mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="col-span-2 text-2xl font-semibold text-gray-800 mb-4 text-center">
        Job Details
      </h2>

      {/* Job Title */}
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          value={jobData?.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Enter job title"
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-gray-600 font-medium mb-1">Job Type</label>
        <select
          name="jobType"
          value={jobData?.jobType}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option disabled>Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Salary */}
      <div>
        <label className="block text-gray-600 font-medium mb-1">Salary</label>
        <input
          type="number"
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Enter salary"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Experience Level
        </label>
        <select
          name="experienceLevel"
          value={jobData?.experienceLevel}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option >Select Experience Level</option>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Description */}
      <div className="col-span-2">
        <label className="block text-gray-600 font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Enter job description"
          rows="4"
        />
      </div>

      {/* Companies Dropdown */}
      <div>
        <label className="block text-gray-600 font-medium mb-1">Company</label>
        <select
          name="companyId"
          value={jobData.companyId}
          onChange={handleCompanyChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option disabled >Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Employment Type
        </label>
        <select
          name="employmentType"
          value={jobData?.employmentType}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option disabled>Select Job Type</option>
          <option value="Permanent">Permanent</option>
          <option value="Temporary">Temporary</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="col-span-2">
        <label className="block text-gray-600 font-medium mb-1">
          Skills Required
        </label>
        <input
          type="text"
          onKeyDown={(e) => handleTagChange(e, "skillsRequired")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Press Enter to add skills"
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {jobData.skillsRequired.map((skill, index) => (
            <div
              key={index}
              className="bg-blue-200 text-blue-800 p-1 rounded inline-flex items-center"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeTag(index, "skillsRequired")}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2">
        <label className="block text-gray-600 font-medium mb-1">Benefits</label>
        <input
          type="text"
          onKeyDown={(e) => handleTagChange(e, "benefits")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Press Enter to add benefits"
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {jobData.benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-green-200 text-green-800 p-1 rounded inline-flex items-center"
            >
              {benefit}
              <button
                type="button"
                onClick={() => removeTag(index, "benefits")}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Enter location"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="col-span-2 bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default JobForm;
