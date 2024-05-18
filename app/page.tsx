import { db } from "./db";

const Home = async () => {
  const items = await db.query.room.findMany();
  return (
    <div className="flex min-h-screen w-full text-4xl text-center m-auto flex-col items-center justify-center">
      {items.map((room) => (
        <p key={room.id}>{room.name}</p>
      ))}
    </div>
  );
};

export default Home;
