import React from "react";

export default function ReadHistory({ book }) {

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const formatter = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        return isoDate ? formatter.format(date): "";
    }

    return (
        <div className="flex flex-col text-nowrap mt-4 w-full">
            <p className="text-[14px] text-gray-300">
                <span>Started:</span> {formatDate(book.startDate) || "N/A"}
            </p>
            <p className="text-[14px] text-gray-300">
                <span>Finished:</span> {formatDate(book.finishDate) || "N/A"}
            </p>
        </div>
    );
}
