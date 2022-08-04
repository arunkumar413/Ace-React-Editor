import { createSlice } from "@reduxjs/toolkit";

export const nodeSlice = createSlice({
  name: "nodeSlice",
  initialState: {},
  reducers: {
    setCurrentNode: function (state, action) {
      state.currentNode = action.payload;
    },
    setFileContent: function (state, action) {
      state.fileContent = action.payload;
    },
  },
});

export const nodeSliceReducer = nodeSlice.reducer;

export const { setCurrentNode, setFileContent } = nodeSlice.actions;
