'use client';

import { useState } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroTabs() {
  const [activeTab, setActiveTab] = useState('organize');
  return (
    <section className='border-t border-zinc-200 dark:border-zinc-800 py-16'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          {/* TABS */}
          <div className='flex gap-2 justify-center mb-8 text-white'>
            <Button
              onClick={() => setActiveTab('organize')}
              className={`cursor-pointer text-white text-sm font-medium transition-colors ${activeTab === 'organize' ? 'bg-zinc-800 dark:bg-primary' : 'dark:bg-zinc-700'}`}
            >
              Organize Applications
            </Button>
            <Button
              onClick={() => setActiveTab('get-productive')}
              className={`cursor-pointer text-white text-sm font-medium transition-colors ${activeTab === 'get-productive' ? 'bg-zinc-800 dark:bg-primary' : 'dark:bg-zinc-700'}`}
            >
              Get Productive
            </Button>
            <Button
              onClick={() => setActiveTab('manage-workflows')}
              className={`cursor-pointer text-white text-sm font-medium transition-colors ${activeTab === 'manage-workflows' ? 'bg-zinc-800 dark:bg-primary' : 'dark:bg-zinc-700'}`}
            >
              Manage Work Flows
            </Button>
          </div>
          <div className='relative mx-auto max-w-5xl overflow-hidden rounded-lg border dark:border-zinc-700 shadow-lg'>
            {activeTab === 'organize' && (
              <Image
                src='/hero-images/hero1.png'
                alt='Hero Image'
                width={1200}
                height={800}
              />
            )}
            {activeTab === 'get-productive' && (
              <Image
                src='/hero-images/hero2.webp'
                alt='Hero Image'
                width={1200}
                height={800}
              />
            )}
            {activeTab === 'manage-workflows' && (
              <Image
                src='/hero-images/hero3.png'
                alt='Hero Image'
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
