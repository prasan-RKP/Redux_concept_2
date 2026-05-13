import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Login from "./Projects/Project1/Login";
import SignUp from "./Projects/Project1/SignUp";
import ProfilePage from "./Projects/Project1/ProfilePage";

import Todo from "./Projects/Project2/Todo";

import NoteDashboard from "./Projects/Project3/components/NoteDashboard";
import AddNote from "./Projects/Project3/components/AddNote";
import SeeNotes from "./Projects/Project3/components/SeeNotes";

import Form from "./java/Form";

import { checkAuth } from "../src/store/auth/authThunk.js";


// -------- Protected Route --------

const ProtectedRoute = ({ children }) => {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);

 // Prevent instant redirect to /signup during page refresh
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />

      <Route
        path="/note"
        element={
          <ProtectedRoute>
            <NoteDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-note"
        element={
          <ProtectedRoute>
            <AddNote />
          </ProtectedRoute>
        }
      />

      <Route
        path="/see-note"
        element={
          <ProtectedRoute>
            <SeeNotes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/practice"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;