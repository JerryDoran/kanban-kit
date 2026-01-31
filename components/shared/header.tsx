import { Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <nav className='fixed inset-x-0 top-0 z-50 backdrop-blur-md backdrop-saturate-150 bg-white/60 dark:bg-zinc-900/60 border-b dark:border-zinc-800 shadow-sm'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex justify-between items-center h-full'>
          <Link href='/' className='text-xl font-bold flex items-center gap-3'>
            <Briefcase className='size-8 text-primary' />
            Kanban Kit
          </Link>

          <div className='flex gap-4 items-center'>
            <Link href='/sign-in' className='text-sm font-medium'>
              <Button
                variant='ghost'
                className='transition hover:bg-zinc-800 hover:text-primary cursor-pointer'
              >
                Log In
              </Button>
            </Link>
            <Link href='/sign-up' className='text-sm font-medium'>
              <Button
                variant='outline'
                className='transition hover:bg-zinc-800 hover:text-primary cursor-pointer'
              >
                Sign Up
              </Button>
            </Link>
            <Link href='/sign-up' className='text-sm font-medium'>
              <Button className='transition text-white cursor-pointer'>
                Start For Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
