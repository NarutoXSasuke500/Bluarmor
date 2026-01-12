import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ChevronRight, ChevronDown, Monitor, MapPin, BookOpen } from 'lucide-react';
import { supportHero, supportSections, faqItems, supportCTA } from '../data/mock';
import '../styles/bluarmor.css';

const iconMap = {
  'product-profile': Monitor,
  'serviced-here': MapPin,
  'knowledge-base': BookOpen,
};

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bluarmor-app">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="min-h-[50vh] flex items-center justify-center bg-[#0a0a0b] pt-20">
          <div className="container-wide">
            <div className="max-w-4xl">
              <span className="text-label text-[#2563eb] mb-4 block">Support</span>
              <h1 className="heading-hero text-[#f5f5f7] mb-4">
                {supportHero.headline}
              </h1>
              <p className="heading-subsection text-[#a1a1aa]">
                {supportHero.subheadline}
              </p>
            </div>
          </div>
        </section>

        {/* Support Sections */}
        <section className="section-spacing bg-[#141416]">
          <div className="container-wide">
            <div className="grid-3-col">
              {supportSections.map((section) => {
                const IconComponent = iconMap[section.id] || Monitor;
                return (
                  <div
                    key={section.id}
                    className="card-surface flex flex-col"
                  >
                    <div className="w-14 h-14 flex items-center justify-center bg-[#0a0a0b] border border-[#27272a] mb-6">
                      <IconComponent className="w-6 h-6 text-[#2563eb]" />
                    </div>
                    <h3 className="heading-subsection text-[#f5f5f7] mb-4">
                      {section.title}
                    </h3>
                    <p className="text-body flex-1 mb-6">
                      {section.description}
                    </p>
                    <button className="btn-secondary text-sm">
                      {section.cta}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-spacing bg-[#0a0a0b]">
          <div className="container-narrow">
            <div className="mb-12">
              <span className="text-label text-[#2563eb] mb-4 block">FAQ</span>
              <h2 className="heading-section text-[#f5f5f7]">
                COMMON QUESTIONS
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#27272a] bg-[#141416]"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium text-[#f5f5f7] pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#71717a] flex-shrink-0 transition-transform duration-200 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-body">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#141416] border-y border-[#27272a]">
          <div className="container-wide py-20">
            <div className="text-center">
              <p className="text-body mb-6">
                Can't find what you're looking for?
              </p>
              <button className="btn-primary">
                {supportCTA}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
