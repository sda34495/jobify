import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await axios.get("/jobs/list", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data.data;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
      state.status = "success";
    });
  },
});

export default jobSlice.reducer;
