import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

// ProtectedRoute component to check for JWT
const ProtectedRoute = ({ children }) => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
        // Redirect to login if no JWT is found
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}