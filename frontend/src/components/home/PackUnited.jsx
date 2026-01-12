import React from 'react';
import { Users, Handshake, UserPlus, ChevronRight } from 'lucide-react';
import { packUnitedContent } from '../../data/mock';

const iconMap = {
  'democratic-mesh': Users,
  'universal-handshake': Handshake,
  'digital-pillion': UserPlus,
};

const PackUnited = () => {
  return (
    <section className="section-spacing bg-[#141416]">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <h2 className="heading-section text-[#f5f5f7] mb-6">
            {packUnitedContent.headline}
          </h2>
        </div>

        {/* Features */}
        <div className="grid-3-col mb-12">
          {packUnitedContent.sections.map((section) => {
            const IconComponent = iconMap[section.id] || Users;
            return (
              <div key={section.id} className="space-y-4">
                <div className="w-14 h-14 flex items-center justify-center bg-[#0a0a0b] border border-[#27272a]">
                  <IconComponent className="w-6 h-6 text-[#2563eb]" />
                </div>
                <h3 className="heading-subsection text-[#f5f5f7]">
                  {section.title}
                </h3>
                <p className="text-body">
                  {section.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div>
          <button className="btn-secondary">
            {packUnitedContent.cta}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackUnited;
