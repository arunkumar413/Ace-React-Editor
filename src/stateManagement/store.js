import { configureStore } from "@reduxjs/toolkit";
import { fileSystemReducer } from "./counterSlice";
import { findSliceReducer } from "./findSlice";
import { gitSliceReducer } from "./gitSlice";
import { nodeSlice, nodeSliceReducer } from "./nodeSlice";

export const fileStore = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
    nodeSlice: nodeSliceReducer,
    findSlice: findSliceReducer,
    gitSlice: gitSliceReducer,
  },
});
