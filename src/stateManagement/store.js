import { configureStore } from "@reduxjs/toolkit";
import { fileSystemReducer } from "./counterSlice";

export const fileStore = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
  },
});
