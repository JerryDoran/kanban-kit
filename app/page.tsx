import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HeroTabs from '@/components/shared/hero-tabs';
import Features from '@/components/shared/features';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex-1'>
        {/* HERO SECTION */}
        <section className='container mx-auto px-4 py-32'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-6xl font-bold mb-6'>
              A better way to manage your tasks.
            </h1>
            <p className='mt-4 mb-10 text-lg text-muted-foreground'>
              Organize your work and boost your productivity with our intuitive
              task management solution.
            </p>
            <div className='flex flex-col gap-4'>
              <Link href='/sign-up'>
                <Button
                  size='lg'
                  className='h-12 mt-6 max-w-xl mx-auto text-xl text-white font-medium cursor-pointer'
                >
                  Get Started
                  <ArrowRight className=' size-5' />
                </Button>
              </Link>

              <p className='mt-2 text-sm text-muted-foreground'>
                No credit card required. Free forever.
              </p>
            </div>
          </div>
        </section>

        {/* HERO IMAGES SECTION */}
        <HeroTabs />
        {/* FEATURES SECTION */}
        <Features />
      </div>
    </div>
  );
}
