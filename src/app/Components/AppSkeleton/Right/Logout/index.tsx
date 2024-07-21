import { auth } from "@/app/lib/firebase";

function Logout() {
    return (
        <button
            type="button"
            className="btn btn-info rounded-md"
            onClick={() => auth.signOut()}
        >
            Logout
        </button>
    );
}
export default Logout;
