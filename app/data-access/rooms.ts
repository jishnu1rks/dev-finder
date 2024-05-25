import { db } from "@/app/db";
import { unstable_noStore } from "next/cache";
import { StringValidation } from "zod";

export function getRooms() {
  unstable_noStore();
  return db.query.room.findMany();
}

export function getRoom(roomId: string) {
  unstable_noStore();
  return db.query.room.findFirst({
    where: (room, { eq }) => eq(room.id, roomId),
  });
}
