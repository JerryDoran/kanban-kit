'use client';

import { Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getSession, signOut } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import SignOutButton from '@/components/auth/signout-button';
import { useSession } from '@/lib/auth-client';

export default function Header() {
  const { data: session } = useSession();
  return (
    <nav className='fixed inset-x-0 top-0 z-50 backdrop-blur-md backdrop-saturate-150 bg-white/60 dark:bg-zinc-900/60 border-b dark:border-zinc-800 shadow-sm'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex justify-between items-center h-full'>
          <Link href='/' className='text-xl font-bold flex items-center gap-3'>
            <Briefcase className='size-8 text-primary' />
            Kanban Kit
          </Link>
          {session?.user ? (
            <div className='flex items-center gap-2'>
              <Link
                href='/dashboard'
                className='text-sm bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 text-white transition cursor-pointer'
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost'>
                    <Avatar className='cursor-pointer size-8'>
                      <AvatarFallback className='bg-primary text-white font-semibold'>
                        {session.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end'>
                  <DropdownMenuLabel className='font-normal'>
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>
                    <div className='flex flex-col'>
                      <p className='text-sm font-medium'>{session.user.name}</p>
                      <p className='text-xs text-muted-foreground font-medium'>
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
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
                <Button className='transition text-white cursor-pointer'>
                  Start For Free
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
