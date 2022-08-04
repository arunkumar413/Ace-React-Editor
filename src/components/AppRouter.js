import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { SettingsPage } from "../pages/settings";
import { routerConfig } from "./routerConfig";

export function AppRouter() {
  const routeElements = routerConfig.map(function () {
    return <Route path="/settings" component={<SettingsPage />} />;
  });

  return <Routes>{routeElements}</Routes>;
}
