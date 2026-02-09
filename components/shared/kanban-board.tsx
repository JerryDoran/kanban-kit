'use client';

import { Board } from '@/lib/models/models.types';

type KanbanBoardProps = {
  board: Board;
  userId: string;
};

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  return <div>Kanban Board</div>;
}
