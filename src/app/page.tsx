import { getRooms } from '@/db/server';

export default async function Home() {
  const data = await getRooms();
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {data.body?.map(item => <div key={item.id}>{item.name}</div>)}
    </main>
  );
}
