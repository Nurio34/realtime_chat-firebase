import Header from "./Header";
import List from "./List";
import Search from "./Search";

function Left() {
    return (
        <div
            className=" px-[2vw] py-[2vh] space-y-[2vh] border-r-2 border-base-content
                grid grid-rows-[auto,auto,1fr]
        "
        >
            <Header />
            <Search />
            <List />
        </div>
    );
}

export default Left;
