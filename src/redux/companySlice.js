import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const response = await axios.get("/companies");
    return response.data;
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
      state.status = "success";
    });
  },
});

export default companySlice.reducer;
