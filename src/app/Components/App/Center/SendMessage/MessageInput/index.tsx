import { useGlobalContext } from "@/app/GlobalContextProvider";

function MessageInput() {
    const { chatState, setMessageState, userState, messageState } =
        useGlobalContext();

    return (
        <input
            type="text"
            name="message"
            id="message"
            placeholder={
                chatState.isBlocked ? "Chat is blocked" : "Type a message"
            }
            className="py-2 px-[1vw] outline-none bg-[rgba(0,0,0,0.3)] rounded-md"
            disabled={chatState.isBlocked}
            onChange={(e) =>
                setMessageState({
                    createdAt: new Date(),
                    senderId: userState.user.userId,
                    message: e.target.value,
                })
            }
            value={messageState.message || ""}
        />
    );
}

export default MessageInput;
