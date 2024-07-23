import { useGlobalContext } from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Block() {
    const { userState, chatState, isBlocked } = useGlobalContext();
    chatState;

    const blockUser = async () => {
        const userRef = doc(db, "users", userState.user.userId);
        if (!isBlocked) {
            await updateDoc(userRef, {
                blocks: arrayUnion(chatState.user.userId),
            });
        } else {
            await updateDoc(userRef, {
                blocks: arrayRemove(chatState.user.userId),
            });
        }
    };

    return (
        <button
            type="button"
            className={`btn rounded-md ${
                isBlocked ? "btn-success" : "btn-error"
            }`}
            onClick={blockUser}
        >
            {isBlocked ? "Unblock" : "Block"}
        </button>
    );
}

export default Block;
