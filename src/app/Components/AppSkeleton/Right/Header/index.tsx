function Header() {
    return (
        <div className="text-center space-y-[1vh]">
            <figure className="relative w-1/3 mx-auto aspect-square rounded-full overflow-hidden border border-base-content animate-pulse"></figure>
            <div className=" flex flex-col justify-center items-center gap-y-1">
                <p className=" text-transparent w-max animate-pulse bg-base-content">
                    Jane Doe
                </p>
                <p className=" text-transparent w-max animate-pulse bg-base-content">
                    Greatful for every sunrise
                </p>
            </div>
        </div>
    );
}

export default Header;
