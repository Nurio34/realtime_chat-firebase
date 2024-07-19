import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "./GlobalContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Realtime Chat App",
    description: "Realtime Chat App powered by Next.js and Firebase",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="dark">
            <body className={`${inter.className} min-h-screen`}>
                <GlobalContextProvider>{children}</GlobalContextProvider>
            </body>
        </html>
    );
}
