import { createSlice } from "@reduxjs/toolkit";

export const findSlice = createSlice({
  name: "findSlice",
  initialState: {},
  reducers: {
    setFindTerm: function (state, action) {
      state.findTerm = action.payload;
    },
    setShowSearchInput: function (state, action) {
      state.showSearchInput = state.showSearchInput === true ? false : true;
    },
  },
});

export const findSliceReducer = findSlice.reducer;

export const { setFindTerm, setShowSearchInput } = findSlice.actions;
