import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

function LoginForm({
    setIsLoginForm,
}: {
    setIsLoginForm: Dispatch<SetStateAction<boolean>>;
}) {
    const { register } = useForm();

    return (
        <form className="  w-2/3 aspect-[9/10] m-auto">
            <fieldset
                className="space-y-[2vh] shadow-md shadow-base-content  py-[2vh] px-[2vw] rounded-xl
                bg-[rgba(0,0,0,0.3)]
            "
            >
                <legend className="text-center font-semibold text-3xl p-4 shadow-md shadow-base-content rounded-3xl">
                    Login
                </legend>
                <label htmlFor="email" className="grid pb-[2vh]">
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email ..."
                        className="input w-full"
                        {...register("email")}
                    />
                </label>
                <label htmlFor="password" className="grid pb-[2vh]">
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password ..."
                        className="input w-full "
                        {...register("password")}
                    />
                </label>

                <button
                    type="submit"
                    className="btn btn-info rounded-md w-full"
                >
                    Login
                </button>

                <div className="flex gap-x-1">
                    <p>You don't have an account ?</p>
                    <button
                        type="button"
                        className="text-primary underline-offset-2"
                        onClick={() => setIsLoginForm(false)}
                    >
                        Sign up for free !
                    </button>
                </div>
            </fieldset>
        </form>
    );
}

export default LoginForm;
