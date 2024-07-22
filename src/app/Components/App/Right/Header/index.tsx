import { useGlobalContext } from "@/app/GlobalContextProvider";
import Image from "next/image";

function Header() {
    const { chatState } = useGlobalContext();

    return (
        <div className="text-center space-y-[1vh]">
            <figure className="relative w-1/3 mx-auto aspect-square rounded-full overflow-hidden border border-base-content">
                <Image
                    src={chatState?.user?.avatar || "/block.webp"}
                    fill
                    alt={
                        chatState?.isBlocked
                            ? "Block Image"
                            : `avatar of ${chatState?.user?.username}`
                    }
                />
            </figure>
            <p className="capitalize">
                {chatState?.isBlocked ? "Block" : chatState?.user?.username}
            </p>
            <p
                className={`${
                    chatState?.isBlocked ? "text-error font-semibold" : ""
                }`}
            >
                {chatState?.isBlocked
                    ? "There is block between users"
                    : "Greatful for every sunrise"}
            </p>
        </div>
    );
}

export default Header;
