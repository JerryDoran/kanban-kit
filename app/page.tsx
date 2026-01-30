import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex-1'>
        {/* HERO SECTION */}
        <section className='container mx-auto px-4 py-32'>
          <div>
            <h1 className='text-4xl font-bold'>
              A better way to manage your tasks.
            </h1>
            <p className='mt-4 text-lg text-muted-foreground'>
              Organize your work and boost your productivity with our intuitive
              task management solution.
            </p>
            <div>
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
