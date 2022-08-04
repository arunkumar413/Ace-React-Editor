import App from "../App";
import { SettingsPage } from "../pages/settings";

export const routerConfig = [
  {
    path: "/settings",
    name: "Settings",
    component: <SettingsPage />,
  },
  { path: "/", name: "Home", component: <App /> },
];
