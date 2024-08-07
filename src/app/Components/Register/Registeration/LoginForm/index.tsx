import { useGlobalContext } from "@/app/GlobalContextProvider";
import { auth } from "@/app/lib/firebase";
import { lightThemes } from "@/app/utilities/daisyui_lightThemes";
import { isSchema } from "@hookform/resolvers/typanion/src/__tests__/__fixtures__/data.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

function LoginForm({
    setIsLoginForm,
}: {
    setIsLoginForm: Dispatch<SetStateAction<boolean>>;
}) {
    const { isSmallScreen, theme } = useGlobalContext();
    const isLightTheme = lightThemes.includes(theme);

    const { register, handleSubmit, formState } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const { errors, isSubmitting, isSubmitSuccessful } = formState;

    const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
        const { email, password } = data;
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    };

    return (
        <form
            className={`${
                isSmallScreen ? "h-screen" : " w-2/3 aspect-[9/10] m-auto"
            }`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <fieldset
                className={`space-y-[2vh] shadow-md shadow-base-content  py-[2vh] px-[2vw] rounded-xl  ${
                    isLightTheme
                        ? "bg-[rgba(255,255,255,0.3)]"
                        : "bg-[rgba(0,0,0,0.3)]"
                }
                    ${isSmallScreen ? "h-screen grid place-content-center" : ""}
                    `}
            >
                {!isSmallScreen ? (
                    <legend className="text-center font-semibold text-3xl p-4 shadow-md shadow-base-content rounded-3xl">
                        Login
                    </legend>
                ) : (
                    <h1 className="text-center font-bold text-2xl uppercase text-white">
                        Login
                    </h1>
                )}
                <label htmlFor="email" className="grid pb-[2vh]">
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email ..."
                        className="input w-full"
                        {...register("email")}
                    />
                    <p className="text-error text-sm font-mono ">
                        {errors.email?.message}
                    </p>
                </label>
                <label htmlFor="password" className="grid pb-[2vh]">
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password ..."
                        className="input w-full "
                        {...register("password")}
                    />
                    <p className="text-error text-sm font-mono ">
                        {errors.password?.message}
                    </p>
                </label>

                <button
                    type="submit"
                    className={`btn btn-info rounded-md w-full disabled:btn-neutral disabled:border disabled:border-base-content ${
                        isSubmitSuccessful ? "btn-success" : ""
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Logging..."
                        : isSubmitSuccessful
                        ? "Login Success"
                        : "Login"}
                </button>

                <div className="flex gap-x-1">
                    <p className="text-white">
                        You don&apos;t have an account ?
                    </p>
                    <button
                        type="button"
                        className="text-accent underline underline-offset-2"
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
