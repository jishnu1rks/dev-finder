"use client";

import {
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Room } from "../../db/schema";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { generateToken } from "./actions";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjRkMWUzMzgtNzU0My00OTM1LWI0Y2UtMDBlNjhiYTZhMjI3In0.KPsuiGELNfq1S4KTzmmnN-14vIKzKESz9YZf6wpvid8";

export const DevFinderVideo = ({ room }: { room: Room }) => {
  const session = useSession();
  const router = useRouter();
  const userId = room.userId;
  const [client, setClient] = useState<any>(null);
  const [call, setCall] = useState<any>(null);

  useEffect(() => {
    if (!room) return;
    if (!session.data) return;
    const client = new StreamVideoClient({
      apiKey,
      tokenProvider: () => generateToken(),
      user: {
        id: userId,
        name: session.data.user.name ?? "",
        image: session.data.user.image ?? "",
      },
    });
    const call = client.call("default", room.id);
    setClient(client);
    setCall(call);
    call.join({ create: true });
    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [session, room]);
  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls onLeave={() => router.push("/")} />
            <CallParticipantsList onClose={() => {}} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
};
