import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { challenges } from "@/lib/challenges";
import { db } from "@/lib/db";
import GoogleMap from "@/components/GoogleMap";

type Props = {};

const App = async (props: Props) => {
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
        <div className="flex flex-col flex-1 justify-center items-center">
            <GoogleMap challenges={remainingChallenges} Id={null} />
        </div>
    );
};
//47.6530992 -122.1425876
export default App;
