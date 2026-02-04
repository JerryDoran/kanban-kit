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

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Signing up with:', { name, email, password });
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className='max-w-sm w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Sign Up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <form className='space-y-5' onSubmit={handleSubmit}>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-sm'>
              Name
            </Label>
            <Input
              type='text'
              id='name'
              className='w-full rounded-md border border-gray-300 px-3 py-2  focus:outline-none'
              placeholder='John Doe'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-sm'>
              Email
            </Label>
            <Input
              type='email'
              id='email'
              className='w-full rounded-md border border-gray-300 px-3 py-2  focus:outline-none'
              placeholder='john@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
          <p className='text-sm text-zinc-500 mt-2'>
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='text-primary ml-2 hover:underline text-sm'
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
