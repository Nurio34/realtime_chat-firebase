import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Registeration() {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

    return (
        <>
            {isLoginForm ? (
                <LoginForm setIsLoginForm={setIsLoginForm} />
            ) : (
                <SignupForm setIsLoginForm={setIsLoginForm} />
            )}
        </>
    );
}

export default Registeration;
