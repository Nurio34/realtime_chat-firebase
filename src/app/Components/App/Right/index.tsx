import React from "react";
import Header from "./Header";
import Actions from "./Actions";
import Block from "./Block";
import Logout from "./Logout";
import ImageShow from "./ImageShow";

function Right() {
    return (
        <div className="grid grid-rows-[auto,1fr,auto,auto] gap-y-[2vh] py-[2vh] px-[2vw]">
            <Header />
            <Actions />
            <ImageShow />
            <Block />
            <Logout />
        </div>
    );
}

export default Right;
