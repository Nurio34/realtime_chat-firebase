import Image from "next/image";
import Actions from "./Actions";

function Header() {
    return (
        <div className="grid grid-cols-[0.1fr,1fr,auto] gap-x-[1vw] items-center">
            <figure className="relative aspect-square rounded-full overflow-hidden border border-base-content animate-pulse"></figure>
            <div className=" space-y-1">
                <p className="text-transparent w-max bg-base-content animate-pulse">
                    Janet Doe
                </p>
                <p className="text-transparent w-max bg-base-content animate-pulse">
                    Greatfull for every sunrise
                </p>
            </div>
            <Actions />
        </div>
    );
}

export default Header;
