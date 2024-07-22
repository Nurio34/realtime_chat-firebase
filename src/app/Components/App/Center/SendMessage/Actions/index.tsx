import { useGlobalContext } from "@/app/GlobalContextProvider";
import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";

function index() {
    const { chatState } = useGlobalContext();

    return (
        <div className="flex gap-[1vw] items-center">
            <button
                type="button"
                aria-label="gallery"
                disabled={chatState.isBlocked}
            >
                <RiGalleryFill />
            </button>
            <button
                type="button"
                aria-label="picture"
                disabled={chatState.isBlocked}
            >
                <MdOutlinePhotoCamera />
            </button>
            <button
                type="button"
                aria-label="audio"
                disabled={chatState.isBlocked}
            >
                <FaMicrophone />
            </button>
        </div>
    );
}

export default index;
