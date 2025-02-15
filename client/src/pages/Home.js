import React, { useState, useEffect } from "react";
import PanelMenu from "../components/PanelMenu";
import { Routes, Route } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import BooksPage from "../components/BooksPage";
import LogoutIcon from "../components/LogoutIcon";

export default function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
            console.error("No JWT found");
            return;
        }

        // Fetch books with JWT in the headers
        fetch("http://localhost:8080/api/books/1", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                return response.json();
            })
            .then((data) => {
                // Append full URL to image paths
                const booksWithFullImageURL = data.map((book) => ({
                    ...book,
                    image: book.image ? `http://localhost:8080/covers/${book.image}` : null, 
                    
                }));
                setBooks(booksWithFullImageURL);
            })
            .catch((error) => console.error("Error fetching books:", error));
    }, []);

    const handleRatingUpdate = (bookId, newRating) => {
        const updated = books.map((book) =>
            book.editionId === bookId ? { ...book, rating: newRating } : book
        );
        setBooks(updated);

        const jwt = localStorage.getItem("jwt");

        fetch("http://localhost:8080/api/books/update/rating", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ editionId: bookId, rating: newRating }),
        }).catch((error) => console.error("Error updating rating:", error));
    };

    const handleStatusUpdate = (bookId, newStatus) => {
        const updated = books.map((book) =>
            book.editionId === bookId ? { ...book, status: newStatus } : book
        );
        setBooks(updated);

        const jwt = localStorage.getItem("jwt");

        fetch("http://localhost:8080/api/books/update/status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ editionId: bookId, status: newStatus }),
        }).catch((error) => console.error("Error updating status:", error));
    };

    const handleCurrentPageUpdate = (bookId, newPage) => {
        const updated = books.map((book) =>
            book.editionId === bookId ? { ...book, currentPage: newPage } : book
        );
        setBooks(updated);

        const jwt = localStorage.getItem("jwt");

        fetch("http://localhost:8080/api/books/update/page", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ editionId: bookId, currentPage: newPage }),
        }).catch((error) => console.error("Error updating page:", error));
    };

    const handleFavoritedUpdate = (bookId, newFavorited) => {
        const updated = books.map((book) =>
            book.editionId === bookId ? { ...book, favorited: newFavorited } : book
        );
        setBooks(updated);

        const jwt = localStorage.getItem("jwt");

        fetch("http://localhost:8080/api/books/update/favorited", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ editionId: bookId, favorited: newFavorited }),
        }).catch((error) => console.error("Error updating page:", error));
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the JWT from localStorage
        localStorage.removeItem("jwt");

        // Redirect to the login page
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen h-auto bg-gray-800 text-white px-10">
            {/* Left menu panel */}
            <PanelMenu />

            {/* Main content area */}
            <div className="flex-1 flex justify-center items-start p-5">
                <LogoutIcon onLogout={handleLogout} />
                <Routes>
                    <Route
                        path="/my-books"
                        element={
                            <BooksPage
                                books={books}
                                title="My Books"
                                onRatingUpdate={handleRatingUpdate}
                                onStatusUpdate={handleStatusUpdate}
                                onCurrentPageUpdate={handleCurrentPageUpdate}
                                onFavoritedUpdate={handleFavoritedUpdate}
                            />
                        }
                    />
                    <Route
                        path="/to-read"
                        element={
                            <BooksPage
                                books={books.filter((book) => book.status === "TO_READ")}
                                title="To-Read"
                                onRatingUpdate={handleRatingUpdate}
                                onStatusUpdate={handleStatusUpdate}
                                onCurrentPageUpdate={handleCurrentPageUpdate}
                                onFavoritedUpdate={handleFavoritedUpdate}
                            />
                        }
                    />
                    <Route
                        path="/currently-reading"
                        element={
                            <BooksPage
                                books={books.filter((book) => book.status === "READING")}
                                title="Currently Reading"
                                onRatingUpdate={handleRatingUpdate}
                                onStatusUpdate={handleStatusUpdate}
                                onCurrentPageUpdate={handleCurrentPageUpdate}
                                onFavoritedUpdate={handleFavoritedUpdate}
                            />
                        }
                    />
                    <Route
                        path="/read"
                        element={
                            <BooksPage
                                books={books.filter((book) => book.status === "READ")}
                                title="Read"
                                onRatingUpdate={handleRatingUpdate}
                                onStatusUpdate={handleStatusUpdate}
                                onCurrentPageUpdate={handleCurrentPageUpdate}
                                onFavoritedUpdate={handleFavoritedUpdate}
                            />
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <BooksPage
                                books={books.filter((book) => book.favorited)}
                                title="Favorites"
                                onRatingUpdate={handleRatingUpdate}
                                onStatusUpdate={handleStatusUpdate}
                                onCurrentPageUpdate={handleCurrentPageUpdate}
                                onFavoritedUpdate={handleFavoritedUpdate}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}