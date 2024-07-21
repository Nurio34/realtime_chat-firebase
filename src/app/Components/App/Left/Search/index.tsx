import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import SearchButton from "./SearchButton";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Search() {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

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
                    <motion.form
                        className="py-[1vh] join flex"
                        initial={{ y: "-33%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-33%", opacity: 0 }}
                    >
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search User ..."
                            className="input input-sm bg-[rgba(255,255,255,0.3)] join-item grow"
                        />
                        <SearchButton />
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Search;
