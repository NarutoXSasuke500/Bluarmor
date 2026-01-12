import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { aboutHero, aboutStory, timeline } from '../data/mock';
import '../styles/bluarmor.css';

const AboutPage = () => {
  return (
    <div className="bluarmor-app">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center bg-[#0a0a0b] pt-20">
          <div className="container-wide">
            <div className="max-w-4xl">
              <span className="text-label text-[#2563eb] mb-4 block">Our Story</span>
              <h1 className="heading-hero text-[#f5f5f7]">
                {aboutHero.headline}
              </h1>
            </div>
          </div>
        </section>

        {/* Story Sections */}
        <section className="section-spacing bg-[#141416]">
          <div className="container-narrow">
            <div className="space-y-16">
              {aboutStory.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex flex-col md:flex-row gap-8 ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Year Badge */}
                  <div className="md:w-32 flex-shrink-0">
                    <span className="inline-block px-4 py-2 bg-[#0a0a0b] border border-[#27272a] text-[#2563eb] font-bold text-lg">
                      {section.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="heading-subsection text-[#f5f5f7] mb-4">
                      {section.title}
                    </h3>
                    <p className="text-body leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-spacing bg-[#0a0a0b]">
          <div className="container-wide">
            <div className="mb-12">
              <span className="text-label text-[#2563eb] mb-4 block">Journey</span>
              <h2 className="heading-section text-[#f5f5f7]">
                2017 → 2026
              </h2>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-4 left-0 right-0 h-px bg-[#27272a]" />

              {/* Timeline Items */}
              <div className="flex overflow-x-auto pb-4 gap-0 scrollbar-hide">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className="flex-shrink-0 relative pt-10"
                    style={{ minWidth: '140px' }}
                  >
                    {/* Dot */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-[#141416] border border-[#27272a] flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#2563eb]" />
                    </div>

                    {/* Content */}
                    <div className="pr-4">
                      <p className="text-sm font-bold text-[#2563eb] mb-1">
                        {item.year}
                      </p>
                      <p className="text-sm text-[#a1a1aa]">
                        {item.milestone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
