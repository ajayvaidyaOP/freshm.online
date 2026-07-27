import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";

import "./index.css";
import App from "./App";
import theme from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";
import { BrandFonts } from "./brand/Brand";

// PWA service worker (from vite-plugin-pwa). The virtual module
// only exists after the plugin is installed — guarded so the app
// still runs in dev before you add it.
try {
  // eslint-disable-next-line import/no-unresolved
  import("virtual:pwa-register").then(({ registerSW }) => {
    registerSW({ immediate: true });
  });
} catch (_) { /* plugin not installed yet */ }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrandFonts />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
