import Image from "next/image";
import Actions from "./Actions";
import { useGlobalContext } from "@/app/GlobalContextProvider";

function Header() {
    const { chatState, userState, isBlocked } = useGlobalContext();
    console.log({ user: userState.user, chat: chatState.user });

    return (
        <div className="grid grid-cols-[0.1fr,1fr,auto] gap-x-[1vw] items-center">
            <figure className="relative aspect-square rounded-full overflow-hidden">
                <Image
                    src={
                        isBlocked
                            ? "/block.webp"
                            : chatState?.user?.avatar || "/her.webp"
                    }
                    fill
                    alt="img"
                    sizes="(min-width:768px) 20vw, 10vw"
                />
            </figure>
            <div>
                <p className="capitalize">
                    {isBlocked ? "Block" : chatState?.user?.username}
                </p>
                <p className={`${isBlocked ? "text-error font-semibold" : ""}`}>
                    {!chatState.chatId || chatState.isBlocked
                        ? "There is block between users"
                        : "Greatfull for every sunrise"}
                </p>
            </div>
            <Actions />
        </div>
    );
}

export default Header;
