import React, { useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/solid";

export default function ProgressTracker({ book, onCurrentPageUpdate }) {
	const [currentPage, setCurrentPage] = useState(book.currentPage || 0);
	const [isEditing, setIsEditing] = useState(false);
	const [editPage, setEditPage] = useState(currentPage);
	const editBoxRef = useRef(null);

	const handleEditClick = () => {
		setEditPage(currentPage); // Set the default value for editing
		setIsEditing((prev) => !prev); // Toggle the edit box
	};

	const handleInputChange = (e) => {
		const value = Math.max(0, Math.min(Number(e.target.value), book.pages)); // Between 0 and total pages
		setEditPage(value);
	};

	const handleUpdate = () => {
		setCurrentPage(editPage); // Update the current page
		if (onCurrentPageUpdate) {
			onCurrentPageUpdate(book.editionId, editPage);
		}
		setIsEditing(false); // Hide the edit box
	};

	const percentageRead = Math.min((currentPage / book.pages) * 100, 100).toFixed(0); 

	const handleClickOutside = (e) => {
		if (
			editBoxRef.current &&
			!editBoxRef.current.contains(e.target) &&
			!e.target.closest(".pencil-icon")
		) {
			setIsEditing(false); // Close the edit box if clicked outside
		}
	};

	useEffect(() => {
		if (isEditing) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isEditing]);

	return (
		<div className="pt-2 w-[180px] cursor-default">
			{/* Progress Bar */}
			<div className="relative h-6 bg-gray-700 rounded-lg overflow-hidden border border-yellow-500">
				<div
					className="absolute top-0 left-0 h-full bg-yellow-500"
					style={{ width: `${percentageRead}%` }}
				></div>
				<div className="absolute inset-0 flex justify-center items-center">
					<span className="text-white font-semibold text-sm">{percentageRead}%</span>
				</div>
			</div>

			{/* Current Page and Total Pages */}
			<div className="mt-2 flex justify-end gap-1 items-end">
				<p className="text-sm text-gray-300">
					<strong>{currentPage}</strong> / {book.pages} read
				</p>

				{/* Pencil Icon */}
				<PencilIcon
					className="pencil-icon w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-500 transition duration-200"
					onClick={handleEditClick}
				/>
			</div>

			{/* Edit Box */}
			{isEditing && (
				<div
					ref={editBoxRef}
					className="mt-2 p-2 bg-gray-700 border border-yellow-500 rounded-lg"
				>
					<p className="text-sm text-gray-300">Currently on page</p>
					<div className="flex items-center space-x-2 mt-2">
						<input
							type="number"
							value={editPage}
							onChange={handleInputChange}
							className="w-16 px-2 py-1 text-black rounded border border-gray-300"
						/>
						<button
							onClick={handleUpdate}
							className="px-4 py-1 bg-yellow-500 text-black font-semibold rounded"
						>
							Update
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
