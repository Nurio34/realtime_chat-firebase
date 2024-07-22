import { useGlobalContext, UserType } from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export type ChatListItemType = {
    lastMessage: string;
    chatId: string;
    updatedAt: Date;
    reciverId: string;
    isSeen: boolean;
    user: UserType;
};

function List() {
    const Div = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number>(0);
    const { userState, setChatState } = useGlobalContext();
    const [chats, setChats] = useState<ChatListItemType[]>(
        [] as ChatListItemType[],
    );
    console.log(chats);

    useEffect(() => {
        if (Div.current) {
            setDivHeight(Div.current.getBoundingClientRect().height);
        }

        const unSub = onSnapshot(
            doc(db, "chatsList", userState.user.userId),
            async (res) => {
                const chatsData = res.data();

                if (chatsData) {
                    const promises = chatsData?.chats?.map(
                        async (chatData: ChatListItemType) => {
                            const docRef = doc(db, "users", chatData.reciverId);
                            const docSnap = await getDoc(docRef);
                            const user = docSnap.data();
                            return { ...chatData, user };
                        },
                    );

                    const chatDataRes = await Promise.all(promises);
                    setChats(chatDataRes);
                }
            },
        );

        return () => unSub();
    }, [userState.user, setChats]);

    return (
        <div ref={Div} className="relative max-h-full  overflow-hidden ">
            <ul
                className=" absolute top-0 left-0 w-full overflow-y-auto"
                style={{ maxHeight: divHeight }}
            >
                {chats.map((chat, ind) => {
                    console.log(chat.updatedAt);

                    return (
                        <li key={ind}>
                            <button
                                className="w-full grid grid-cols-[1fr,4fr] items-center gap-[1vw] border-b border-base-content py-[2vh]"
                                onClick={() => {
                                    if (
                                        userState.user.blocks.includes(
                                            chat.reciverId,
                                        ) ||
                                        chat.user.blocks.includes(
                                            userState.user.userId,
                                        )
                                    ) {
                                        setChatState({
                                            chatId: "",
                                            user: {} as UserType,
                                            isBlocked: true,
                                        });
                                        return;
                                    }

                                    setChatState({
                                        chatId: chat.chatId,
                                        user: chat.user,
                                        isBlocked: false,
                                    });
                                }}
                            >
                                <figure className="relative aspect-square rounded-full overflow-hidden">
                                    <Image
                                        src={chat.user.avatar}
                                        fill
                                        alt={`avatar of ${chat.user.username}`}
                                    />
                                </figure>
                                <div>
                                    <p className="capitalize text-start">
                                        {chat.user.username}
                                    </p>
                                    <div>
                                        <p className="text-start">
                                            {chat.lastMessage}
                                        </p>
                                        <p>
                                            {new Date(
                                                chat.updatedAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default List;
