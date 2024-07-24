import { useGlobalContext } from "@/app/GlobalContextProvider";
import Image from "next/image";

function Hero() {
    const { isSmallScreen, setRegisterOpenSection } = useGlobalContext();

    return (
        <div
            className={` px-[2vw] space-y-[2vh]
            flex flex-col justify-center ${
                isSmallScreen ? "" : " border-r border-base-content "
            }`}
        >
            <figure
                className={`relative  rounded-md overflow-hidden ${
                    isSmallScreen ? "aspect-[16/11]" : "aspect-[16/10]"
                }`}
            >
                <Image
                    src="/hero.webp"
                    fill
                    alt="hero image"
                    style={{ objectFit: "cover" }}
                    sizes="(min-width:768px) 60vw, 30vw"
                />
            </figure>
            <div className={isSmallScreen ? "space-y-[4vh]" : "space-y-[1vh]"}>
                <h1
                    className={`  bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent
                        ${
                            isSmallScreen
                                ? "font-semibold text-3xl"
                                : "font-bold text-6xl"
                        }
                        `}
                    style={{ lineHeight: 1.2 }}
                >
                    Connect Instantly. Collaborate Seamlessly.
                </h1>
                <p className={`text-lg ${isSmallScreen ? "w-full" : "w-3/4"}`}>
                    Experience real-time chat that keeps you connected and in
                    sync with your team, no matter where you are.
                </p>
            </div>
            <button
                type="button"
                className={`btn bg-gradient-to-br from-primary via-accent to-secondary text-white border-none`}
                onClick={() => setRegisterOpenSection("register")}
            >
                Sign Up For Free
            </button>
        </div>
    );
}

export default Hero;
