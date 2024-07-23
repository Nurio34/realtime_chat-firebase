import Left from "./Left";
import Center from "./Center";
import Right from "./Right";
import { useEffect, useState } from "react";
import { lightThemes } from "@/app/utilities/daisyui_lightThemes";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useGlobalContext, UserType } from "@/app/GlobalContextProvider";

function App() {
    const [theme, setTheme] = useState<string>("");
    const { userState, setUserState, openSection, isSmallScreen } =
        useGlobalContext();

    useEffect(() => {
        const html = document.querySelector("html");

        const htmlTheme = html?.dataset.theme;

        if (htmlTheme) {
            setTheme(htmlTheme);
        }

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

    return (
        <main
            className={`
              grid ${
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
