import { SignInButton } from "@/components/SignInButton";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { ChromeIcon, DumbbellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
    const session = await auth();
    if (session?.user) {
        return redirect("/");
    }

    return (
        <>
            <div className="absolute w-screen flex flex-col items-center justify-center min-h-[100dvh] bg-gradient-to-b from-[#2980b9] to-[#6dd5fa]">
                <div className="w-[92vw] px-6 py-8 bg-background rounded-lg shadow-lg">
                    <div className="flex flex-col items-center mb-8">
                        <div className="rounded-full bg-gradient-to-b from-blue-700 to-blue-400 w-16 h-16 text-white text-2xl font-semibold flex justify-center items-center">
                            FF
                        </div>
                        <h1 className="text-3xl font-bold mt-2">Forever Fit</h1>
                        <p className="text-muted-foreground text-sm">
                            Welcome back!
                        </p>
                    </div>
                    <div className="space-y-4">
                        <SignInButton>
                            Continue with Google
                            <FaGoogle className="ml-2" />
                        </SignInButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
