import {
    ChatListItemType,
    useGlobalContext,
    UserType,
} from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function List() {
    const Div = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number>(0);
    const {
        userState,
        setChatState,
        setChats,
        chats,
        filteredChats,
        setOpenSection,
        screenSize,
        isSmallScreen,
    } = useGlobalContext();

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

    const Div2 = useRef<HTMLDivElement | null>(null);
    const [divWidth, setDivWidth] = useState<number>(0);
    useEffect(() => {
        if (Div2.current) {
            setDivWidth(Div2.current.getBoundingClientRect().width);
        }
    }, []);

    const FirstChatButton = useRef<HTMLButtonElement | null>(null);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    useEffect(() => {
        if (FirstChatButton.current && !isClicked && !isSmallScreen) {
            FirstChatButton.current.click();
            setIsClicked(true);
        }
    }, [chats, filteredChats, isClicked]);

    return (
        <div ref={Div} className="relative max-h-full  overflow-hidden ">
            <ul
                className="ListContainer absolute top-0 left-0 w-full overflow-y-auto"
                style={{ maxHeight: divHeight }}
            >
                {filteredChats.map((chat, ind) => {
                    return (
                        <li
                            key={ind}
                            className={`rounded-md px-[1vw] max-w-96 mx-auto ${
                                chat.isSeen
                                    ? ""
                                    : "bg-secondary/40 text-secondary-content"
                            }`}
                        >
                            <button
                                className={`w-full grid items-center border-b border-base-content py-[2vh]
                                     ${
                                         isSmallScreen
                                             ? "grid-cols-[1fr,5fr] gap-[4vw]"
                                             : "grid-cols-[2fr,4fr] gap-[1vw]"
                                     }`}
                                ref={ind === 0 ? FirstChatButton : undefined}
                                onClick={async () => {
                                    setChatState({
                                        chatId: chat.chatId,
                                        user: chat.user,
                                        isBlocked: false,
                                    });

                                    const chatsListRef = doc(
                                        db,
                                        "chatsList",
                                        userState.user.userId,
                                    );
                                    const chatsListSnapshot = await getDoc(
                                        chatsListRef,
                                    );
                                    if (chatsListSnapshot.exists()) {
                                        const chatsListRes =
                                            chatsListSnapshot.data();

                                        const chatsListData =
                                            chatsListRes.chats as Omit<
                                                ChatListItemType,
                                                "user"
                                            >[];

                                        const currentChat =
                                            chatsListData.filter(
                                                (chatListItem) =>
                                                    chatListItem.chatId ===
                                                    chat.chatId,
                                            )[0];
                                        currentChat.isSeen = true;

                                        await updateDoc(chatsListRef, {
                                            chats: chatsListData.map(
                                                (chatList) =>
                                                    chatList.chatId ===
                                                    chat.chatId
                                                        ? currentChat
                                                        : chatList,
                                            ),
                                        });

                                        setOpenSection("center");
                                    }
                                }}
                            >
                                <figure className="relative aspect-square rounded-full overflow-hidden">
                                    <Image
                                        src={chat?.user?.avatar}
                                        fill
                                        alt={`avatar of ${chat?.user?.username}`}
                                        sizes="(min-width:768px) 60vw, 30vw"
                                    />
                                </figure>
                                <div>
                                    <p className="capitalize text-start text-lg font-bold">
                                        {chat?.user?.username}
                                    </p>
                                    <div>
                                        <div
                                            ref={ind === 0 ? Div2 : null}
                                            className="min-w-full"
                                        >
                                            <p
                                                className="text-start truncate text-sm"
                                                style={{ width: divWidth }}
                                            >
                                                {chat?.lastMessage}
                                            </p>
                                        </div>
                                        <p className="text-end text-sm font-light">
                                            {new Date(
                                                chat?.updatedAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </li>
                    );
                })}

                {divWidth <= 0 && (
                    <li>
                        <button className="w-full grid grid-cols-[2fr,4fr] items-center gap-[1vw] ">
                            <figure className="relative aspect-square rounded-full overflow-hidden"></figure>
                            <div ref={Div2}></div>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default List;
