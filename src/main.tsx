import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { ThemeProviderComponent } from "./components/ThemeProvider";
import "./index.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <ProfilePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProviderComponent>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <div style={{ flexGrow: 1, height: "100%", width: "100%" }}>
          <Navbar />
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
          <Footer />
        </div>
      </QueryClientProvider>
    </ThemeProviderComponent>
  </StrictMode>
);
