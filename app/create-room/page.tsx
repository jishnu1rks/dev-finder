import CreateRoomForm from "./create-room-form";

export default function CreateRoom() {
  return (
    <div className="container flex flex-col gap-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}
