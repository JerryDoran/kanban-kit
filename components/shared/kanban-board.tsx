'use client';

import { Column, Board, JobApplication } from '@/lib/models/models.types';
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Trash2,
  XCircle,
} from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import CreateJobApplicationDialog from '@/components/shared/create-job-dialog';
import JobApplicationCard from '@/components/shared/job-application-card';

type KanbanBoardProps = {
  board: Board;
  userId: string;
};

type ColumnConfig = {
  color: string;
  icon: React.ReactNode;
};

const COLUMN_CONFIG: Array<ColumnConfig> = [
  {
    color: 'bg-cyan-500',
    icon: <Calendar className='size-4' />,
  },
  {
    color: 'bg-purple-500',
    icon: <CheckCircle2 className='size-4' />,
  },
  {
    color: 'bg-green-500',
    icon: <Mic className='size-4' />,
  },
  {
    color: 'bg-yellow-500',
    icon: <Award className='size-4' />,
  },
  {
    color: 'bg-red-500',
    icon: <XCircle className='size-4' />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColumnConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const sortedJobApplications =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];

  return (
    <Card className='min-w-75 shrink-0 shadow-md p-0'>
      <CardHeader className={`${config.color} rounded-t-lg pb-3 pt-3`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {config.icon}
            <CardTitle className='text-base font-semibold'>
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='cursor-pointer size-6'
              >
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Trash2 className='size-4' /> Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='space-y-2 pt-4 bg-zinc-700/50 min-h-100 rounded-b-lg'>
        {sortedJobApplications.map((jobApplication) => (
          <SortableJobCard
            key={jobApplication._id}
            job={{
              ...jobApplication,
              columnId: jobApplication.columnId || column._id,
            }}
            columns={sortedColumns}
          />
        ))}
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
      </CardContent>
    </Card>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  return (
    <>
      <div className=''>
        <div className=''>
          {columns.map((col, index) => {
            const config = COLUMN_CONFIG[index] || {
              color: 'bg-gray-500',
              icon: <Calendar className='size-4' />,
            };
            return (
              <DroppableColumn
                key={index}
                config={config}
                column={col}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
