import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <div className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform">
        <a
          href="#"
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <img
            className="w-8 h-8"
            src="https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/find-jobs-on-newspaper-icon.svg"
            alt="logo"
          />
          <h2 className="font-bold text-2xl m-2">
            JOBIFY{" "}
            {/* <span className="bg-[#f84525] text-white px-2 rounded-md"> */}
            {/* </span> */}
          </h2>
        </a>
        <ul className="mt-4">
          <span className="text-gray-400 font-bold">ADMIN</span>
          <li className="mb-1 group">
            <Link
              to={"/dashboard"}
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-home-2-line mr-3 text-lg" />
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>

          <span className="text-gray-400 font-bold">JOBS</span>

          <li className="mb-1 group">
            <Link
              to={"/jobs"}
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-home-2-line mr-3 text-lg" />
              <span className="text-sm">View All</span>
            </Link>
          </li>
          <span className="text-gray-400 font-bold">COMPANIES</span>

          <li className="mb-1 group">
            <Link
              to={"/companies"}
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-home-2-line mr-3 text-lg" />
              <span className="text-sm">View All</span>
            </Link>
          </li>
        </ul>
        <button
          onClick={logout}
          className="fixed  bottom-10 flex space-x-2 items-center justify-center text-white bg-gray-600 py-2 px-16 rounded-sm"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            // className="text-white"
          >
            <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
          </svg>
          Logout
        </button>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" />
      {/* end sidenav */}

      {/* navbar */}
      <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <button
          type="button"
          className="text-lg text-gray-900 font-semibold sidebar-toggle"
        >
          <i className="ri-menu-line" />
        </button>
        <ul className="ml-auto flex items-center">
          <li className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                className="hover:bg-gray-100 rounded-full"
                viewBox="0 0 24 24"
                style={{ fill: "gray", transform: "", msfilter: "" }}
              >
                <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
              </svg>
            </button>
            <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100"></div>
          </li>

          <li className="dropdown ml-3">
            <button type="button" className="dropdown-toggle flex items-center">
              <div className="flex-shrink-0 w-10 h-10 relative">
                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                    alt=""
                  />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                </div>
              </div>
              <div className="p-2 md:block text-left">
                <h2 className="text-sm font-semibold text-gray-800">
                  Jobify Admin
                </h2>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
      {/* End of Navbar */}
    </div>
  );
};

export default Layout;
