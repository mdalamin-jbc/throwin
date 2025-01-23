// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Router/Routes.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider
          router={Routes}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        />
      </AuthProvider>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
