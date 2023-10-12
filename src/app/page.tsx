import db from '@/db';
import { roomsTable } from '@/db/schema';

import ThemeToggleBtn from '@/components/ThemeProvider/ThemeToggleBtn';

import { getRooms } from './actions';

export default async function Home() {
  const data = await db.select().from(roomsTable);
  console.log(data);
  (await getRooms()).json().then(data => console.log(data));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeToggleBtn />
    </main>
  );
}
