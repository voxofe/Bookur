import React, { useState, useRef, useEffect } from "react";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/outline";
import { BookOpenIcon, ClockIcon, CheckCircleIcon, StarIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import ProgressTracker from "./ProgressTracker";
import ReadHistory from "./ReadHistory";
import { languageFlags } from "../utils/flags";

export default function BookCard({ book, onRatingUpdate, onStatusUpdate, onCurrentPageUpdate, onFavoritedUpdate }) {
    const [rating, setRating] = useState(book.rating);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [status, setStatus] = useState(book.status);
    const [showStatusOptions, setShowStatusOptions] = useState(false);
    const [isFavorited, setIsFavorited] = useState(book.favorited);
    const [isHovered, setIsHovered] = useState(false);

    // Ref for the drawer
    const drawerRef = useRef(null);

    // Handle clicks outside the drawer
    const handleClickOutside = (e) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target)) {
            setShowStatusOptions(false); // Close the drawer
        }
    };

    // Add event listener when the drawer is open
    useEffect(() => {
        if (showStatusOptions) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showStatusOptions]);

    const handleMouseEnter = (index) => {
        setHoveredRating(index);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (index) => {
        setRating(index);
        if (onRatingUpdate) {
            onRatingUpdate(book.editionId, index);
        }
    };

    const handleStatusClick = (newStatus) => {
        setStatus(newStatus);
        if (onStatusUpdate) {
            onStatusUpdate(book.editionId, newStatus);
        }
        setShowStatusOptions(false); // Hide options after selection
    };

    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited); // Toggle favorite state
        if (onFavoritedUpdate) {
            onFavoritedUpdate(book.editionId, !isFavorited);
        }
    };

    const statusIcons = [
        { state: "READ", icon: CheckCircleIcon, color: "text-green-500", borderColor: "border-green-500", hoverColor: "hover:text-green-400", hoverMessage: "Read" },
        { state: "READING", icon: BookOpenIcon, color: "text-yellow-500", borderColor: "border-yellow-500", hoverColor: "hover:text-yellow-400", hoverMessage: "Currently Reading" },
        { state: "TO_READ", icon: ClockIcon, color: "text-pink-500", borderColor: "border-pink-500", hoverColor: "hover:text-pink-400", hoverMessage: "To-Read" },
    ];

    const activeStatus = statusIcons.find((item) => item.state === status);

    return (
        <div
            className={`relative h-[210px] flex flex-row justify-start w-full bg-gray-700 shadow-md rounded-lg overflow-hidden border-2 border-gray-900`}
        >
            {/* Status Icon with Drawer */}
            <div
                className="absolute top-3 right-3 flex flex-col items-end space-y-1 cursor-pointer group"
                onClick={() => setShowStatusOptions(!showStatusOptions)} // Toggle drawer on click
            >
                {/* Active Status Icon and Label */}
                <div className="flex flex-row items-center space-x-2">
                    <span className="text-gray-200 mr-0">{activeStatus.hoverMessage}</span>
                    <activeStatus.icon className={`w-6 h-6 ${activeStatus.color}`} />
                </div>

                {/* Progress Tracker */}
                {status === "READING" && (
                    <div
                        className=" "
                        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the parent
                    >
                        <ProgressTracker book={book} onCurrentPageUpdate={onCurrentPageUpdate} />
                    </div>
                )}

                {/* Status Options (Drawer) */}
                {showStatusOptions && (
                    <div
                        ref={drawerRef} // Attach the ref to the drawer
                        className="absolute top-8 right-0 bg-gray-800 shadow-lg rounded-lg p-2 flex flex-col space-y-2"
                        style={{ zIndex: 10 }}
                    >
                        {statusIcons.map(({ state, icon: Icon, color, hoverMessage }) => (
                            <div
                                key={state}
                                className={`flex items-center space-x-2 px-2 py-1 cursor-pointer rounded-lg hover:bg-gray-700 ${state === status ? "bg-gray-700" : ""}`}
                                onClick={() => handleStatusClick(state)}
                            >
                                <Icon className={`w-5 h-5 ${color}`} />
                                <span className="text-gray-200 text-nowrap">{hoverMessage}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Left Section - Image */}
            <div className="">
                <img
                    src={book.image || "https://via.placeholder.com/150"}
                    alt={`${book.editionTitle} cover`}
                    className="w-full h-full object-fill"
                />
            </div>

            {/* Right Section - Book Details */}
            <div className="mx-4 my-2 ">
                {/* Title and Heart Icon */}
                <div className="flex items-center gap-x-2">
                    <h2 className="text-[18px] font-bold text-gray-100">{book.editionTitle}</h2>
                    <div
                        className="cursor-pointer"
                        onClick={handleFavoriteClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isFavorited ? (
                            <HeartSolidIcon
                                className={`w-6 h-6 transition-colors duration-200 ${isHovered ? "text-gray-400" : "text-red-500"
                                    }`}
                            />
                        ) : (
                            <HeartOutlineIcon
                                className={`w-6 h-6 transition-colors duration-200 ${isHovered ? "text-red-500" : "text-gray-400"
                                    }`}
                            />
                        )}
                    </div>
                </div>

                <p className="text-[16px] text-gray-400 mb-3">{book.bookAuthor}</p>
                <ul className="text-[14px] text-gray-300 space-y-1">
                    <li className="flex items-center my-4">
                        <span className=""><strong>{book.pages}</strong> pages • </span>&nbsp;
                        <strong className="flex items-center">
                            {book.editionLanguage}
                            {languageFlags[book.editionCountry] && (
                                <img
                                    src={languageFlags[book.editionCountry]}
                                    alt={`${book.editionCountry} flag`}
                                    className="w-5 h-5 ml-1"
                                />
                            )}
                        </strong>
                    </li>

                    <li>
                        First published <strong>{book.bookOriginalYear}</strong>
                    </li>

                    <li className="flex items-center">
                        <span className="">Original Language: </span>&nbsp;
                        <strong className="flex items-center">
                            {book.bookOriginalLanguage}
                            {languageFlags[book.bookCountry] && (
                                <img
                                    src={languageFlags[book.bookCountry]}
                                    alt={`${book.bookCountry} flag`}
                                    className="w-6 h-5 ml-1"
                                />
                            )}
                        </strong>
                    </li>
                </ul>

                {/* Rating Stars */}
                <div className="mt-4 flex items-center">
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <StarIcon
                                key={index}
                                className={`w-6 h-6 m-0 p-0 cursor-pointer transition duration-200 ${(hoveredRating || rating) > index ? "text-yellow-500" : "text-gray-500"
                                    }`}
                                onMouseEnter={() => handleMouseEnter(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(index + 1)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}