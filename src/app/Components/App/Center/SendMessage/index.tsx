import Actions from "./Actions";
import MessageInput from "./MessageInput";
import Emoji from "./Emoji";
import SendButton from "./SendButton";
import { useGlobalContext } from "@/app/GlobalContextProvider";

function SendMessage() {
    const { isSmallScreen } = useGlobalContext();
    return (
        <div className="grid grid-cols-[auto,1fr,auto,auto] gap-[1vw] items-center">
            <Actions />
            <MessageInput />
            {!isSmallScreen && <Emoji />}
            <SendButton />
        </div>
    );
}

export default SendMessage;
