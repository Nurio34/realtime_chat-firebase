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
    createdAt: string;
    image: string;
};

export type ImageStateType = {
    imageUrl: string;
    imageFile: File;
};

export type OpenSectionType = "left" | "center" | "right";

type ContextType = {
    userState: UserStateType;
    setUserState: Dispatch<SetStateAction<UserStateType>>;
    chatState: ChatStateType;
    setChatState: Dispatch<SetStateAction<ChatStateType>>;
    messageState: MessageStateType;
    setMessageState: Dispatch<SetStateAction<MessageStateType>>;
    imageState: ImageStateType;
    setImageState: Dispatch<SetStateAction<ImageStateType>>;
    isBlocked: boolean;
    isMeBlocked: boolean;
    screenSize: number;
    setScreenSize: Dispatch<SetStateAction<number>>;
    isSmallScreen: boolean;
    openSection: OpenSectionType;
    setOpenSection: Dispatch<SetStateAction<OpenSectionType>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

function GlobalContextProvider({ children }: Props) {
    const [userState, setUserState] = useState({} as UserStateType);
    const [chatState, setChatState] = useState({} as ChatStateType);
    const [messageState, setMessageState] = useState({
        message: "",
    } as MessageStateType);
    const [imageState, setImageState] = useState({} as ImageStateType);
    const isBlocked = userState?.user?.blocks?.includes(
        chatState?.user?.userId,
    );
    const isMeBlocked = chatState?.user?.blocks?.includes(
        userState?.user?.userId,
    );
    const [screenSize, setScreenSize] = useState(0);
    const isSmallScreen = screenSize <= 768;

    const [openSection, setOpenSection] = useState<OpenSectionType>("left");

    return (
        <GlobalContext.Provider
            value={{
                userState,
                setUserState,
                chatState,
                setChatState,
                messageState,
                setMessageState,
                imageState,
                setImageState,
                isBlocked,
                isMeBlocked,
                screenSize,
                setScreenSize,
                openSection,
                setOpenSection,
                isSmallScreen,
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
