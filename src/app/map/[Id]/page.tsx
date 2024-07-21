import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { challenges } from "@/lib/challenges";
import { db } from "@/lib/db";
import GoogleMap from "@/components/GoogleMap";

type Props = {
    params: {
        Id: string;
    };
};

const App = async ({ params: { Id } }: Props) => {
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
            <GoogleMap challenges={remainingChallenges} Id={Id} />
        </div>
    );
};

export default App;
