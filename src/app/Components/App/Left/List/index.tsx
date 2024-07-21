import { useGlobalContext } from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type ChatsType = any[];

function List() {
    const friends = 9;

    const Div = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number>(0);
    const { userState } = useGlobalContext();
    const [chats, setChats] = useState<ChatsType>([] as ChatsType);

    useEffect(() => {
        if (Div.current) {
            setDivHeight(Div.current.getBoundingClientRect().height);
        }

        const unSub = onSnapshot(
            doc(db, "chats", userState.user.userId),
            (doc) => {
                const res = doc.data();
                if (res) {
                    setChats(res.chats);
                }
            },
        );

        return () => unSub();
    }, [userState.user]);

    return (
        <div ref={Div} className="relative max-h-full  overflow-hidden ">
            <ul
                className=" absolute top-0 left-0 w-full overflow-y-auto"
                style={{ maxHeight: divHeight }}
            >
                {chats.map((_, ind) => {
                    return (
                        <li
                            key={ind}
                            className="grid grid-cols-[1fr,4fr] items-center gap-[1vw] border-b border-base-content py-[2vh]"
                        >
                            <figure className="relative aspect-square rounded-full overflow-hidden">
                                <Image src={"/wallpaper.jfif"} fill alt="img" />
                            </figure>
                            <div>
                                <p>John Doe</p>
                                <p>Feels good.</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default List;
