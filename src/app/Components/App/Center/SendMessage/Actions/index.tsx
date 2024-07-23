import { useGlobalContext } from "@/app/GlobalContextProvider";
import uploadAvatar from "@/app/lib/uploadAvatar";
import React, { useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";

function Actions() {
    const { isBlocked, setImageState } = useGlobalContext();
    const ImageFile = useRef<HTMLInputElement | null>(null);

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        const file = files[0];
        const fileUrl = URL.createObjectURL(file);
        setImageState({ imageFile: file, imageUrl: fileUrl });
    };

    return (
        <div className="flex gap-[1vw] items-center">
            <button
                type="button"
                aria-label="gallery"
                disabled={isBlocked}
                onKeyDown={(e) => {
                    if (e.code === "Space") ImageFile.current?.click();
                }}
            >
                <label htmlFor="imageFile">
                    <RiGalleryFill />
                    <input
                        ref={ImageFile}
                        type="file"
                        name="imageFil"
                        id="imageFile"
                        className="hidden"
                        onChange={handleImage}
                    />
                </label>
            </button>
            <button type="button" aria-label="picture" disabled={isBlocked}>
                <MdOutlinePhotoCamera />
            </button>
            <button type="button" aria-label="audio" disabled={isBlocked}>
                <FaMicrophone />
            </button>
        </div>
    );
}

export default Actions;
