"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
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

export type ChatListItemType = {
    lastMessage: string;
    chatId: string;
    updatedAt: number;
    reciverId: string;
    isSeen: boolean;
    user: UserType;
};

export type ChatType = {
    createdAt: Date;
    messages: MessageStateType[];
};

export type RegisterationType = "hero" | "register";

type ContextType = {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
    userState: UserStateType;
    setUserState: Dispatch<SetStateAction<UserStateType>>;
    chatState: ChatStateType;
    setChatState: Dispatch<SetStateAction<ChatStateType>>;
    messageState: MessageStateType;
    setMessageState: Dispatch<SetStateAction<MessageStateType>>;
    imageState: ImageStateType;
    setImageState: Dispatch<SetStateAction<ImageStateType>>;
    isMeBlocked: boolean;
    isHimBlocked: Boolean;
    isBlocked: boolean;
    screenSize: number;
    setScreenSize: Dispatch<SetStateAction<number>>;
    isSmallScreen: boolean;
    openSection: OpenSectionType;
    setOpenSection: Dispatch<SetStateAction<OpenSectionType>>;
    chats: ChatListItemType[];
    setChats: Dispatch<SetStateAction<ChatListItemType[]>>;
    filteredChats: ChatListItemType[];
    setFilteredChats: Dispatch<SetStateAction<ChatListItemType[]>>;
    chat: ChatType;
    setChat: Dispatch<SetStateAction<ChatType>>;
    registerOpenSection: RegisterationType;
    setRegisterOpenSection: Dispatch<SetStateAction<RegisterationType>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

function GlobalContextProvider({ children }: Props) {
    const [theme, setTheme] = useState<string>("");

    const [userState, setUserState] = useState({} as UserStateType);
    const [chatState, setChatState] = useState({} as ChatStateType);
    const [messageState, setMessageState] = useState({
        message: "",
    } as MessageStateType);
    const [imageState, setImageState] = useState({} as ImageStateType);
    const isMeBlocked = chatState?.user?.blocks?.includes(
        userState?.user?.userId,
    );
    const isHimBlocked = userState?.user?.blocks?.includes(
        chatState?.user?.userId,
    );
    const isBlocked = isHimBlocked || isMeBlocked;
    const [screenSize, setScreenSize] = useState(0);
    const isSmallScreen = screenSize <= 768;

    const [openSection, setOpenSection] = useState<OpenSectionType>("left");

    const [chats, setChats] = useState<ChatListItemType[]>(
        [] as ChatListItemType[],
    );
    const [filteredChats, setFilteredChats] = useState<ChatListItemType[]>(
        [] as ChatListItemType[],
    );
    useEffect(() => {
        setFilteredChats(chats);
    }, [chats, setFilteredChats]);

    const [chat, setChat] = useState<ChatType>({} as ChatType);

    const [registerOpenSection, setRegisterOpenSection] =
        useState<RegisterationType>("hero");

    return (
        <GlobalContext.Provider
            value={{
                theme,
                setTheme,
                userState,
                setUserState,
                chatState,
                setChatState,
                messageState,
                setMessageState,
                imageState,
                setImageState,
                isMeBlocked,
                isHimBlocked,
                isBlocked,
                screenSize,
                setScreenSize,
                openSection,
                setOpenSection,
                isSmallScreen,
                chats,
                setChats,
                filteredChats,
                chat,
                setChat,
                setFilteredChats,
                registerOpenSection,
                setRegisterOpenSection,
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
