import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Login } from "./screens/Auth/Login";
import { SignUp } from "./screens/Auth/SignUp";
import { useAuthStore } from "./lib/auth";
import { useEffect } from "react";

export const App = () => {
  const { isAuthenticated, setLastRoute } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      setLastRoute(location.pathname);
    }
  }, [location, setLastRoute]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};