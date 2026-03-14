'use client';

/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from 'react';
import { JobApplication, Column } from '@/lib/models/models.types';
import {
  deleteJobApplication,
  updateJobApplication,
} from '@/lib/actions/job-app';

import { Card, CardContent } from '@/components/ui/card';
import { Edit2, ExternalLink, MoreVertical, Plus, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';

type JobApplicationCardProps = {
  job: JobApplication;
  columns: Column[];
};

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location,
    notes: job.notes,
    salary: job.salary,
    jobUrl: job.jobUrl,
    tags: job.tags?.join(', ') || '',
    description: job.description,
  });

  async function handleUpdate(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsPending(true);
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });
      if (!result.error) {
        setIsEditing(false);
        setIsPending(false);
        toast.success('Job application updated successfully.');
      }
    } catch (error) {
      console.error('Failed to move job application:', error);
      toast.error('Failed to update job application.');
      setIsPending(false);
    }
  }

  async function handleMove(newColumnId: string) {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      });
    } catch (error) {
      console.error('Failed to move job application:', error);
    }
  }

  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job._id);
      if (!result.error) {
        toast.success('Job application deleted successfully.');
      } else {
        toast.error('Failed to delete job application.');
      }
    } catch (error) {
      console.error('Failed to delete job application:', error);
      toast.error('Oops! Something went wrong.');
    }
  }

  return (
    <>
      <Card className='transition border border-zinc-700/80'>
        <CardContent className='px-4'>
          <div className='flex justify-between items-start'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold'>{job.company}</h3>
              <p className='text-sm text-muted-foreground'>{job.position}</p>
              {job.description && (
                <p className='mt-2 text-sm text-muted-foreground'>
                  {job.description}
                </p>
              )}
              {job.tags && job.tags.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-1'>
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='inline-block bg-zinc-700 text-zinc-200 text-xs px-2 py-1 rounded-md'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-4 text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1'
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className='size-4 inline-block' /> View Job
                </a>
              )}
            </div>
            <div className=''>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='cursor-pointer'
                  >
                    <MoreVertical className='size-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='bg-zinc-800'>
                  <DropdownMenuItem
                    className='-mb-2'
                    onClick={() => setIsEditing(true)}
                  >
                    <div className='hover:bg-green-800/40 hover:text-green-500 flex items-center gap-2 w-full py-1.5 px-2 rounded-md cursor-pointer'>
                      <Edit2 className='size-4 hover:text-green-500' /> Edit
                    </div>
                  </DropdownMenuItem>

                  {columns.length > 1 && (
                    <DropdownMenuItem className='text-white flex flex-col items-start '>
                      <>
                        {columns
                          .filter((col) => col._id !== job.columnId)
                          .map((col) => (
                            <DropdownMenuItem
                              key={col._id}
                              className='hover:bg-zinc-700 cursor-pointer w-full'
                              onClick={() => handleMove(col._id)}
                            >
                              Move to {col.name}
                            </DropdownMenuItem>
                          ))}
                      </>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleDelete}>
                    <div className='hover:bg-red-800/20 hover:text-red-300 flex items-center gap-2 w-full py-1.5 px-2 rounded-md cursor-pointer'>
                      <Trash2 className='size-4 hover:text-red-300 ' /> Delete
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Job Dialog Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className='border border-zinc-600 bg-zinc-800/50 backdrop-blur-sm rounded-lg'>
          <DialogHeader>
            <DialogTitle>Create Job Application</DialogTitle>
            <DialogDescription>Track a new job application.</DialogDescription>
          </DialogHeader>
          <form className='space-y-4 rounded-md p-4' onSubmit={handleUpdate}>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='company'>Company *</Label>
                  <Input
                    id='company'
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='company'>Position *</Label>
                  <Input
                    id='postion'
                    required
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='location'>Location</Label>
                  <Input
                    id='location'
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='salary'>Salary</Label>
                  <Input
                    id='salary'
                    placeholder='e.g., $100k - $150k'
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='job-url'>Job URL</Label>
                <Input
                  id='job-url'
                  placeholder='https://example.com'
                  value={formData.jobUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, jobUrl: e.target.value })
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='tags'>Tags (comma separated)</Label>
                <Input
                  id='tags'
                  placeholder='React, Node.js, High Pay, etc'
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='description'>Job Description</Label>
                <Textarea
                  id='description'
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='notes'>Notes</Label>
                <Textarea
                  id='notes'
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                className='text-zinc-100 cursor-pointer'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                type='submit'
                className='text-zinc-100 cursor-pointer'
              >
                {isPending ? (
                  <div className='flex gap-2'>
                    <Spinner className='size-5 animate-spin' />
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
