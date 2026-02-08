import dbConnect from './db';
import { Board, Column, JobApplication } from './models';

const DEFAULT_COLUMNS = [
  {
    name: 'Wish List',
    order: 0,
  },
  {
    name: 'Applied',
    order: 1,
  },
  {
    name: 'Interviewing',
    order: 2,
  },
  {
    name: 'Offer',
    order: 3,
  },
  {
    name: 'Rejected',
    order: 4,
  },
];

export async function initializeUserBoard(userId: string) {
  try {
    await dbConnect();

    // Check if the user already has a board
    const existingBoard = await Board.findOne({
      name: 'My Board',
      userId,
    });

    if (existingBoard) {
      return existingBoard;
    }

    // Create a new board
    const board = await Board.create({
      name: 'My Board',
      userId,
      columns: [],
    });

    // Create default columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((column) => {
        return Column.create({
          name: column.name,
          order: column.order,
          boardId: board._id,
          jobApplications: [],
        });
      })
    );

    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to initialize user board');
  }
}
