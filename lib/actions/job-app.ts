'use server';

import { OrderedBulkOperation } from 'mongodb';
import { getSession } from '../auth';
import dbConnect from '../db';
import { Board, Column, JobApplication } from '../models';

type JobApplicationData = {
  company: string;
  position: string;
  location?: string;
  columnId: string;
  boardId: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  description?: string;
};

export async function createJobApplication(data: JobApplicationData) {
  const session = await getSession();

  if (!session?.user) {
    return {
      error: 'Unauthorized',
    };
  }

  await dbConnect();

  const {
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    tags,
    description,
  } = data;

  if (!company || !position || !columnId || !boardId) {
    return {
      error: 'Missing required fields',
    };
  }

  // Verify that the user owns the board
  const board = await Board.findOne({ _id: boardId, userId: session.user.id });
  if (!board) {
    return {
      error: 'Board not found!',
    };
  }

  // Verify column belongs to board
  const column = await Column.findOne({ _id: columnId, boardId });
  if (!column) {
    return {
      error: 'Column not found!',
    };
  }

  const maxOrder =
    ((await JobApplication.findOne({ columnId })
      .sort({ order: -1 })
      .select('order')
      .lean()) as { order: number }) || null;

  const order = maxOrder ? maxOrder.order + 1 : 0;

  // Create job application
  const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    tags: tags || [],
    description,
    status: 'applied',
    order: maxOrder ? maxOrder.order + 1 : 0,
  });
}
