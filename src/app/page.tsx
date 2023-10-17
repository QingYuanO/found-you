import { getServerSession } from 'next-auth';
import db from '@/db';
import { roomsTable, userTable } from '@/db/schema';

import ThemeToggleBtn from '@/components/ThemeProvider/ThemeToggleBtn';

import { getRooms } from './actions';

export default async function Home() {
  const section = await getServerSession();

  
  const data = await db.query.roomsTable.findMany({
    // where: (room, { eq }) => eq(room.userId, +section?.user.id!),
    // with: {
    //   user: {},
    // },
  });
  console.log(data);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}
