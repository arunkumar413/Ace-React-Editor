import { createSlice } from "@reduxjs/toolkit";

export const fileSystemSlice = createSlice({
  name: "fileInfo",
  initialState: {},
  reducers: {
    setFileSystem: function (state, action) {
      state.fileSystem = action.payload;
    },
  },
});

export const fileSystemReducer = fileSystemSlice.reducer;

export const { setFileSystem } = fileSystemSlice.actions;
