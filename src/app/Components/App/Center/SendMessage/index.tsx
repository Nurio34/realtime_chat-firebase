import Actions from "./Actions";
import MessageInput from "./MessageInput";
import Emoji from "./Emoji";
import SendButton from "./SendButton";

function SendMessage() {
    return (
        <div className="grid grid-cols-[auto,1fr,auto,auto] gap-[1vw] items-center">
            <Actions />
            <MessageInput />
            <Emoji />
            <SendButton />
        </div>
    );
}

export default SendMessage;
