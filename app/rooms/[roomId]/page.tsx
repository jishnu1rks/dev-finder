import { getRoom } from "@/app/data-access/rooms";
import { Button } from "@/components/ui/button";
import { ComputerIcon } from "lucide-react";
import Link from "next/link";
import TagsList, { splitTags } from "@/app/components/tags-list";
import { DevFinderVideo } from "./dev-finder-video";
import { Room } from "@/app/db/schema";

export default async function Page({ params }: { params: { roomId: string } }) {
  const roomId = params.roomId;
  const room = (await getRoom(roomId)) as Room;
  if (!room) return <p>No room found</p>;

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-8">
        <div className="shadow-lg p-5 rounded-sm text-card-foreground border ">
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className=" p-8">
        <div className="shadow-lg p-5 rounded-sm text-card-foreground border flex flex-col gap-4 items-start">
          <h1 className="text-2xl text-semibold">{room.name}</h1>
          <p className="text-gray-600 text-sm">{room.description}</p>

          <TagsList tags={splitTags(room.tags)} />

          <Button variant="secondary">
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
        </div>
      </div>
    </div>
  );
}
