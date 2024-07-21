import Challenge from "@/components/Challenge";
import { SignInButton } from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import { challenges } from "@/lib/challenges";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import { challenge_dist } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useGeolocation } from "@uidotdev/usehooks";

export default async function Home() {
    const session = await auth();
    if (!session?.user) {
        return redirect("/welcome");
    }

    const u = await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id!));

    const user = u[0];

    const remainingChallenges = challenges.filter((obj) =>
        user.challenges.split(" ")?.includes(obj.id)
    );

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="flex flex-row justify-between py-6 px-6 font-medium">
                <div className="flex flex-col gap-2">
                    <p>Good afternoon, {session.user.name?.split(" ")[0]}!</p>
                    <div className="flex flex-row items-center">
                        <p className="text-4xl">
                            Let's get
                            <span className="font-black"> moving!</span>
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <Zap
                        size={30}
                        className="text-[#f3f3f1]"
                        fill="#f3f3f1"
                        strokeWidth={1}
                    />
                    <Zap
                        size={80}
                        className="text-[#f3f3f1] col-span-4"
                        fill="#f3f3f1"
                        strokeWidth={1}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1 bg-[#f3f3f1] px-6 pt-6 gap-3 min-h-0">
                <div className="flex flex-row gap-1.5 items-center">
                    <div className="bg-blue-600 px-2 py-1 text-white rounded-md">
                        {remainingChallenges.length}
                    </div>
                    <p className="font-semibold">Challenges for today</p>
                </div>
                <div className="flex flex-col flex-1 w-full gap-2 mb-2 overflow-y-auto">
                    {remainingChallenges
                        .sort((a, b) => a.difficulty - b.difficulty)
                        .map((challenge, i) => (
                            <Challenge key={i} challenge={challenge} />
                        ))}
                </div>
            </div>
        </div>
    );
}
