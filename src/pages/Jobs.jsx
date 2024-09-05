// pages/Companies.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCompanies } from "../redux/companySlice";

function Jobs() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Jobs</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td className="border px-4 py-2">{company.name}</td>
              <td className="border px-4 py-2">{company.location}</td>
              <td className="border px-4 py-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Jobs;
