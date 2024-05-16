"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import ModeToggle from "./components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  const session = useSession();
  return (
    <header>
      {session.data ? (
        <Button onClick={() => signOut()}>Sign Out</Button>
      ) : (
        <Button onClick={() => signIn("google")}>Sign In</Button>
      )}
      {session.data?.user?.name}
      <ModeToggle />
    </header>
  );
}
