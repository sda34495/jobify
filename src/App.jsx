// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
import { Provider } from "react-redux";
import store from "./redux/store";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import toast, { Toaster } from "react-hot-toast";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <PrivateRoute>
                <Companies />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <Jobs />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
