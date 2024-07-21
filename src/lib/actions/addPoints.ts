"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addPoints(p: number) {
    const session = await auth();
    if (!session?.user) {
        return;
    }
    const u = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user?.id!));
    const user = u[0];
    const points = user.points! + p;
    await db
        .update(users)
        .set({ points })
        .where(eq(users.id, session?.user?.id!));
    revalidatePath("/leaderboard");
}
