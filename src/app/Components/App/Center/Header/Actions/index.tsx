import { useGlobalContext } from "@/app/GlobalContextProvider";
import React from "react";
import { FaInfoCircle, FaPhoneAlt, FaVideo } from "react-icons/fa";

function Actions() {
    const { isBlocked, isSmallScreen } = useGlobalContext();

    return (
        <div
            className={`flex ${
                isSmallScreen ? "gap-x-[3vw]" : "gap-[1vw]"
            } items-center`}
        >
            <button type="button" aria-label="call" disabled={isBlocked}>
                <FaPhoneAlt />
            </button>
            <button type="button" aria-label="video" disabled={isBlocked}>
                <FaVideo />
            </button>
            <button type="button" aria-label="information" disabled={isBlocked}>
                <FaInfoCircle />
            </button>
        </div>
    );
}

export default Actions;
