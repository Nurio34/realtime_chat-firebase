import { useGlobalContext } from "@/app/GlobalContextProvider";

function Block() {
    const { chatState } = useGlobalContext();

    return (
        <button
            type="button"
            className={`btn rounded-md ${
                chatState.isBlocked ? "btn-success" : "btn-error"
            }`}
        >
            {chatState.isBlocked ? "Unblock" : "Block"}
        </button>
    );
}

export default Block;
