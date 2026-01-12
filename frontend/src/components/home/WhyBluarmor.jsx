import React from 'react';
import { Lightbulb, Shield, Mountain } from 'lucide-react';
import { whyBluarmor } from '../../data/mock';

const iconMap = {
  innovation: Lightbulb,
  quality: Shield,
  ruggedness: Mountain,
};

const WhyBluarmor = () => {
  return (
    <section className="section-spacing bg-[#0a0a0b]">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-label text-[#2563eb] mb-4 block">Our Principles</span>
          <h2 className="heading-section text-[#f5f5f7]">
            WHY BLUARMOR
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid-3-col">
          {whyBluarmor.map((pillar) => {
            const IconComponent = iconMap[pillar.id] || Lightbulb;
            return (
              <div
                key={pillar.id}
                className="p-8 border-l-2 border-[#2563eb] bg-[#141416]"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#0a0a0b] border border-[#27272a] mb-6">
                  <IconComponent className="w-5 h-5 text-[#2563eb]" />
                </div>
                <h3 className="heading-subsection text-[#f5f5f7] mb-4">
                  {pillar.title}
                </h3>
                <p className="text-body">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBluarmor;
