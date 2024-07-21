import { auth } from "@/lib/auth";
import { CircleUserRound, MapPin } from "lucide-react";
import React, { use } from "react";
import UserDropdown from "./UserDropdown";

type Props = {};

const Navbar = async (props: Props) => {
    const session = await auth();
    if (!session?.user) {
        return <></>;
    }

    return (
        <div className="flex flex-row h-14 font-semibold text-lg items-center border-b-[0.5px] border-slate-400 p-6">
            <div className="flex flex-row flex-1 gap-1 bg-blue-200 rounded-full items-center font-normal text-blue-600 text-sm px-4 py-2">
                <MapPin />
                <p>Redmond, WA</p>
            </div>
            <div className="flex pl-4">
                <UserDropdown user={session.user} />
            </div>
        </div>
    );
};

export default Navbar;
