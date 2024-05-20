"use server";

import { db } from "@/app/db";
import { room, Room } from "@/app/db/schema";
import { getSession } from "@/app/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("You need to be logged in to create a room");
  }
  await db.insert(room).values({ ...roomData, userId: session.user.id });
  revalidatePath("/");
}
