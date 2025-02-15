import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to /authenticate
            const response = await fetch("http://localhost:8080/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            // Parse the response and extract the JWT
            const data = await response.json();
            const jwt = data.jwt;

            // Save the JWT to localStorage
            localStorage.setItem("jwt", jwt);

            // Redirect to the home page
            navigate("/");
        } catch (error) {
            setError("Invalid username or password");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
                <div className="flex items-center justify-start mb-6">
                    <img
                        src={logo}
                        alt="logo icon"
                        className="w-7 h-7 object-cover mr-3"
                    />
                    <h2 className="text-[23px] font-bold text-gray-100">
                        Sign in to your account
                    </h2>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 p-3 rounded-lg text-white font-semibold"
                    >
                        Sign in
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Not a member?{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Sign up here
                    </a>
                </p>
            </div>
        </div>
    );
}