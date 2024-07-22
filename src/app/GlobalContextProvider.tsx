"use client";

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

export type ChatStateType = {
    chatId: string;
    user: UserType;
    isBlocked: boolean;
};

export type MessageStateType = {
    senderId: string;
    message: string;
    createdAt: Date;
};

type ContextType = {
    userState: UserStateType;
    setUserState: Dispatch<SetStateAction<UserStateType>>;
    chatState: ChatStateType;
    setChatState: Dispatch<SetStateAction<ChatStateType>>;
    messageState: MessageStateType;
    setMessageState: Dispatch<SetStateAction<MessageStateType>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

function GlobalContextProvider({ children }: Props) {
    const [userState, setUserState] = useState({} as UserStateType);
    const [chatState, setChatState] = useState({} as ChatStateType);
    const [messageState, setMessageState] = useState({} as MessageStateType);

    return (
        <GlobalContext.Provider
            value={{
                userState,
                setUserState,
                chatState,
                setChatState,
                messageState,
                setMessageState,
            }}
        >
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
