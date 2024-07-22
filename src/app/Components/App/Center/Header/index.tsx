import Image from "next/image";
import Actions from "./Actions";
import { useGlobalContext } from "@/app/GlobalContextProvider";

function Header() {
    const { chatState } = useGlobalContext();

    return (
        <div className="grid grid-cols-[0.1fr,1fr,auto] gap-x-[1vw] items-center">
            <figure className="relative aspect-square rounded-full overflow-hidden">
                <Image
                    src={chatState?.user?.avatar || "/block.webp"}
                    fill
                    alt="img"
                />
            </figure>
            <div>
                <p className="capitalize">
                    {chatState?.user?.username || "Block"}
                </p>
                <p
                    className={`${
                        chatState?.isBlocked ? "text-error font-semibold" : ""
                    }`}
                >
                    {chatState?.isBlocked
                        ? "There is block between users"
                        : "Greatfull for every sunrise"}
                </p>
            </div>
            <Actions />
        </div>
    );
}

export default Header;
