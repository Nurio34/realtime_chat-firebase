import { IoIosSend } from "react-icons/io";

function SendButton() {
    return (
        <button
            type="button"
            className="bg-[rgba(86,197,88,0.3)] p-2 rounded-md"
        >
            <IoIosSend size={20} />
        </button>
    );
}

export default SendButton;
