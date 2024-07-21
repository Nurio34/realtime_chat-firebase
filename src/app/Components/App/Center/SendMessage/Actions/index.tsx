import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";

function index() {
    return (
        <div className="flex gap-[1vw] items-center">
            <button type="button" aria-label="gallery">
                <RiGalleryFill />
            </button>
            <button type="button" aria-label="picture">
                <MdOutlinePhotoCamera />
            </button>
            <button type="button" aria-label="audio">
                <FaMicrophone />
            </button>
        </div>
    );
}

export default index;
