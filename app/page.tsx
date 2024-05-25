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
import TagsList, { splitTags } from "./components/tags-list";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="my-4 relative">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />
        <Button variant="ghost" className="w-fit">
          <Link
            href={room.githubRepo ?? ""}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2"
          >
            <ComputerIcon className="mr-2" />
            Github Link
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="">
        <Button>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
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
