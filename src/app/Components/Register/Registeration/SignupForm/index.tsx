import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useGlobalContext } from "@/app/GlobalContextProvider";
import toast from "react-hot-toast";
import { auth, db } from "@/app/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import uploadAvatar from "@/app/lib/uploadAvatar";

const SignupFormSchema = z
    .object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        avatar: z.string({ message: "Avatar picture is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
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

    const { errors, isSubmitting } = formState;

    const [avatar, setAvatar] = useState<string>("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setAvatar(objectUrl);
            setAvatarFile(file);
            setValue("avatar", file.name);
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

    const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
        const { email, password, username } = data;

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const avatarUrl = await uploadAvatar(avatarFile!);

            await setDoc(doc(db, "users", res.user.uid), {
                userId: res.user.uid,
                username,
                email,
                password,
                blocks: [],
                avatar: avatarUrl,
            });
            toast.success("Account Created Successfully");

            await setDoc(doc(db, "chats", res.user.uid), {
                chats: [],
            });
        } catch (error) {
            console.log(error);
            toast.error(JSON.stringify(error));
            throw new Error(JSON.stringify(error));
        }
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
                        {...register("confirmPassword")}
                    />
                    <p className="text-error text-sm font-mono ">
                        {errors.confirmPassword?.message}
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
                    <figure className="relative aspect-square rounded-full overflow-hidden border border-base-content cursor-pointer">
                        <Image
                            src={avatar || "/wallpaper.jfif"}
                            fill
                            alt="avatar"
                            className="object-cover"
                        />
                    </figure>
                    <span className=" text-primary underline underline-offset-2 justify-self-end font-semibold text-lg cursor-pointer">
                        {" "}
                        Upload Avatar
                    </span>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <p className="text-error text-sm font-mono col-start-1 col-span-full ">
                        {errors.avatar?.message}
                    </p>
                </label>
                <button
                    type="submit"
                    className={`btn btn-info rounded-md w-full disabled:btn-neutral disabled:border disabled:border-base-content`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing..." : "Signup"}
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
