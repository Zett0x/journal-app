import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";

import { JournalScreen } from "../components/journal/JournalScreen";
import { LoadingScreen } from "../components/loading/LoadingScreen";

import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));

        dispatch(startLoadingNotes(user.uid));
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <AuthRouter />{" "}
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <JournalScreen />{" "}
            </PrivateRoute>
          }
        />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
