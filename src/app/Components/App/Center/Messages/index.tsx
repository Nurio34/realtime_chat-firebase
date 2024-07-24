import {
    MessageStateType,
    useGlobalContext,
} from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImBlocked } from "react-icons/im";
import "./index.css";

type ChatType = {
    createdAt: Timestamp;
    messages: MessageStateType[];
};

function Messages() {
    const { chatState, userState, isBlocked } = useGlobalContext();
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
    }, [chatState.chatId]);

    const Div = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number>(0);

    useEffect(() => {
        if (Div.current) {
            setDivHeight(Div.current.getBoundingClientRect().height);
        }
    }, []);

    const lastMessageRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat?.messages]);

    if (isBlocked) {
        return (
            <div className=" flex justify-center items-center">
                <ImBlocked size={192} color="red" />
            </div>
        );
    }

    return (
        <div ref={Div} className=" max-h-full">
            <ul
                className="scroll-transparent space-y-[2vh] border-y border-base-content overflow-y-auto py-[1vh]"
                style={{ height: divHeight }}
            >
                {chat?.messages?.map((message, ind) => {
                    const isMsgMine =
                        message.senderId === userState.user.userId
                            ? true
                            : false;
                    const msgTime =
                        message.createdAt.split(":")[0].length === 1
                            ? "0".concat(message.createdAt)
                            : message.createdAt;

                    return (
                        <li
                            key={ind}
                            className={`grid grid-cols-[0.1fr,0.9fr] gap-x-[1vw]`}
                            ref={
                                ind === chat.messages.length - 1
                                    ? lastMessageRef
                                    : null
                            }
                        >
                            {!isMsgMine ? (
                                <figure className="relative rounded-full overflow-hidden aspect-square self-end">
                                    <Image
                                        src={
                                            isMsgMine
                                                ? userState.user.avatar
                                                : chatState.user.avatar
                                        }
                                        fill
                                        alt={`avatar of${
                                            isMsgMine
                                                ? userState.user.username
                                                : chatState.user.username
                                        }`}
                                        sizes="(min-width:768px) 60vw, 30vw"
                                    />
                                </figure>
                            ) : (
                                <figure></figure>
                            )}
                            <div
                                className={` space-y-[1vh]
                                   grid 
                                `}
                            >
                                {message.image && (
                                    <figure
                                        className={`relative overflow-hidden rounded-lg w-2/4 aspect-video 
                                        ${
                                            isMsgMine
                                                ? "justify-self-end  "
                                                : "justify-self-start "
                                        }
                                    `}
                                    >
                                        <Image
                                            src={message.image}
                                            fill
                                            alt="image"
                                            className="object-contain"
                                            sizes="(min-width:768px) 60vw, 30vw"
                                        />
                                        {!message.message && (
                                            <span
                                                className={`text-xs absolute bottom-0 ${
                                                    message.senderId ===
                                                    userState.user.userId
                                                        ? "right-0 text-accent"
                                                        : "left-0 text-secondary"
                                                }`}
                                            >
                                                {msgTime.slice(0, 5)}
                                            </span>
                                        )}
                                    </figure>
                                )}
                                {message.message && (
                                    <p
                                        className={`bubble w-3/4 rounded-b-lg py-[1vh] px-[1vw] 
                                            grid
                                        ${
                                            isMsgMine
                                                ? "bubble-right text-accent-content bg-accent justify-self-end  "
                                                : "bubble-left text-secondary-content bg-secondary justify-self-start"
                                        }`}
                                    >
                                        {message.message}
                                        <span className="justify-self-end text-xs">
                                            {msgTime.slice(0, 5)}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Messages;
