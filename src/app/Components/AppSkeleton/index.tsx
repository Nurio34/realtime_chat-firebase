import { useGlobalContext } from "@/app/GlobalContextProvider";
import Center from "./Center";
import Left from "./Left";
import Right from "./Right";

function AppSkeleton() {
    const { isSmallScreen } = useGlobalContext();

    return (
        <main
            className={`${
                isSmallScreen
                    ? "w-screen h-screen"
                    : "w-[90vw] h-[90vh]  grid grid-cols-[1fr,2fr,1fr]"
            }`}
        >
            <Left />
            {!isSmallScreen && (
                <>
                    <Center />
                    <Right />
                </>
            )}
        </main>
    );
}

export default AppSkeleton;
