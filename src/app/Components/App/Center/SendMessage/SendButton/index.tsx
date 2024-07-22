import {
    MessageStateType,
    useGlobalContext,
} from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { IoIosSend } from "react-icons/io";
import { ChatListItemType } from "../../../Left/List";

function SendButton() {
    const { chatState, messageState, setMessageState, userState } =
        useGlobalContext();

    const sendMessage = async () => {
        if (messageState.message.trim() === "") return;

        try {
            await updateDoc(doc(db, "chats", chatState.chatId), {
                messages: arrayUnion(messageState),
            });

            const userIds = [userState.user.userId, chatState.user.userId];

            userIds.forEach(async (id) => {
                const chatsListRef = doc(db, "chatsList", id);
                const chatsListSnapshot = await getDoc(chatsListRef);

                if (chatsListSnapshot.exists()) {
                    const chatsListRes = chatsListSnapshot.data();

                    const chatsListData = chatsListRes.chats as Omit<
                        ChatListItemType,
                        "user"
                    >[];

                    const currentChat = chatsListData.filter(
                        (chatListItem) =>
                            chatListItem.chatId === chatState.chatId,
                    )[0];
                    currentChat.isSeen =
                        id === userState.user.userId ? true : false;
                    currentChat.updatedAt = new Date();
                    currentChat.lastMessage = messageState.message;

                    await updateDoc(chatsListRef, {
                        chats: chatsListData.map((chatList) =>
                            chatList.chatId === chatState.chatId
                                ? currentChat
                                : chatList,
                        ),
                    });
                }
            });
        } catch (error) {
            throw new Error(JSON.stringify(error));
        } finally {
            setMessageState({} as MessageStateType);
        }
    };

    return (
        <button
            type="button"
            className="bg-[rgba(86,197,88,0.3)] p-2 rounded-md btn aspect-square"
            aria-label="send message"
            disabled={chatState.isBlocked}
            onClick={sendMessage}
        >
            <IoIosSend size={20} />
        </button>
    );
}

export default SendButton;
