import { useGlobalContext } from "@/app/GlobalContextProvider";
import { BsPencilSquare, BsThreeDots } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";

function Actions() {
    const { isBlocked } = useGlobalContext();

    return (
        <div className="flex gap-[1vw] items-center">
            <button type="button" aria-label="settings" disabled={isBlocked}>
                <BsThreeDots />
            </button>
            <button type="button" aria-label="video" disabled={isBlocked}>
                <FaVideo />
            </button>
            <button type="button" aria-label="message" disabled={isBlocked}>
                <BsPencilSquare />
            </button>
        </div>
    );
}

export default Actions;
