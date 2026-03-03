import { JobApplication, Column } from '@/lib/models/models.types';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, ExternalLink, MoreVertical, Trash, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import column from '@/lib/models/column';

type JobApplicationCardProps = {
  job: JobApplication;
  columns: Column[];
};

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
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
                  <DropdownMenuItem>
                    <Edit2 className='size-4 ' /> Edit
                  </DropdownMenuItem>
                  {columns.length > 1 && (
                    <DropdownMenuItem className='text-white flex flex-col items-start'>
                      <>
                        {columns
                          .filter((col) => col._id !== job.columnId)
                          .map((col) => (
                            <DropdownMenuItem key={col._id}>
                              Move to {col.name}
                            </DropdownMenuItem>
                          ))}
                      </>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Trash2 className='size-4' /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
