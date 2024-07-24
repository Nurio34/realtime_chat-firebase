import { useGlobalContext } from "@/app/GlobalContextProvider";
import Image from "next/image";

function ImageShow() {
    const { imageState } = useGlobalContext();

    return (
        <>
            {imageState.imageUrl && (
                <figure className="relative aspect-video overflow-hidden">
                    <Image
                        src={imageState.imageUrl}
                        fill
                        alt="image"
                        className="object-contain"
                        sizes="(min-width:768px) 60vw, 30vw"
                    />
                </figure>
            )}{" "}
        </>
    );
}

export default ImageShow;
