import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LoginDetailsProvider } from "./ContextApp";
import AdminAppRouter from "./AdminAppRouter";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginDetailsProvider>
      <AdminAppRouter/>
    </LoginDetailsProvider>
  </StrictMode>
);
