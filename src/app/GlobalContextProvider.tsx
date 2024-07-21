"use client";

import { User } from "firebase/auth";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type UserType = {
    userId: string;
    username: string;
    email: string;
    password: string;
    blocks: string[];
    avatar: string;
};

type UserStateType = {
    user: UserType;
    isLoading: boolean;
    error: string;
};

type ContextType = {
    userState: UserStateType;
    setUserState: Dispatch<SetStateAction<UserStateType>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

function GlobalContextProvider({ children }: Props) {
    const [userState, setUserState] = useState({} as UserStateType);

    return (
        <GlobalContext.Provider value={{ userState, setUserState }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("Error with 'GlobalContext'");
    }

    return context;
};

export default GlobalContextProvider;
