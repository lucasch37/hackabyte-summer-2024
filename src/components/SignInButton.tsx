"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {
    children: React.ReactNode;
};

export function SignInButton({ children }: Props) {
    return (
        <Button
            onClick={() => {
                signIn("google", { callbackUrl: "/" }).catch(
                    console.error
                );
            }}
            variant={"outline"}
            className="w-full"
        >
            {children}
        </Button>
    );
}
