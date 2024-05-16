import { db } from "./db";

const Home = async () => {
  const items = await db.query.testing.findMany();
  return (
    <div className="flex min-h-screen w-full text-4xl text-center m-auto flex-col items-center justify-center">
      {items.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default Home;
