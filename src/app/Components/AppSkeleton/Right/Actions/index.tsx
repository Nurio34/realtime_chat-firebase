import { useEffect, useRef, useState } from "react";
import ChatSettings from "./ChatSettings";
import Privacy from "./Privacy";
import SharedPhotos from "./SharedPhotos";
import SharedFiles from "./SharedFiles";

function Actions() {
    const Div = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number>(0);

    useEffect(() => {
        if (Div.current) {
            setDivHeight(Div.current.getBoundingClientRect().height);
        }
    }, []);

    return (
        <div
            ref={Div}
            className="relative border-y-2 border-base-content  max-h-full overflow-hidden"
        >
            <div
                className="absolute top-0 left-0 w-full overflow-y-scroll"
                style={{ height: divHeight, maxHeight: divHeight }}
            >
                <ChatSettings />
                <Privacy />
                <SharedPhotos />
                <SharedFiles />
            </div>
        </div>
    );
}

export default Actions;
