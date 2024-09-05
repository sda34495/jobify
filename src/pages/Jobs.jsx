import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Assuming you are fetching data this way
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Layout from "../components/Layout";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"; // React Icons for actions
import { Button } from "primereact/button";
import CompanyForm from "../components/CompanyForm";
import Modal from "../modals/Modal";
import axios from "../services/axios";
import { fetchJobs } from "../redux/jobSlice";
import JobForm from "../components/JobForm";
import toast, { Toaster } from "react-hot-toast";
import confirmBox from "../services/confirm";

function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs); // Redux state holding the company data
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    name: { value: null, matchMode: "startsWith" },
    location: { value: null, matchMode: "startsWith" },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isJobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    dispatch(fetchJobs()); // Fetch companies from API
  }, [dispatch]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="m-0 text-center">Jobs</h2>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search Companies"
          />
        </span>
      </div>
    );
  };

  const handleSubmit = async (jobData) => {
    if (editingJob) {
      const response = await axios.put(
        `/jobs/update/${editingJob._id}`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status == 200) {
        toast.success("successful");
      } else {
        toast.error("something went wrong 😞");
      }
    } else {
      const response = await axios.post(`/jobs/add`, jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status == 201) {
        toast.success("successful");
      } else {
        toast.error("something went wrong 😞");
      }
    }
    dispatch(fetchJobs());
    setJobModalOpen(false);
    setEditingJob(null); // Clear editing state
  };

  const handleEdit = (company) => {
    setEditingJob(company);
    setJobModalOpen(true); // Open modal with pre-filled data
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon={<AiFillEdit />}
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon={<AiFillDelete />}
          className="p-button-rounded p-button-danger"
          onClick={() => {
            deleteJob(rowData);
          }}
        />
      </React.Fragment>
    );
  };

  const deleteJob = async (rowData) => {
    const result = await confirmBox(
      "Are You Sure You wants to delete this Job?"
    );

    if (!result) return;
    const response = await axios.delete(`/jobs/delete/${rowData._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(fetchJobs());
  };

  const header = renderHeader();
  const companyBodyTemplate = (rowData) => {
    return rowData.company.name;
  };

  return (
    <>
      {isJobModalOpen && (
        <Modal isOpen={isJobModalOpen} onClose={() => setJobModalOpen(false)}>
          <JobForm
            onSubmit={handleSubmit}
            jobData={editingJob} // Pass data if editing
          />
        </Modal>
      )}

      <Layout />
      <div className="flex flex-col items-center justify-center  p-4">
        <button
          onClick={() => {
            setEditingJob(null); // Reset editing state
            setJobModalOpen(true);
          }}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add New Job
        </button>

        <div className="w-full md:w-5/6 xl:w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <DataTable
            value={jobs}
            paginator
            header={header}
            rows={10}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={["title", "location", "description"]}
            emptyMessage="No jobs found."
            responsiveLayout="scroll"
          >
            <Column
              field="title"
              header="Job Title"
              sortable
              filter
              filterPlaceholder="Search by title"
            />
            <Column
              field="location"
              header="Location"
              sortable
              filter
              filterPlaceholder="Search by location"
            />
            <Column field="jobType" header="Job Type" sortable />
            <Column
              field="experienceLevel"
              header="Experience Level"
              sortable
            />
            <Column field="employmentType" header="Employment Type" sortable />
            <Column body={companyBodyTemplate} header="Company" sortable />

            <Column header="Actions" body={actionBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default Jobs;
