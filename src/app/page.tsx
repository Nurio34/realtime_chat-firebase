"use client";

import App from "./Components/App";
import Register from "./Components/Register";

export default function Home() {
    const isAuthed = false;

    return <>{isAuthed ? <App /> : <Register />}</>;
}
