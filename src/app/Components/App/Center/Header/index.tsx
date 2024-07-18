import Image from "next/image";
import Actions from "./Actions";

function Header() {
    return (
        <div className="grid grid-cols-[0.1fr,1fr,auto] gap-x-[1vw] items-center">
            <figure className="relative aspect-square rounded-full overflow-hidden">
                <Image src="/wallpaper.jfif" fill alt="img" />
            </figure>
            <div>
                <p>Janet Doe</p>
                <p>Greatfull for every sunrise</p>
            </div>
            <Actions />
        </div>
    );
}

export default Header;
