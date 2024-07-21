import Image from "next/image";
import Actions from "./Actions";

function Header() {
    return (
        <div className="grid grid-cols-[1fr,2fr,2fr] gap-[1vw] items-center justify-between">
            <figure className="relative aspect-square rounded-full overflow-hidden border border-base-content animate-pulse"></figure>
            <p className="animate-pulse text-transparent bg-base-content">
                John Doe
            </p>
            <Actions />
        </div>
    );
}

export default Header;
