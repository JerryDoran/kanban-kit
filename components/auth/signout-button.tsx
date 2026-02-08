'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push('/sign-in');
        } else {
          alert('Failed to sign out. Please try again.');
        }
      }}
      className='cursor-pointer'
    >
      Log out
    </DropdownMenuItem>
  );
}
