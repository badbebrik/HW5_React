import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { SidebarProvider } from "./context/SidebarContext";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SidebarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </SidebarProvider>
  </Provider>
);
