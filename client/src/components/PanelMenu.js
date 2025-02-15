import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.jpg';

export default function PanelMenu() {
    const menuItems = [
        { name: "My Books", path: "/my-books" },
        { name: "Read", path: "/read" },
        { name: "Currently Reading", path: "/currently-reading" },
        { name: "To-Read", path: "/to-read" },
        { name: "Favorites", path: "/favorites" },
    ];

    return (
        <div
            className="w-50 bg-gray-900 h-[600px] ml-5 fixed shadow-md  rounded-b-[100%] py-6"
        >
            <div className="flex items-center p-4 border-b border-gray-700">
                <img
                    src={logo ? logo : ""}
                    alt="logo icon"
                    className="w-12 h-12 object-cover mr-4"
                />
                <h2 className="text-3xl font-bold text-gray-100">
                    Bookur
                </h2>
            </div>
            <ul className="space-y-1 p-3">
                {menuItems.map(item => (
                    <li key={item.name}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `block p-3 rounded-lg ${
                                    isActive ? "bg-blue-900" : "hover:bg-gray-600 transition duration-200"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

