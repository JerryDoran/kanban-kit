import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Board } from '@/lib/models';
import { redirect } from 'next/navigation';

import KanbanBoard from '@/components/shared/kanban-board';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) redirect('/sign-in');

  await dbConnect();

  const board = await Board.findOne({
    userId: session.user.id,
    name: 'My Board',
  }).populate({ path: 'columns', populate: { path: 'jobApplications' } });

  // Serialize board data to remove MongoDB ObjectIds and Dates with toJSON methods
  // creates a plain JS object
  const serializedBoard = board ? JSON.parse(JSON.stringify(board)) : null;

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto p-6'>
        <div className='mb-6 flex flex-col gap-2'>
          <h1 className='text-3xl font-bold'>{serializedBoard?.name}</h1>
          <p className='text-muted-foreground'>Track your job applications</p>
        </div>
        <KanbanBoard board={serializedBoard} userId={session.user.id} />
      </div>
    </div>
  );
}
