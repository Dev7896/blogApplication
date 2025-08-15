import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.jsx";

// pages
import Home from "./pages/Home.jsx";
import Admim from "./pages/Admin.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// blog cotext store
import BlogContext from "./context/blogContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BlogContext>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <Admim />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </BlogContext>
  </QueryClientProvider>
);
