import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./companySlice";
import jobsReducer from "./jobSlice";

const store = configureStore({
  reducer: {
    companies: companiesReducer,
    jobs: jobsReducer,
  },
});

export default store;
