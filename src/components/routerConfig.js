import App from "../App";
import { GitPage } from "../pages/gitPage";
import { SettingsPage } from "../pages/settings";

export const routerConfig = [
  { path: "/", name: "Home", component: <App /> },
  { path: "/settings", name: "Settings", component: <SettingsPage /> },
  { path: "/git", name: "git operations", component: <GitPage /> },
];
