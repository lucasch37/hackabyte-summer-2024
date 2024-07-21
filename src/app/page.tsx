import Challenge from "@/components/Challenge";
import { SignInButton } from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import { challenges } from "@/lib/challenges";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth()
    if (!session?.user) {
        return redirect("/welcome");
    }

    const u = await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id!));

    const user = u[0];

    const remainingChallenges = challenges.filter(obj => user.challenges.split(" ")?.includes(obj.name));

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-2 py-6 px-6 font-medium">
                <p>Good afternoon, {session.user.name?.split(" ")[0]}!</p>
                <div className="flex items-center">
                    <p className="w-1/2 text-4xl">
                        Let's get
                        <span className="font-black"> moving!</span>
                    </p>
                    <Zap size={70} className="ml-2 text-yellow-300" fill="yellow" strokeWidth={1} />
                </div>
            </div>
            <div className="flex flex-col flex-1 bg-[#f3f3f1] p-6 gap-3">
                <div className="flex flex-row gap-1.5 items-center">
                    <div className="bg-blue-600 px-2 py-1 text-white rounded-md">6</div>
                    <p className="font-semibold">Challenges for today</p>
                </div>
                <div className="flex flex-col h-[22rem] w-full gap-2 overflow-x-auto">
                    {remainingChallenges.map((challenge, i) => (
                        <Challenge key={i} challenge={challenge} />
                    ))}
                </div>
            </div>
        </div>
    );
}
