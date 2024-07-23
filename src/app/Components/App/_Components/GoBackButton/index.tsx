import { useGlobalContext } from "@/app/GlobalContextProvider";
import { IoMdArrowRoundBack } from "react-icons/io";

function GoBackButton() {
    const { setOpenSection, setMessageState, openSection } = useGlobalContext();
    return (
        <button
            type="button"
            className={`absolute  btn btn-sm btn-circle btn-warning ${
                openSection === "center"
                    ? "-top-2 left-0 -translate-y-full translate-x-1/2"
                    : "top-0 left-0 translate-x-1/2 translate-y-1/2"
            }`}
            aria-label="go back"
            onClick={() => {
                setOpenSection("left");
                setMessageState((pre) => ({ ...pre, message: "" }));
            }}
        >
            <IoMdArrowRoundBack />
        </button>
    );
}

export default GoBackButton;
