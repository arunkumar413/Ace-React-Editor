import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { SettingsPage } from "../pages/settings";
import { routerConfig } from "./routerConfig";

export function AppRouter() {
  const routeElements = routerConfig.map(function (item, index) {
    return (
      <Route
        key={index.toString()}
        path={item.path}
        element={item.component}
      />
    );
  });

  return <Routes>{routeElements}</Routes>;
}
