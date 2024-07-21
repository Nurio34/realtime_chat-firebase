import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function Emoji() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative">
            <button type="button" onClick={() => setIsOpen(true)}>
                🙂
            </button>
            {isOpen && (
                <div className=" absolute bottom-0 right-0">
                    <EmojiPicker />
                    <button
                        type="button"
                        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 btn btn-sm btn-circle"
                        onClick={() => setIsOpen(false)}
                    >
                        x
                    </button>
                </div>
            )}
        </div>
    );
}

export default Emoji;
