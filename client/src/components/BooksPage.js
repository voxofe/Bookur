import React, { useState } from "react";
import BookGrid from "./BookGrid";

export default function BooksPage({ books, title, onRatingUpdate, onStatusUpdate, onCurrentPageUpdate, onFavoritedUpdate }) {
    const [sortCriteria, setSortCriteria] = useState("");

    const sortBooks = (books, criteria) => {
        const sortedBooks = [...books]; 
        switch (criteria) {
            case "title":
                return sortedBooks.sort((a, b) => a.editionTitle.localeCompare(b.editionTitle));
            case "author":
                return sortedBooks.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
            case "originalYear":
                return sortedBooks.sort((a, b) => a.bookOriginalYear - b.bookOriginalYear);
            case "rating":
                return sortedBooks.sort((a, b) => b.rating - a.rating); // Higher ratings first
            case "pages":
                return sortedBooks.sort((a, b) => a.pages - b.pages);
            case "editionLanguage":
                return sortedBooks.sort((a, b) => {
                    const primary = a.editionLanguage.localeCompare(b.editionLanguage);
                    if (primary !== 0) return primary; // Use the primary criterion
                    return a.editionCountry[1].localeCompare(b.editionCountry); // Secondary sort by title
                });
            
            case "originalLanguage":
                return sortedBooks.sort((a, b) => {
                    const primary = a.bookOriginalLanguage.localeCompare(b.bookOriginalLanguage);
                    if (primary !== 0) return primary; // Use the primary criterion
                    return a.bookCountry.localeCompare(b.bookCountry); // Secondary sort by title
                });
            default:
                return books; 
        }
    };

    const sortedBooks = sortBooks(books, sortCriteria);

    return (
        <div className="flex flex-col justify-center items-center w-[800px]">
            {/* Header Row */}
            <div className="w-full flex items-center justify-between mb-4">
                {/* Title */}
                <h1 className="text-xl font-bold text-gray-300">
                    {`${title} (${books.length} books)`}
                </h1>

                {/* Sorting Dropdown */}
                <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2 text-gray-300 font-semibold">
                        Sort by:
                    </label>
                    <select
                        id="sort"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                        className="p-2 border bg-gray-900 border-gray-100 rounded-md"
                    >
                        <option value="">None</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="author">Author (A-Z)</option>
                        <option value="originalYear">Original Year</option>
                        <option value="rating">Rating (High to Low)</option>
                        <option value="pages">Pages</option>
                        <option value="editionLanguage">Edition Language</option>
                        <option value="originalLanguage">Original Language</option>
                    </select>
                </div>
            </div>

            {books.length > 0 ? (
                <BookGrid
                    books={sortedBooks}
                    onRatingUpdate={onRatingUpdate}
                    onStatusUpdate={onStatusUpdate}
                    onCurrentPageUpdate={onCurrentPageUpdate}
                    onFavoritedUpdate={onFavoritedUpdate}
                />
            ) : (
                <p className="text-gray-400">No books available in this category.</p>
            )}
        </div>
    );
}
