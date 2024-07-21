import React from "react";
import { FaInfoCircle, FaPhoneAlt, FaVideo } from "react-icons/fa";

function Actions() {
    return (
        <div className="flex gap-[1vw] items-center">
            <button type="button" aria-label="call">
                <FaPhoneAlt />
            </button>
            <button type="button" aria-label="video">
                <FaVideo />
            </button>
            <button type="button" aria-label="information">
                <FaInfoCircle />
            </button>
        </div>
    );
}

export default Actions;
