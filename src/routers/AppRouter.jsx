import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/" element={<JournalScreen />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
