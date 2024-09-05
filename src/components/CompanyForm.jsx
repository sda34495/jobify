import React, { useEffect, useState } from "react";

const CompanyForm = ({ onSubmit, companyData: initialData = {} }) => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    location: "",
    address: "",
    numberOfEmployees: 100,
    companyType: "",
    founded: "",
    industry: "",
    revenue: 150000,
    website: "",
    culture: "",
  });
  useEffect(() => {
    if (!initialData) return;
    setCompanyData((prevData) => ({
      ...prevData,
      name: initialData.name,
      location: initialData.location,
      description: initialData.description,
      address: initialData.address,
      numberOfEmployees: 100,
      companyType: initialData.companyType,
      founded: initialData.founded,
      website: initialData.website,
      culture: initialData.culture,
      industry: initialData.industry,
    }));
  }, []);

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(companyData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-6 max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <h2 className="col-span-2 text-2xl font-semibold text-gray-800 mb-4 text-center">
        Company Details
      </h2>

      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Company Name
        </label>
        <input
          type="text"
          name="name"
          value={companyData.name}
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Website</label>
        <input
          type="text"
          name="website"
          value={companyData.website}
          onChange={handleChange}
          placeholder="https://"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={companyData.address}
          onChange={handleChange}
          placeholder="Enter company address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={companyData.location}
          onChange={handleChange}
          placeholder="City, Country"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Founded</label>
        <input
          type="date"
          name="founded"
          value={companyData.founded}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Industry</label>
        <select
          name="industry"
          value={companyData.industry}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option disabled>Select Industry</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Company Type
        </label>
        <select
          name="companyType"
          value={companyData.companyType}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option disabled>Select Company Type</option>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
          <option value="Government">Government</option>
          <option value="Non-profit">Non-profit</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Describe Company Culture
        </label>
        <textarea
          name="culture"
          value={companyData.culture}
          onChange={handleChange}
          placeholder="Describe your company's culture"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-gray-600 font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={companyData.description}
          onChange={handleChange}
          placeholder="Briefly describe the company"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="col-span-2 bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default CompanyForm;
