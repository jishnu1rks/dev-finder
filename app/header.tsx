"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import ModeToggle from "./components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, LogInIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ActionButton() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isLoggedIn ? (
          <Button variant="ghost">
            <Avatar className="mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
            {session.data?.user?.name}
          </Button>
        ) : (
          <Button onClick={() => signIn("google")}>
            <LogInIcon className="mr-2" />
            Sign In
          </Button>
        )}
      </DropdownMenuTrigger>

      {isLoggedIn && (
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <header className=" bg-gray-100 dark:bg-gray-800">
      <div className="container flex py-4 items-center justify-between">
        <h1>
          <Link href="/">
            <h1 className="text-xl font-bold light:text-gray-900">Peer Dev</h1>
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <ActionButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
