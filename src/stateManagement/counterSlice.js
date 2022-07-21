import { createSlice } from "@reduxjs/toolkit";

export const fileSystemSlice = createSlice({
  name: "fileInfo",
  initialState: {
    fileSystem: null,
  },
  reducers: {
    getFileSystem: async function (state) {
      let res = await fetch("http://localhost:5000/getdirtree");

      let data = await res.json();
      state.fileSystem = data;
    },
  },
});

export const fileSystemReducer = fileSystemSlice.reducer;

export const { getFileSystem } = fileSystemSlice.actions;
