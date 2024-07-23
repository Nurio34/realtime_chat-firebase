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
    const { userState, setUserState } = useGlobalContext();

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

        return () => unSub();
    }, [setUserState]);

    const isAuthed = Boolean(userState?.user?.userId);

    if (userState.isLoading) {
        return <AppSkeleton />;
    }

    return <>{isAuthed ? <App /> : <Register />}</>;
}
