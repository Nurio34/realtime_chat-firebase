import Actions from "./Actions";
import MessageInput from "./MessageInput";
import Emoji from "./Emoji";
import SendButton from "./SendButton";
import { useGlobalContext } from "@/app/GlobalContextProvider";
import GoBackButton from "../../_Components/GoBackButton";

function SendMessage() {
    const { isSmallScreen, setOpenSection, setMessageState } =
        useGlobalContext();
    return (
        <div className="relative grid grid-cols-[auto,1fr,auto,auto] gap-[1vw] items-center pt-[1vh]">
            <Actions />
            <MessageInput />
            {!isSmallScreen && <Emoji />}
            <SendButton />
            {isSmallScreen && <GoBackButton />}
        </div>
    );
}

export default SendMessage;
