import React from "react";
import { useFormStatus } from "react-dom";

function SearchButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="btn btn-sm join-item btn-primary">
            {pending ? "Searching..." : "Search"}
        </button>
    );
}

export default SearchButton;
