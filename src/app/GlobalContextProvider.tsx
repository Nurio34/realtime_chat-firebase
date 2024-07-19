"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type ContextType = {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

function GlobalContextProvider({ children }: Props) {
    const [user, setUser] = useState<any>({});
    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        console.log("Error with 'GlobalContext'");
        throw new Error("Error with 'GlobalContext'");
    }

    return context;
};

export default GlobalContextProvider;
