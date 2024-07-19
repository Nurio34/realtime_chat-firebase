"use client";

import { useState } from "react";
import App from "./Components/App";
import Register from "./Components/Register";
import { useGlobalContext } from "./GlobalContextProvider";

export default function Home() {
    const { user } = useGlobalContext();
    console.log({ user });
    const isAuthed = Object.keys(user).length > 0;

    return <>{isAuthed ? <App /> : <Register />}</>;
}
