import { configureStore } from "@reduxjs/toolkit";
import { fileSystemReducer } from "./counterSlice";
import { nodeSlice, nodeSliceReducer } from "./nodeSlice";

export const fileStore = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
    nodeSlice: nodeSliceReducer,
  },
});
