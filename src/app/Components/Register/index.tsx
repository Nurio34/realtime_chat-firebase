import Hero from "./Hero";
import Registeration from "./Registeration";

function Register() {
    return (
        <main
            className="w-[90vw] h-[90vh] py-[2vh] px-[2vw]
      grid grid-cols-2
    "
        >
            <Hero />
            <Registeration />
        </main>
    );
}

export default Register;
