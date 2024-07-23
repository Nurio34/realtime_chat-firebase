import React from "react";
import Header from "./Header";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { useGlobalContext } from "@/app/GlobalContextProvider";

function Center() {
    const { isSmallScreen } = useGlobalContext();

    return (
        <div
            className={`grid grid-rows-[auto,1fr,auto] py-[2vh] px-[2vw] 
            ${
                isSmallScreen
                    ? ""
                    : "space-y-[2vh] border-r-2 border-base-content"
            }
        `}
        >
            <Header />
            <Messages />
            <SendMessage />
        </div>
    );
}

export default Center;
