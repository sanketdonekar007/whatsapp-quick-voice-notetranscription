
import React from 'react';
import { useAnimationOnMount } from '@/lib/animations';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const isAnimated = useAnimationOnMount();

  return (
    <section className="relative py-20 md:py-32 px-6 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
      <div className={`transition-default ${isAnimated ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-primary bg-primary/5 rounded-full mb-2">
            AI-Powered Voice Notes
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
          Convert your WhatsApp Voice Notes to Text
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto text-balance">
          Instantly transcribe and search your voice messages with our AI-powered platform. Never miss important information again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full hover-scale font-medium">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="rounded-full hover-scale font-medium">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
