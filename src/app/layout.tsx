import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "./GlobalContextProvider";
import { Toaster } from "react-hot-toast";

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
                <Toaster position="bottom-right" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <meta name="theme-color" content="#000000" />{" "}
                {/* Manually add theme-color here */}
            </body>
        </html>
    );
}
