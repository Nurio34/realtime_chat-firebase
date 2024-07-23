import { useGlobalContext } from "@/app/GlobalContextProvider";

function MessageInput() {
    const { chatState, setMessageState, userState, messageState, imageState } =
        useGlobalContext();

    return (
        <input
            type="text"
            name="message"
            id="message"
            placeholder={
                !chatState.chatId || chatState.isBlocked
                    ? "Chat is blocked"
                    : "Type a message"
            }
            className="py-2 px-[1vw] outline-none bg-[rgba(0,0,0,0.3)] rounded-md"
            disabled={chatState.isBlocked || !chatState?.chatId}
            onChange={(e) =>
                setMessageState((pre) => ({
                    ...pre,
                    createdAt: new Date().toLocaleTimeString(),
                    senderId: userState.user.userId,
                    message: e.target.value,
                }))
            }
            value={messageState?.message || ""}
        />
    );
}

export default MessageInput;
