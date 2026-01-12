import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { heroContent } from '../../data/mock';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0b]">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #f5f5f7 1px, transparent 1px),
                           linear-gradient(to bottom, #f5f5f7 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Content */}
      <div className="container-wide relative z-10 pt-20">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <h1 className="heading-hero text-[#f5f5f7] mb-2 animate-fade-in-up">
            {heroContent.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="heading-hero text-[#a1a1aa] mb-8 animate-fade-in-up animate-delay-1">
            {heroContent.subheadline}
          </p>
          
          {/* Description */}
          <p className="text-body text-lg max-w-2xl mb-12 animate-fade-in-up animate-delay-2">
            {heroContent.description}
          </p>
          
          {/* CTA */}
          <div className="animate-fade-in-up animate-delay-3">
            <Link to="/products" className="btn-primary">
              {heroContent.cta}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#27272a]" />
    </section>
  );
};

export default HeroSection;
