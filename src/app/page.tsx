import { getServerSession } from 'next-auth';
import db from '@/db';
import { roomsTable } from '@/db/schema';

import ThemeToggleBtn from '@/components/ThemeProvider/ThemeToggleBtn';

import { getRooms } from './actions';

export default async function Home() {
  const section = await getServerSession();
  // console.log(section);
  const data = await db.query.containerTable.findMany({
    where: (containerTable, { eq }) => eq(containerTable.roomId, roomsTable.id),
    with: {
      room: {
        columns: {
          name: true,
        },
      },
    },
  });
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">1</main>;
}
