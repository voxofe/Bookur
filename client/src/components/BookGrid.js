import React from "react";
import BookCard from "./BookCard";

export default function BookGrid({ books, onRatingUpdate, onStatusUpdate, onCurrentPageUpdate, onFavoritedUpdate }) {

    const randomizeOrder = (array) => {
        return array.sort(() => Math.random() - 0.5); 
    };

    return (
        <div className="grid grid-cols-1 grid-flow-row-dense gap-y-3 w-full ">
            {books.map((book) => (
                <BookCard  
                    key={book.editionId}
                    book={book}
                    onRatingUpdate={onRatingUpdate}
                    onStatusUpdate={onStatusUpdate}
                    onCurrentPageUpdate={onCurrentPageUpdate}
                    onFavoritedUpdate={onFavoritedUpdate}
                />
            ))}
        </div>
    );
}
