import { useGlobalContext } from "@/app/GlobalContextProvider";
import Image from "next/image";
import GoBackButton from "../../_Components/GoBackButton";

function Header() {
    const { chatState, isSmallScreen } = useGlobalContext();

    return (
        <div className="text-center space-y-[1vh]">
            <figure className="relative w-1/3 mx-auto aspect-square rounded-full overflow-hidden border border-base-content">
                <Image
                    src={chatState?.user?.avatar || "/block.webp"}
                    fill
                    alt={
                        !chatState.chatId || chatState.isBlocked
                            ? "Block Image"
                            : `avatar of ${chatState?.user?.username}`
                    }
                    sizes="(min-width:768px) 60vw, 30vw"
                />
            </figure>
            <p className="capitalize">
                {!chatState.chatId || chatState.isBlocked
                    ? "Block"
                    : chatState?.user?.username}
            </p>
            <p
                className={`${
                    !chatState.chatId || chatState.isBlocked
                        ? "text-error font-semibold"
                        : ""
                }`}
            >
                {!chatState.chatId || chatState.isBlocked
                    ? "There is block between users"
                    : "Greatful for every sunrise"}
            </p>
            {isSmallScreen && <GoBackButton />}
        </div>
    );
}

export default Header;
