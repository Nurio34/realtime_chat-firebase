import Left from "./Left";
import Center from "./Center";
import Right from "./Right";
import { useEffect, useRef, useState } from "react";
import { lightThemes } from "@/app/utilities/daisyui_lightThemes";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import {
    ChatType,
    useGlobalContext,
    UserType,
} from "@/app/GlobalContextProvider";

function App() {
    const {
        userState,
        setUserState,
        openSection,
        isSmallScreen,
        chatState,
        setChat,
        theme,
    } = useGlobalContext();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const Audio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "users", userState.user.userId),
            async (res) => {
                if (res) {
                    const userData = res.data() as UserType;

                    setUserState((pre) => ({ ...pre, user: userData }));
                }
            },
        );

        return () => unSub();
    }, [setUserState, userState.user.userId]);

    useEffect(() => {
        if (chatState.chatId) {
            const unSub = onSnapshot(
                doc(db, "chats", chatState.chatId),
                (res) => {
                    const chatData = res.data() as ChatType | undefined;

                    if (chatData) {
                        console.log({ chatData });
                        setChat(chatData);
                        setIsPlaying((pre) => (pre = true));
                    }

                    if (Audio.current) {
                        if (isPlaying) {
                            Audio.current.play();
                            setIsPlaying((pre) => (pre = false));
                        } else {
                            Audio.current.pause();
                        }
                    }
                },
            );

            return () => unSub();
        }
    }, [chatState.chatId]);

    return (
        <main
            className={`
              grid overflow-hidden ${
                  isSmallScreen
                      ? "w-screen h-screen overflow-hidden"
                      : "grid-cols-[1fr,2fr,1fr] w-[90vw] h-[90vh] rounded-[5vw]"
              }
              ${
                  lightThemes.includes(theme)
                      ? "bg-[rgba(255,255,255,0.4)]"
                      : "bg-[rgba(0,0,0,0.6)]"
              }
            `}
        >
            <audio
                ref={Audio}
                src="/notification.mp3"
                controls
                className="absolute hidden"
            />

            {isSmallScreen ? (
                <>
                    {openSection === "left" && <Left />}
                    {openSection === "center" && <Center />}
                    {openSection === "right" && <Right />}
                </>
            ) : (
                <>
                    <Left />
                    <Center />
                    <Right />
                </>
            )}
        </main>
    );
}

export default App;
