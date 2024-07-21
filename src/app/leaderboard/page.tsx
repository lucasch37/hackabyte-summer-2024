import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type Props = {};

const page = async (props: Props) => {
    const session = await auth();
    if (!session?.user) {
        return redirect("/welcome");
    }

    const allUsers = await db.select().from(users);

    allUsers.push({
        name: "Joe",
        points: 9999,
        image: "https://lh3.googleusercontent.com/a/ACg8ocIKnaItyih0vMTLX_lUmommvKpm1MF1dWb0O3niBP8FFByUUw=s96-c",
        id: "123",
        challenges: "ifji",
        email: "ewsf",
        emailVerified: null,
    });

    allUsers.push({
        name: "Mary",
        points: 9989,
        image: "https://lh3.googleusercontent.com/a/ACg8ocIKnaItyih0vMTLX_lUmommvKpm1MF1dWb0O3niBP8FFByUUw=s96-c",
        id: "123",
        challenges: "ifji",
        email: "ewsf",
        emailVerified: null,
    });

    allUsers.sort((a, b) => b.points! - a.points!);

    return (
        <div className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="flex flex-col gap-3 p-6 pb-2">
                <div className="flex flex-row justify-between">
                    <p className="text-4xl">
                        The Global
                        <span className="font-black"> Leaderboard</span>
                    </p>
                    <div className="grid grid-cols-2">
                        <Star
                            size={20}
                            className="text-[#f3f3f1]"
                            fill="#f3f3f1"
                            strokeWidth={1}
                        />
                        <Star
                            size={40}
                            className="text-[#f3f3f1] col-span-4"
                            fill="#f3f3f1"
                            strokeWidth={1}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 items-end">
                    <div className="flex flex-col bg-gray-300 rounded-l-lg h-32 items-center p-3">
                        <div className="flex bg-white rounded-full items-center justify-center w-8 h-8 text-amber-600 font-semibold border-2 border-amber-600">
                            3
                        </div>
                        <p className="font-semibold">
                            {allUsers[2].name?.split(" ")[0]}
                        </p>
                        <div className="flex flex-row gap-1 items-center text-amber-600">
                            <Star size={18} absoluteStrokeWidth={true} />
                            <p>{allUsers[2].points}</p>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-200 rounded-t-lg h-48 items-center p-3">
                        <div className="flex bg-white rounded-full items-center justify-center w-8 h-8 text-amber-400 font-semibold border-2 border-amber-400">
                            1
                        </div>
                        <p className="font-semibold">
                            {allUsers[0].name?.split(" ")[0]}
                        </p>
                        <div className="flex flex-row gap-1 items-center text-amber-400">
                            <Star size={18} absoluteStrokeWidth={true} />
                            <p>{allUsers[0].points}</p>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-300 rounded-r-lg h-40 items-center p-3">
                        <div className="flex bg-white rounded-full items-center justify-center w-8 h-8 text-slate-400 font-semibold border-2 border-slate-400">
                            2
                        </div>
                        <p className="font-semibold">
                            {allUsers[1].name?.split(" ")[0]}
                        </p>
                        <div className="flex flex-row gap-1 items-center text-slate-400">
                            <Star size={18} absoluteStrokeWidth={true} />
                            <p>{allUsers[1].points}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto">
                {allUsers.slice(3).map((user, i) => (
                    <div
                        className={`flex flex-row px-12 py-3 ${
                            i % 2 == 0 ? "bg-[#f3f3f1]" : "bg-[#e0e0e0]"
                        } justify-between`}
                        key={i}
                    >
                        <p>{4 + i}</p>
                        <p className="font-semibold">
                            {user.name?.split(" ")[0]}
                        </p>
                        <div className="flex flex-row gap-1 items-center">
                            <Star size={18} absoluteStrokeWidth={true} />
                            <p>{user.points}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
