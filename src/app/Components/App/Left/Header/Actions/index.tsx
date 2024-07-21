import { BsPencilSquare, BsThreeDots } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";

function Actions() {
    return (
        <div className="flex gap-[1vw] items-center">
            <button type="button" aria-label="settings">
                <BsThreeDots />
            </button>
            <button type="button" aria-label="video">
                <FaVideo />
            </button>
            <button type="button" aria-label="message">
                <BsPencilSquare />
            </button>
        </div>
    );
}

export default Actions;
