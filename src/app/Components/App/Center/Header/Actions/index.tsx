import React from "react";
import { FaInfoCircle, FaPhoneAlt, FaVideo } from "react-icons/fa";

function Actions() {
    return (
        <div className="flex gap-[1vw] items-center">
            <button type="button">
                <FaPhoneAlt />
            </button>
            <button type="button">
                <FaVideo />
            </button>
            <button type="button">
                <FaInfoCircle />
            </button>
        </div>
    );
}

export default Actions;
