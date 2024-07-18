import { BsPencilSquare, BsThreeDots } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";

function Actions() {
    return (
        <div className="flex gap-[1vw] items-center">
            <button type="button">
                <BsThreeDots />
            </button>
            <button type="button">
                <FaVideo />
            </button>
            <button type="button">
                <BsPencilSquare />
            </button>
        </div>
    );
}

export default Actions;
