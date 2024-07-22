import {
    MessageStateType,
    useGlobalContext,
} from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImBlocked } from "react-icons/im";

type ChatType = {
    createdAt: Timestamp;
    messages: MessageStateType[];
};

function Messages() {
    const { chatState } = useGlobalContext();
    const [chat, setChat] = useState<ChatType>({} as ChatType);

    useEffect(() => {
        if (chatState.chatId) {
            const unSub = onSnapshot(
                doc(db, "chats", chatState.chatId),
                (res) => {
                    const chatData = res.data() as ChatType | undefined;

                    if (chatData) {
                        setChat(chatData);
                    }
                },
            );

            return () => unSub();
        }
    }, [chatState.chatId, setChat]);

    if (chatState.isBlocked) {
        return (
            <div className=" flex justify-center items-center">
                <ImBlocked size={192} color="red" />
            </div>
        );
    }

    return <div>Messages</div>;
}

export default Messages;
