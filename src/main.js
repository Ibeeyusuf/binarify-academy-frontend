import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(_jsx(_Fragment, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
