import React from 'react';
import { Quote } from 'lucide-react';
import { riderStories } from '../../data/mock';

const RiderStories = () => {
  return (
    <section className="section-spacing bg-[#0a0a0b]">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-label text-[#2563eb] mb-4 block">Testimonials</span>
          <h2 className="heading-section text-[#f5f5f7]">
            RIDER STORIES
          </h2>
        </div>

        {/* Stories Grid */}
        <div className="grid-3-col">
          {riderStories.map((story) => (
            <div
              key={story.id}
              className="card-surface flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#27272a] mb-6" />

              {/* Quote Text */}
              <blockquote className="text-body text-[#f5f5f7] flex-1 mb-8">
                "{story.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="pt-6 border-t border-[#27272a]">
                <p className="font-medium text-[#f5f5f7] mb-1">
                  {story.name}
                </p>
                <p className="text-sm text-[#71717a] mb-2">
                  {story.location}
                </p>
                <p className="text-xs text-[#2563eb]">
                  {story.rides} logged
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiderStories;
