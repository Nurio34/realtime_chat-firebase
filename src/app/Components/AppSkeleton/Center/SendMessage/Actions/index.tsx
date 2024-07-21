import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";

function index() {
    return (
        <div className="flex gap-[1vw] items-center">
            <button type="button">
                <RiGalleryFill />
            </button>
            <button type="button">
                <MdOutlinePhotoCamera />
            </button>
            <button type="button">
                <FaMicrophone />
            </button>
        </div>
    );
}

export default index;
