import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import SearchButton from "./SearchButton";
import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useGlobalContext, UserType } from "@/app/GlobalContextProvider";
import Image from "next/image";

function Search() {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [user, setUser] = useState<UserType>({} as UserType);
    const { userState } = useGlobalContext();

    const handleSearchUserFromDatabase = async (
        e: FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        try {
            const usersRef = collection(db, "users");

            // Create a query against the collection.
            const q = query(usersRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data() as UserType;
                setUser(userData);
            }
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    };

    useEffect(() => {
        if (!isSearchOpen) {
            setUser({} as UserType);
        }
    }, [isSearchOpen]);

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const chatsListRef = collection(db, "chatsList");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(chatsListRef, userState.user.userId), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    reciverId: user.userId,
                    updatedAt: Date.now(),
                }),
            });
            await updateDoc(doc(chatsListRef, user.userId), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    reciverId: userState.user.userId,
                    updatedAt: Date.now(),
                }),
            });
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    };

    return (
        <div>
            <div className="flex gap-[1vw] items-center">
                <div className="grow bg-[rgba(255,255,255,0.3)] py-1 px-[1vw] flex gap-[1vw] items-center rounded-md">
                    <CiSearch />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        className="grow bg-transparent outline-none"
                    />
                </div>
                <button
                    type="button"
                    aria-label="open search"
                    className="bg-[rgba(255,255,255,0.3)] rounded-md"
                    onClick={() => setIsSearchOpen((pre) => !pre)}
                >
                    <IoIosAdd size={28} />
                </button>
            </div>
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ y: "-33%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-33%", opacity: 0 }}
                    >
                        <form
                            className="py-[1vh] join flex"
                            onSubmit={handleSearchUserFromDatabase}
                        >
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search User ..."
                                className="input input-sm bg-[rgba(255,255,255,0.3)] join-item grow"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <SearchButton />
                        </form>
                        {Object.keys(user).length > 0 && (
                            <div className="grid grid-cols-[0.2fr,1fr,0.2fr] gap-[1vw] items-center">
                                <figure className="relative aspect-square rounded-full overflow-hidden ">
                                    <Image
                                        src={user?.avatar}
                                        fill
                                        alt={`avatar of ${user.username}`}
                                    />
                                </figure>
                                <p className="capitalize">{user.username}</p>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={handleAdd}
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Search;
