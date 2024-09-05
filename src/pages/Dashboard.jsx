// pages/Dashboard.js
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h3 className="font-bold text-xl">Admin Dashboard</h3>
        <ul>
          <li>
            <Link to="/companies" className="block py-2">
              Companies
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="block py-2">
              Jobs
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>
        <p>Manage your companies and jobs easily here.</p>
      </div>
    </div>
  );
}

export default Dashboard;
