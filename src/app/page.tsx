"use client";

import { useEffect, useState } from "react";
import App from "./Components/App";
import Register from "./Components/Register";
import { useGlobalContext, UserType } from "./GlobalContextProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import AppSkeleton from "./Components/AppSkeleton";

export default function Home() {
    const { userState, setUserState, setScreenSize, setOpenSection } =
        useGlobalContext();
    const isDomLoaded = typeof window !== "undefined";

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const getUserInfo = async () => {
                    setUserState((pre) => ({ ...pre, isLoading: true }));
                    try {
                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            setUserState((pre) => ({
                                ...pre,
                                user: JSON.parse(
                                    JSON.stringify(docSnap.data()),
                                ),
                            }));
                        } else {
                            setUserState((pre) => ({
                                ...pre,
                                error: "There is no user",
                            }));
                        }
                    } catch (error) {
                        setUserState((pre) => ({
                            ...pre,
                            error: JSON.stringify(error),
                        }));
                    } finally {
                        setUserState((pre) => ({ ...pre, isLoading: false }));
                    }
                };
                getUserInfo();
            } else {
                setUserState((pre) => ({ ...pre, user: {} as UserType }));
            }
        });

        const handleScreenSize = (e: UIEvent) => {
            setScreenSize(window.innerWidth);
        };

        const handlePopSate = (e: PopStateEvent) => {
            setOpenSection("left");
        };

        if (isDomLoaded) {
            window.addEventListener("resize", handleScreenSize);
            setScreenSize(window.innerWidth);
            window.addEventListener("popstate", handlePopSate);
        }

        return () => {
            unSub();
            if (isDomLoaded) {
                window.removeEventListener("resize", handleScreenSize);
                window.removeEventListener("popstate", handlePopSate);
            }
        };
    }, [setUserState, setScreenSize, setOpenSection]);

    const isAuthed = Boolean(userState?.user?.userId);

    if (userState.isLoading) {
        return <AppSkeleton />;
    }

    return <>{isAuthed ? <App /> : <Register />}</>;
}
