import { useGlobalContext } from "@/app/GlobalContextProvider";
import { auth } from "@/app/lib/firebase";
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
    const { register, handleSubmit, formState } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const { errors } = formState;

    const { setUser } = useGlobalContext();

    const onSubmit: SubmitHandler<LoginFormType> = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setUser(JSON.parse(JSON.stringify(user)));
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <form
            className="  w-2/3 aspect-[9/10] m-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
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
                    className="btn btn-info rounded-md w-full"
                >
                    Login
                </button>

                <div className="flex gap-x-1">
                    <p>You don&apos;t have an account ?</p>
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
