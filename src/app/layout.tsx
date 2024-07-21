import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MenuBar from "@/components/MenuBar";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ForeverFit",
    description:
        "An engaging fitness platform for elders to get in the best shape of their lives!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col h-svh min-h-0 md:hidden">
                    <Navbar />
                    {children}
                    <MenuBar />
                    <Toaster />
                </div>
                <div className="hidden md:flex justify-center items-center min-h-screen text-white font-bold text-7xl text-center bg-gradient-to-b from-[#2980b9] to-[#6dd5fa] px-10">
                    ForeverFit is designed for mobile devices. Please visit this
                    site on your phone.
                </div>
            </body>
        </html>
    );
}
