import React from "react";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { Routes, Route, Navigate } from "react-router-dom";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </div>
    </div>
  );
};
