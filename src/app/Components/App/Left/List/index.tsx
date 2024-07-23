import { useGlobalContext, UserType } from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export type ChatListItemType = {
    lastMessage: string;
    chatId: string;
    updatedAt: number;
    reciverId: string;
    isSeen: boolean;
    user: UserType;
};

function List() {
    const Div = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number>(0);
    const { userState, setChatState, chatState } = useGlobalContext();
    const [chats, setChats] = useState<ChatListItemType[]>(
        [] as ChatListItemType[],
    );
    chatState;

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
        if (FirstChatButton.current && !isClicked) {
            FirstChatButton.current.click();
            setIsClicked(true);
        }
    }, [chats, isClicked]);

    return (
        <div ref={Div} className="relative max-h-full  overflow-hidden ">
            <ul
                className="ListContainer absolute top-0 left-0 w-full overflow-y-auto"
                style={{ maxHeight: divHeight }}
            >
                {chats.map((chat, ind) => {
                    return (
                        <li
                            key={ind}
                            className={`rounded-md px-[1vw] ${
                                chat.isSeen
                                    ? ""
                                    : "bg-secondary/40 text-secondary-content"
                            }`}
                        >
                            <button
                                className="grid grid-cols-[2fr,4fr] items-center gap-[1vw] border-b border-base-content py-[2vh]"
                                ref={ind === 0 ? FirstChatButton : undefined}
                                onClick={async () => {
                                    // if (
                                    //     userState.user.blocks.includes(
                                    //         chat.reciverId,
                                    //     ) ||
                                    //     chat.user.blocks.includes(
                                    //         userState.user.userId,
                                    //     )
                                    // ) {
                                    //     setChatState({
                                    //         chatId: userState.user.userId,
                                    //         user: {
                                    //             userId: chat.user.userId,
                                    //         } as UserType,
                                    //         isBlocked: true,
                                    //     });

                                    //     return;
                                    // }

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
                                    }
                                }}
                            >
                                <figure className="relative aspect-square rounded-full overflow-hidden">
                                    <Image
                                        src={chat?.user?.avatar}
                                        fill
                                        alt={`avatar of ${chat?.user?.username}`}
                                        sizes="(min-width:768px) 20vw, 10vw"
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
