import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

export function getSession() {
  return getServerSession(authConfig);
}
