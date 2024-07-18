import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const SignupFormSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    comfirmPassword: z.string().min(8),
    avatar: z.string(),
});

type SignupFormType = z.infer<typeof SignupFormSchema>;

function SignupForm({
    setIsLoginForm,
}: {
    setIsLoginForm: Dispatch<SetStateAction<boolean>>;
}) {
    const { register, handleSubmit, formState, setValue } =
        useForm<SignupFormType>({
            resolver: zodResolver(SignupFormSchema),
        });

    const { errors } = formState;

    const onSubmit: SubmitHandler<SignupFormType> = (data) => {};

    const [avatar, setAvatar] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setAvatar(objectUrl);
        }
    };

    const [passwordInputStatus, setPasswordInputStatus] = useState<{
        isPasswordShown: boolean;
        type: "password" | "text";
    }>({
        isPasswordShown: false,
        type: "password",
    });
    const [confirmPasswordInputStatus, setConfirmPasswordInputStatus] =
        useState<{
            isPasswordShown: boolean;
            type: "password" | "text";
        }>({
            isPasswordShown: false,
            type: "password",
        });

    const PasswordInput = useRef<HTMLInputElement | null>(null);

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
                <label htmlFor="password" className="grid relative">
                    <input
                        type={passwordInputStatus.type}
                        id="password"
                        placeholder="Enter password ..."
                        className="input w-full "
                        {...register("password")}
                    />
                    <p className="text-error text-sm font-mono ">
                        {errors.password?.message}
                    </p>
                    <button
                        type="button"
                        className={
                            "absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2"
                        }
                        onClick={() => {
                            if (!passwordInputStatus.isPasswordShown) {
                                setPasswordInputStatus({
                                    isPasswordShown: true,
                                    type: "text",
                                });
                            } else {
                                setPasswordInputStatus({
                                    isPasswordShown: false,
                                    type: "password",
                                });
                            }
                        }}
                    >
                        {passwordInputStatus.isPasswordShown ? (
                            <IoMdEyeOff />
                        ) : (
                            <IoEye />
                        )}
                    </button>
                </label>
                <label
                    htmlFor="comfirmPassword"
                    className="grid relative py-[2vh]"
                >
                    <input
                        type={confirmPasswordInputStatus.type}
                        id="comfirmPassword"
                        placeholder="Confirm password ..."
                        className="input w-full "
                        {...register("comfirmPassword")}
                    />
                    <p className="text-error text-sm font-mono ">
                        {errors.comfirmPassword?.message}
                    </p>
                    <button
                        type="button"
                        className={
                            "absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2"
                        }
                        onClick={() => {
                            if (!confirmPasswordInputStatus.isPasswordShown) {
                                setConfirmPasswordInputStatus({
                                    isPasswordShown: true,
                                    type: "text",
                                });
                            } else {
                                setConfirmPasswordInputStatus({
                                    isPasswordShown: false,
                                    type: "password",
                                });
                            }
                        }}
                    >
                        {confirmPasswordInputStatus.isPasswordShown ? (
                            <IoMdEyeOff />
                        ) : (
                            <IoEye />
                        )}
                    </button>
                </label>
                <label
                    htmlFor="avatar"
                    className="grid grid-cols-[0.2fr,0.8fr] pb-[2vh] items-center "
                >
                    <figure className="relative aspect-square rounded-full overflow-hidden border border-base-content">
                        <Image
                            src={avatar || "/wallpaper.jfif"}
                            fill
                            alt="avatar"
                            className="object-cover"
                        />
                    </figure>
                    <span className=" text-primary underline underline-offset-2 justify-self-end font-semibold text-lg">
                        Upload Avatar
                    </span>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="hidden"
                        onChange={handleFileChange}
                    />
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
