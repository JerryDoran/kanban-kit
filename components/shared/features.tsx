import { Briefcase, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Features() {
  return (
    <section className='border-t py-24'>
      <div className='container mx-auto px-4'>
        <div className='grid gap-12 md:grid-cols-3'>
          <Card className='flex flex-col transition hover:bg-zinc-800/10'>
            <CardHeader className='flex flex-col gap-4 items-center text-center'>
              <div className='flex mx-auto p-4 items-center justify-center rounded-lg bg-primary/20'>
                <Briefcase className='size-6 text-primary' />
              </div>
              <CardTitle className='text-2xl font-semibold'>
                Organize Applications
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className='text-muted-foreground text-center '>
                Create custom boards and columns to track your job applications
                at every stage of the process.
              </p>
            </CardContent>
          </Card>
          <Card className='flex flex-col transition hover:bg-zinc-800/10'>
            <CardHeader className='flex flex-col gap-4 items-center text-center'>
              <div className='flex p-4 items-center justify-center rounded-lg bg-primary/20'>
                <TrendingUp className='size-6 text-primary' />
              </div>
              <CardTitle className='text-2xl font-semibold text-white'>
                Track Progress
              </CardTitle>
            </CardHeader>

            <p className='text-muted-foreground text-center'>
              Monitor your application status from applied to interview to offer
              with visual Kanban boards.
            </p>
          </Card>
          <Card className='flex flex-col transition hover:bg-zinc-800/10'>
            <CardHeader className='flex flex-col gap-4 items-center text-center'>
              <div className='flex p-4 items-center justify-center rounded-lg bg-primary/20'>
                <CheckCircle2 className='size-6 text-primary' />
              </div>
              <CardTitle className='text-2xl font-semibold'>
                Stay Organized
              </CardTitle>
            </CardHeader>

            <p className='text-muted-foreground text-center'>
              Never lose track of an application. Keep all your job search
              information in one centralized place.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
