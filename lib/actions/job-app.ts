'use server';

import { revalidatePath } from 'next/cache';
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

  // Create job application
  const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    userId: session.user.id,
    boardId,
    tags: tags || [],
    description,
    status: 'applied',
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  // Add job application to column
  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  revalidatePath('/dashboard');

  return {
    data: JSON.parse(JSON.stringify(jobApplication)),
  };
}

export async function updateJobApplication(
  id: string,
  updates: {
    company?: string;
    position?: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId?: string;
    order?: number;
    tags?: string[];
    description?: string;
  }
) {
  const session = await getSession();

  if (!session?.user) {
    return {
      error: 'Unauthorized',
    };
  }

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication || jobApplication.userId.toString() !== session.user.id) {
    return {
      error: 'Job application not found!',
    };
  }

  const { columnId, order, ...otherUpdates } = updates;

  const updatesToApply: Partial<{
    company: string;
    position: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId?: string;
    order?: number;
    tags?: string[];
    description?: string;
  }> = otherUpdates;

  const currentColumnId = jobApplication.columnId.toString();
  const newColumnId = columnId?.toString();

  const isMovingToDifferentColumn =
    newColumnId && newColumnId !== currentColumnId;

  if (isMovingToDifferentColumn) {
    await Column.findByIdAndUpdate(currentColumnId, {
      $pull: { jobApplications: id },
    });

    const targetColumn = await JobApplication.find({
      columnId: newColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    let newOrder: number;

    if (order !== undefined && order !== null) {
      // Create space for the moved job application by incrementing the order of existing applications
      newOrder = order * 100;

      const jobsThatNeedToShift = targetColumn.slice(order);
      for (const job of jobsThatNeedToShift) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else {
      if (targetColumn.length > 0) {
        const lastJobOrder = targetColumn[targetColumn.length - 1].order || 0;
        newOrder = lastJobOrder + 100;
      } else {
        newOrder = 0;
      }
    }

    updatesToApply.columnId = newColumnId;
    updatesToApply.order = newOrder;

    await Column.findByIdAndUpdate(newColumnId, {
      $push: { jobApplications: id },
    });
  } else if (order !== undefined && order !== null) {
    const otherJobsInColumn = await JobApplication.find({
      columnId: currentColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    const currentJobOrder = jobApplication.order || 0;

    const currentPositionIndex = otherJobsInColumn.findIndex(
      (job) => job.order > currentJobOrder
    );
    const oldPositionIndex =
      currentPositionIndex === -1
        ? otherJobsInColumn.length
        : currentPositionIndex;

    const newOrderValue = order * 100;

    if (order < oldPositionIndex) {
      const jobsToShiftDown = otherJobsInColumn.slice(order, oldPositionIndex);
      for (const job of jobsToShiftDown) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else if (order > oldPositionIndex) {
      const jobsToShiftUp = otherJobsInColumn.slice(oldPositionIndex, order);
      for (const job of jobsToShiftUp) {
        const newOrderForJob = Math.max(0, job.order - 100);
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: newOrderForJob },
        });
      }
    }

    updatesToApply.order = newOrderValue;
  }

  const updated = await JobApplication.findByIdAndUpdate(id, updatesToApply, {
    new: true,
  });

  revalidatePath('/dashboard');

  return {
    data: JSON.parse(JSON.stringify(updated)),
  };
}

export async function deleteJobApplication(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return {
      error: 'Unauthorized',
    };
  }

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication || jobApplication.userId.toString() !== session.user.id) {
    return {
      error: 'Job application not found!',
    };
  }

  await Column.findByIdAndUpdate(jobApplication.columnId, {
    $pull: { jobApplications: id }, // Remove the job application from the column
  });

  await JobApplication.deleteOne({ _id: id }); // Delete the job application from the database

  revalidatePath('/dashboard');

  return {
    success: true,
  };
}
