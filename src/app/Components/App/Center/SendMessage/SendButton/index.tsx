import {
    ChatListItemType,
    ImageStateType,
    MessageStateType,
    useGlobalContext,
} from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { IoIosSend } from "react-icons/io";
import uploadAvatar from "@/app/lib/uploadAvatar";
import { useState } from "react";

function SendButton() {
    const {
        chatState,
        messageState,
        setMessageState,
        userState,
        imageState,
        setImageState,
        isBlocked,
    } = useGlobalContext();

    const [isSending, setIsSending] = useState<boolean>(false);

    const sendMessage = async () => {
        if (!imageState.imageUrl && !messageState?.message?.trim()) return;

        setIsSending(true);

        try {
            let imageUrl: any = "";

            if (imageState.imageFile) {
                imageUrl = await uploadAvatar(imageState?.imageFile);
            }

            await updateDoc(doc(db, "chats", chatState.chatId), {
                messages: arrayUnion({
                    ...messageState,
                    createdAt: new Date().toLocaleTimeString(),
                    senderId: userState.user.userId,
                    image: imageUrl,
                }),
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
                    currentChat.updatedAt = Date.now();
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
            setImageState({} as ImageStateType);
            setIsSending(false);
        }
    };

    return (
        <button
            type="button"
            className=" p-2 rounded-md btn  btn-square btn-primary disabled:bg-warning disabled:text-warning-content"
            aria-label="send message"
            disabled={isBlocked || isSending}
            onClick={sendMessage}
        >
            {isSending ? (
                <span className="loading loading-spinner loading-sm"></span>
            ) : (
                <IoIosSend size={28} />
            )}
        </button>
    );
}

export default SendButton;
