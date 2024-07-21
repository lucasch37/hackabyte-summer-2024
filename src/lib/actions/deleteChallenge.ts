"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteChallenge(id: string) {
    const session = await auth();
    if (!session?.user) {
        return;
    }
    const u = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user?.id!));
    const user = u[0];
    const challenges = user.challenges.split(" ");
    const filteredChallenges = challenges.filter((word) => word !== id); // Store the filtered array
    await db
        .update(users)
        .set({ challenges: filteredChallenges.join(" ") }) // Update with the filtered array
        .where(eq(users.id, session?.user?.id!));
    revalidatePath("/map");
}
