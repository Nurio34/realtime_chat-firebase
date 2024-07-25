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
import { AnimatePresence, motion } from "framer-motion";

type ChatTime = {
    chatStartDate: string;
    chatStartClock: string;
};

type ImageToSightState = {
    isInSight: boolean;
    image: string;
};

function Messages() {
    const { chatState, userState, isBlocked, isSmallScreen, imageState, chat } =
        useGlobalContext();
    const [chatStartTime, setChatStartTime] = useState<ChatTime>(
        {} as ChatTime,
    );

    const [imageToSight, setImageToSight] = useState<ImageToSightState>({
        isInSight: false,
        image: "",
    });

    useEffect(() => {
        if (chat.createdAt) {
            setChatStartTime({
                chatStartDate: chat.createdAt
                    .toString()
                    .split("T")[0]
                    .split("-")
                    .reduce(
                        (date, item, ind) => {
                            if (ind === 0) {
                                date[2] = item;
                            } else if (ind === 2) {
                                date[0] = item;
                            } else {
                                date[1] = item;
                            }
                            return date;
                        },
                        ["", "", ""] as string[],
                    )
                    .join("-"),
                chatStartClock: chat.createdAt
                    .toString()
                    .split("T")[1]
                    .split(":")
                    .filter((item, ind) =>
                        ind === 0 || ind === 1 ? item : null,
                    )
                    .join(":"),
            });
        }
    }, [chat]);

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
                className="relative scroll-transparent space-y-[2vh] border-y border-base-content overflow-y-auto py-[1vh]"
                style={{ height: divHeight }}
            >
                <div className="text-center flex justify-center ">
                    <p className="shadow-md shadow-base-content rounded-lg border-t border-base-content text-primary px-[2vw]">
                        Chat started at {chatStartTime.chatStartDate},{" "}
                        {chatStartTime.chatStartClock}
                    </p>
                </div>

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
                                        onClick={(e) => {
                                            setImageToSight({
                                                isInSight: true,
                                                image: message.image,
                                            });
                                        }}
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
                                        <AnimatePresence>
                                            {imageToSight.isInSight &&
                                                imageToSight.image ===
                                                    message.image && (
                                                    <div
                                                        className="bg-primary/50 fixed top-0 left-0 w-full h-full z-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setImageToSight({
                                                                image: "",
                                                                isInSight:
                                                                    false,
                                                            });
                                                        }}
                                                    >
                                                        <motion.figure
                                                            className={`fixed ${
                                                                isSmallScreen
                                                                    ? "w-3/4"
                                                                    : "w-1/4"
                                                            } aspect-square overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <Image
                                                                src={
                                                                    imageToSight.image
                                                                }
                                                                fill
                                                                alt="image"
                                                            />
                                                        </motion.figure>
                                                    </div>
                                                )}
                                        </AnimatePresence>
                                    </figure>
                                )}
                                {message.message && (
                                    <p
                                        className={`bubble w-3/4 rounded-b-lg py-[1vh] grid
                                            ${
                                                isSmallScreen
                                                    ? " px-[2vw]"
                                                    : " px-[1vw]"
                                            }
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
                {isSmallScreen && imageState.imageUrl && (
                    <figure className="sticky bottom-2 left-full animate-pulse w-1/2 aspect-square ">
                        <Image
                            src={imageState.imageUrl}
                            fill
                            alt={"image preview"}
                        />
                    </figure>
                )}
            </ul>
        </div>
    );
}

export default Messages;
