import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function List() {
    const friends = 9;

    const Div = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number>(0);

    useEffect(() => {
        if (Div.current) {
            setDivHeight(Div.current.getBoundingClientRect().height);
        }
    }, []);

    return (
        <div ref={Div} className="relative max-h-full  overflow-hidden ">
            <ul
                className=" absolute top-0 left-0 w-full overflow-y-scroll"
                style={{ maxHeight: divHeight }}
            >
                {Array(friends)
                    .fill(null)
                    .map((_, ind) => {
                        return (
                            <li
                                key={ind}
                                className="grid grid-cols-[1fr,4fr] items-center gap-[1vw] border-b border-base-content py-[2vh]"
                            >
                                <figure className="relative aspect-square rounded-full overflow-hidden">
                                    <Image
                                        src={"/wallpaper.jfif"}
                                        fill
                                        alt="img"
                                    />
                                </figure>
                                <div>
                                    <p>John Doe</p>
                                    <p>Feels good.</p>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default List;
