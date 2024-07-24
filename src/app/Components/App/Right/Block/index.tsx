import { useGlobalContext } from "@/app/GlobalContextProvider";
import { db } from "@/app/lib/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Block() {
    const { userState, chatState, isBlocked, isMeBlocked, isHimBlocked } =
        useGlobalContext();
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
            className={`btn rounded-md disabled:bg-warning disabled:text-warning-content  ${
                isHimBlocked
                    ? "btn-success"
                    : isMeBlocked
                    ? "btn-warning"
                    : "btn-error"
            }`}
            onClick={blockUser}
            disabled={isMeBlocked}
        >
            {isHimBlocked ? "Unblock" : isMeBlocked ? "You Blocked" : "Block"}
        </button>
    );
}

export default Block;
