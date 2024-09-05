import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../redux/companySlice"; // Assuming you are fetching data this way
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Layout from "../components/Layout";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"; // React Icons for actions
import { Button } from "primereact/button";
import CompanyForm from "../components/CompanyForm";
import Modal from "../modals/Modal";
import axios from "../services/axios";
import confirmBox from "../services/confirm";
import toast from "react-hot-toast";

function Companies() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies); // Redux state holding the company data
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    name: { value: null, matchMode: "startsWith" },
    location: { value: null, matchMode: "startsWith" },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isCompanyModalOpen, setCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    dispatch(fetchCompanies()); // Fetch companies from API
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
        <h2 className="m-0 text-center">Companies</h2>
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

  const handleSubmit = async (companyData) => {
    if (editingCompany) {
      const response = await axios.put(
        `/companies/update/${editingCompany._id}`,
        companyData,
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
      const response = await axios.post(`/companies/add`, companyData, {
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
    dispatch(fetchCompanies());
    setCompanyModalOpen(false);
    setEditingCompany(null); // Clear editing state
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setCompanyModalOpen(true); // Open modal with pre-filled data
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
            deleteCompany(rowData);
          }}
        />
      </React.Fragment>
    );
  };

  const deleteCompany = async (rowData) => {
    const result = await confirmBox(
      "Are You Sure You wants to delete this Company?"
    );

    if (!result) return;
    const response = await axios.delete(`/companies/delete/${rowData._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(fetchCompanies());
  };

  const websiteBodyTemplate = (rowData) => {
    return (
      <a href={rowData.website} target="_blank" rel="noopener noreferrer">
        {rowData.website}
      </a>
    );
  };

  const numberBodyTemplate = (rowData) => {
    return new Intl.NumberFormat().format(rowData.revenue);
  };

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.founded);
    return date.toLocaleDateString();
  };

  const header = renderHeader();

  return (
    <>
      {isCompanyModalOpen && (
        <Modal
          isOpen={isCompanyModalOpen}
          onClose={() => setCompanyModalOpen(false)}
        >
          <CompanyForm
            onSubmit={handleSubmit}
            companyData={editingCompany} // Pass data if editing
          />
        </Modal>
      )}

      <Layout />
      <div className="flex flex-col items-center justify-center  p-4">
        <button
          onClick={() => {
            setEditingCompany(null); // Reset editing state
            setCompanyModalOpen(true);
          }}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add New Company
        </button>
        <div className="w-full md:w-5/6 xl:w-5/6 ml-64 bg-white p-4 rounded-lg shadow-lg">
          <DataTable
            value={companies}
            paginator
            header={header}
            rows={10}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={["name", "location", "description"]}
            emptyMessage="No companies found."
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header="Company Name"
              sortable
              filter
              filterPlaceholder="Search by name"
            />
            <Column field="description" header="Description" />
            <Column
              field="location"
              header="Location"
              sortable
              filter
              filterPlaceholder="Search by location"
            />
            <Column
              field="numberOfEmployees"
              header="Number of Employees"
              sortable
            />
            <Column field="companyType" header="Company Type" sortable />
            <Column
              field="founded"
              header="Founded"
              body={dateBodyTemplate}
              sortable
            />
            <Column field="industry" header="Industry" sortable />
            <Column
              field="revenue"
              header="Revenue"
              body={numberBodyTemplate}
              sortable
            />
            <Column
              field="website"
              header="Website"
              body={websiteBodyTemplate}
            />
            <Column header="Actions" body={actionBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default Companies;
