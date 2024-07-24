import { useGlobalContext } from "@/app/GlobalContextProvider";
import { auth } from "@/app/lib/firebase";

function Logout() {
    const { setOpenSection, setRegisterOpenSection } = useGlobalContext();
    return (
        <button
            type="button"
            className="btn btn-info rounded-md"
            onClick={() => {
                auth.signOut();
                setOpenSection("left");
                setRegisterOpenSection("hero");
            }}
        >
            Logout
        </button>
    );
}
export default Logout;
