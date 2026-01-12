import React from 'react';
import { Wifi, Smartphone, Volume2, Mic, Link2, Download } from 'lucide-react';
import { commandCentreFeatures } from '../../data/mock';

const iconMap = {
  eridegrid: Wifi,
  portweave: Smartphone,
  audiorange: Volume2,
  heyblu: Mic,
  latchon: Link2,
  otaupdate: Download,
};

const CommandCentre = () => {
  return (
    <section className="section-spacing bg-[#0a0a0b]">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-label text-[#2563eb] mb-4 block">App Features</span>
          <h2 className="heading-section text-[#f5f5f7]">
            ONE APP COMMAND CENTRE
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid-features">
          {commandCentreFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.id] || Wifi;
            return (
              <div
                key={feature.id}
                className="card-surface group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#1a1a1e] border border-[#27272a] group-hover:border-[#2563eb] transition-colors duration-150">
                    <IconComponent className="w-5 h-5 text-[#2563eb]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-subsection text-[#f5f5f7] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-body text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommandCentre;
