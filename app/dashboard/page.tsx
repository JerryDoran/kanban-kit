import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Board } from '@/lib/models';
import { redirect } from 'next/navigation';

import KanbanBoard from '@/components/shared/kanban-board';
import { Suspense } from 'react';

async function fetchBoardData(userId: string) {
  'use cache';
  await dbConnect();

  const board = await Board.findOne({
    userId: userId,
    name: 'My Board',
  }).populate({ path: 'columns', populate: { path: 'jobApplications' } });

  // Serialize board data to remove MongoDB ObjectIds and Dates with toJSON methods
  // creates a plain JS object
  const serializedBoard = board ? JSON.parse(JSON.stringify(board)) : null;

  return serializedBoard;
}

async function DashboardPageWrapper() {
  const session = await getSession();
  const board = await fetchBoardData(session?.user.id || '');

  if (!session?.user) redirect('/sign-in');

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto p-6'>
        <div className='mb-6 flex flex-col gap-2'>
          <h1 className='text-3xl font-bold'>{board?.name}</h1>
          <p className='text-muted-foreground'>Track your job applications</p>
        </div>
        <KanbanBoard board={board} userId={session.user.id} />
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPageWrapper />
    </Suspense>
  );
}
