import { useGlobalContext } from "@/app/GlobalContextProvider";
import Hero from "./Hero";
import Registeration from "./Registeration";

function Register() {
    const { isSmallScreen, registerOpenSection } = useGlobalContext();

    return (
        <main
            className={` ${
                isSmallScreen
                    ? "w-screen h-screen overflow-hidden"
                    : "w-[90vw] h-[90vh] py-[2vh]  grid grid-cols-2"
            } `}
        >
            {isSmallScreen ? (
                <>
                    {registerOpenSection === "hero" && <Hero />}
                    {registerOpenSection === "register" && <Registeration />}
                </>
            ) : (
                <>
                    <Hero />
                    <Registeration />
                </>
            )}
        </main>
    );
}

export default Register;
