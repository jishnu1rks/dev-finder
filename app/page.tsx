import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Room } from "@/app/db/schema";
import { ComputerIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRooms } from "./data-access/rooms";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="my-4 relative">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="link">
          <Link
            href={room.githubRepo ?? ""}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2"
          >
            Github Link <ComputerIcon className="ml-2" />
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="absolute bottom-0 right-0">
        <Button>
          <Link href={`/room/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const Home = async () => {
  const items = await getRooms();
  return (
    <div className="container min-h-screen text-4xl m-auto pt-16">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Find Dev Rooms</h1>
        <Button variant="default">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map((room: Room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Home;
