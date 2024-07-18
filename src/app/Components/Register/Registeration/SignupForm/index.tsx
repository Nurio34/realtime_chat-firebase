import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SubmitFormSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormType = z.infer<typeof SubmitFormSchema>;

function SignupForm({
    setIsLoginForm,
}: {
    setIsLoginForm: Dispatch<SetStateAction<boolean>>;
}) {
    const { register, handleSubmit, formState } = useForm<FormType>({
        resolver: zodResolver(SubmitFormSchema),
    });

    const { errors } = formState;
    console.log(errors);

    const onSubmit: SubmitHandler<FormType> = (data) => {
        console.log(data);
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
                    Signup
                </legend>
                <label htmlFor="username" className="grid pb-[2vh]">
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username ..."
                        className="input w-full"
                        {...register("username")}
                    />
                    <p className="text-error text-sm font-mono ">
                        {errors.username?.message}
                    </p>
                </label>
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
                    Signup
                </button>

                <div className="flex gap-x-1">
                    <p>Already have an account ?</p>
                    <button
                        type="button"
                        className="text-primary underline-offset-2"
                        onClick={() => setIsLoginForm(true)}
                    >
                        Login
                    </button>
                </div>
            </fieldset>
        </form>
    );
}

export default SignupForm;
