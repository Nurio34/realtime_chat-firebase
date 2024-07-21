import Image from "next/image";

function Hero() {
    return (
        <div
            className="border-r border-base-content pr-[2vw] space-y-[2vh]
            flex flex-col justify-center
        "
        >
            <figure className="relative aspect-[16/11] rounded-md overflow-hidden">
                <Image
                    src="/hero.webp"
                    fill
                    alt="hero image"
                    style={{ objectFit: "cover" }}
                />
            </figure>
            <div className="space-y-[1vh]">
                <h1
                    className=" font-bold text-6xl bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent"
                    style={{ lineHeight: 1.2 }}
                >
                    Connect Instantly. Collaborate Seamlessly.
                </h1>
                <p className=" text-lg w-3/4">
                    Experience real-time chat that keeps you connected and in
                    sync with your team, no matter where you are.
                </p>
            </div>
        </div>
    );
}

export default Hero;
