import { db } from "@/app/db";
import { unstable_noStore } from "next/cache";

export function getRooms() {
  unstable_noStore();
  return db.query.room.findMany();
}
