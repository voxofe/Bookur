import React, { useState } from "react";

export default function LogoutIcon({ onLogout }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="absolute top-4 right-10 flex flex-col items-end space-y-1 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onLogout}
        >
            {/* Logout Icon */}
            <div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-10 h-10 ${isHovered ? "text-red-500" : "text-gray-400"} transition-colors duration-200`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                </svg>

                {/* Tooltip (Appears on Hover) */}
                {isHovered && (
                    <div className="absolute top-0 right-8 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                        Logout
                    </div>
                )}
            </div>
        </div>
    );
}