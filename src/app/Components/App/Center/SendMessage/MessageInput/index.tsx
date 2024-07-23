import { useGlobalContext } from "@/app/GlobalContextProvider";
import Emoji from "../Emoji";

function MessageInput() {
    const { setMessageState, messageState, isBlocked, isSmallScreen } =
        useGlobalContext();

    return (
        <div className=" relative">
            <input
                type="text"
                name="message"
                id="message"
                placeholder={isBlocked ? "Chat is blocked" : "Type a message"}
                className="py-2 px-[1vw] outline-none bg-[rgba(0,0,0,0.3)] rounded-md w-full"
                disabled={isBlocked}
                onChange={(e) =>
                    setMessageState((pre) => ({
                        ...pre,
                        message: e.target.value,
                    }))
                }
                value={messageState?.message || ""}
            />
            {isSmallScreen && (
                <div
                    className={`absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2`}
                >
                    <Emoji />
                </div>
            )}
        </div>
    );
}

export default MessageInput;
