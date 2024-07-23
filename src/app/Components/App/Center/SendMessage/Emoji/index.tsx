import { useGlobalContext } from "@/app/GlobalContextProvider";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function Emoji() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {
        isBlocked,
        setMessageState,
        userState,
        messageState,
        isSmallScreen,
    } = useGlobalContext();

    return (
        <div className={`${isSmallScreen ? "" : "relative"}`}>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                disabled={isBlocked}
            >
                🙂
            </button>
            {isOpen && (
                <div
                    className={`absolute bottom-0 right-0 ${
                        isSmallScreen
                            ? "translate-x-[16vw] -translate-y-[8vh]"
                            : ""
                    }`}
                >
                    <EmojiPicker
                        onEmojiClick={(e) => {
                            setMessageState((pre) => ({
                                createdAt: new Date().toLocaleTimeString(),
                                senderId: userState.user.userId,
                                message: pre.message + e.emoji,
                                image: messageState.image,
                            }));
                        }}
                    />
                    <button
                        type="button"
                        className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 btn btn-sm btn-circle"
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
