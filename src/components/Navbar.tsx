import { auth } from "@/lib/auth";
import { CircleUserRound, MapPin } from "lucide-react";
import React, { use } from "react";
import UserDropdown from "./UserDropdown";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type Props = {};

const Navbar = async (props: Props) => {
    const session = await auth();
    if (!session?.user) {
        return <></>;
    }
    const u = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user?.id!));
    const user = u[0];

    return (
        <div className="flex flex-row h-14 font-semibold text-lg items-center border-b-[0.5px] border-slate-400 p-6">
            <div className="flex flex-row flex-1 gap-1 bg-blue-200 rounded-full items-center font-normal text-blue-600 text-sm px-4 py-2">
                <MapPin />
                <p>Redmond, WA</p>
            </div>
            <div className="flex pl-4">
                <UserDropdown user={session.user} stars={user.points!} />
            </div>
        </div>
    );
};

export default Navbar;
