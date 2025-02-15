import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Function to validate the JWT
const validateJWT = async () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) return false;

    try {
        const response = await fetch("http://localhost:8080/validate-token", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        return response.ok; // true if JWT is valid, false otherwise
    } catch (error) {
        console.error("Error validating JWT:", error);
        return false;
    }
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const checkJWT = async () => {
            const isValidJWT = await validateJWT();
            setIsValid(isValidJWT);

            if (!isValidJWT) {
                localStorage.removeItem("jwt"); // Clear invalid JWT
            }
        };

        checkJWT();
    }, []);

    if (isValid === null) {
        return <div>Loading...</div>; // Loading state
    }

    return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
