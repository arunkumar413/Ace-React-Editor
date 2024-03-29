import React, { StrictMode } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { createRoot } from "react-dom/client";
import { fileStore } from "./stateManagement/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AppRouter } from "./components/AppRouter";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={fileStore}>
      <BrowserRouter>
        <RecoilRoot>
          {/* <App /> */}
          <AppRouter />
        </RecoilRoot>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
