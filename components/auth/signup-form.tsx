'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/lib/auth-client';

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
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await signUp.email({ name, email, password });

      if (result.error) {
        setError(
          'Failed to sign up. Check to make sure all fields are filled out.'
        );
      } else {
        router.push('/dashboard');
      }
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
          {error && (
            <div className='text-sm text-destructive bg-destructive/15 p-2 rounded-md'>
              {error}
            </div>
          )}
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
                Creating account...
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
