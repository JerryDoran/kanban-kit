'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type CreateJobApplicationDialogProps = {
  columnId: string;
  boardId: string;
};

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='cursor-pointer mb-4 justify-start text-muted-foreground border-dashed'
        >
          <Plus /> Add Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Job Application</DialogTitle>
          <DialogDescription>Track a new job application.</DialogDescription>
        </DialogHeader>
        <form className='space-y-4'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='company'>Company *</Label>
                <Input id='company' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='company'>Position *</Label>
                <Input id='postion' required />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Input id='location' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='salary'>Salary</Label>
                <Input id='salary' placeholder='e.g., $100k - $150k' />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='job-url'>Job URL</Label>
              <Input id='job-url' placeholder='https://example.com' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='tags'>Tags (comma separated)</Label>
              <Input id='tags' placeholder='React, Node.js, High Pay, etc' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='description'>Job Description</Label>
              <Textarea id='description' rows={3} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='notes'>Notes</Label>
              <Textarea id='notes' rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              className='text-zinc-100 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit' className='text-zinc-100 cursor-pointer'>
              Add Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
