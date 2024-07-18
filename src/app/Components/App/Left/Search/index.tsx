import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";

function Search() {
    return (
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
                className="bg-[rgba(255,255,255,0.3)] rounded-md"
            >
                <IoIosAdd size={28} />
            </button>
        </div>
    );
}

export default Search;
