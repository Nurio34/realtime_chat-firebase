import Image from "next/image";
import Actions from "./Actions";
import { useGlobalContext } from "@/app/GlobalContextProvider";

function Header() {
    const { userState } = useGlobalContext();

    const { avatar, username } = userState.user;

    return (
        <div className="grid grid-cols-[1fr,2fr,2fr] gap-[1vw] items-center justify-between">
            <figure className="relative aspect-square rounded-full overflow-hidden">
                <Image
                    src={avatar}
                    fill
                    alt="img"
                    sizes="(min-width:768px) 20vw, 10vw"
                />
            </figure>
            <p className="capitalize">{username}</p>
            <Actions />
        </div>
    );
}

export default Header;
