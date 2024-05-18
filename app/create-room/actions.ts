"use server";

import { db } from "@/app/db";
import { room, Room } from "@/app/db/schema";
import { getSession } from "@/app/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("You need to be logged in to create a room");
  }
  await db.insert(room).values({ ...roomData, userId: session.user.id });
}
