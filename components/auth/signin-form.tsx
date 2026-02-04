'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card className='max-w-sm w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <form className='space-y-5'>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-sm'>
              Email
            </Label>
            <Input
              type='email'
              id='email'
              className='w-full rounded-md border border-gray-300 px-3 py-2  focus:outline-none'
              placeholder='john@example.com'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='text-sm'>
              Password
            </Label>
            <Input
              type='password'
              id='password'
              className='w-full rounded-md border border-gray-300 px-3 py-2  focus:outline-none'
              placeholder='••••••••'
              minLength={8}
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <Button
            disabled={isSubmitting}
            type='submit'
            className='w-full rounded-md px-4 py-2 text-white focus:outline-none cursor-pointer'
          >
            {isSubmitting ? (
              <>
                <Spinner className='size-5 animate-spin' />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          <p className='text-sm text-zinc-500 mt-2'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='text-primary ml-2 hover:underline text-sm'
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
