import { createSlice } from "@reduxjs/toolkit";

export const gitSlice = createSlice({
  name: "gitSlice",
  initialState: {},
  reducers: {
    setGitDirLocation: function (state, action) {
      state.dirLocation = action.payload;
    },
    setGitCloneLink: function (state, action) {
      state.gitCloneLink = action.payload;
    },
    setCommitHistory: function (state, action) {
      state.commitHistory = action.payload;
    },
    setValue: function (state, action) {
      state.value = 6;
    },
  },
});

export const gitSliceReducer = gitSlice.reducer;
export const {
  setGitDirLocation,
  setGitCloneLink,
  setValue,
  setCommitHistory,
} = gitSlice.actions;
export const commitHistory = (state) => state.gitSlice.commitHistory;
export const val = (state) => state.getSlice.value;
