import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { ThemeProviderComponent } from "./components/ThemeProvider";
import "./index.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TrendingPage = lazy(() => import("./pages/TrendingPage"));
// const AboutPage = lazy(() => import("./pages/AboutPage"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderComponent>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flexGrow: 1 }}>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/:id" element={<ProfilePage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  {/* <Route path="/about" element={<AboutPage />} /> */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </QueryClientProvider>
      </ThemeProviderComponent>
    </BrowserRouter>
  </StrictMode>
);
