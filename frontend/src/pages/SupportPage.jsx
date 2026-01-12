import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ChevronRight, ChevronDown, Monitor, MapPin, BookOpen, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supportHero, supportSections, faqItems as mockFaqItems, supportCTA } from '../data/mock';
import { getFAQItems, createSupportTicket } from '../services/api';
import '../styles/bluarmor.css';

const iconMap = {
  'product-profile': Monitor,
  'serviced-here': MapPin,
  'knowledge-base': BookOpen,
};

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [faqItems, setFaqItems] = useState(mockFaqItems);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    device_id: '',
    issue_type: 'general',
    description: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const data = await getFAQItems();
        if (data && data.length > 0) {
          setFaqItems(data);
        }
      } catch (error) {
        console.log('Using mock FAQ items');
      }
    };
    fetchFAQ();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      await createSupportTicket(ticketForm);
      setSubmitStatus('success');
      setTicketForm({
        name: '',
        email: '',
        device_id: '',
        issue_type: 'general',
        description: ''
      });
      setTimeout(() => {
        setShowTicketForm(false);
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
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

        {/* Support Ticket Form */}
        {showTicketForm && (
          <section className="section-spacing-sm bg-[#141416]">
            <div className="container-narrow">
              <div className="p-8 bg-[#0a0a0b] border border-[#27272a]">
                <h3 className="heading-subsection text-[#f5f5f7] mb-6">
                  Create Support Ticket
                </h3>

                {submitStatus === 'success' ? (
                  <div className="flex items-center gap-3 text-green-500 p-4 bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5" />
                    <span>Ticket submitted successfully. We'll get back to you soon.</span>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Name *</label>
                        <input
                          type="text"
                          required
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                          className="w-full px-4 py-3 bg-[#141416] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                          className="w-full px-4 py-3 bg-[#141416] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Device ID (optional)</label>
                        <input
                          type="text"
                          value={ticketForm.device_id}
                          onChange={(e) => setTicketForm({...ticketForm, device_id: e.target.value})}
                          className="w-full px-4 py-3 bg-[#141416] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                          placeholder="e.g., BLU5-XXXX-XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Issue Type *</label>
                        <select
                          required
                          value={ticketForm.issue_type}
                          onChange={(e) => setTicketForm({...ticketForm, issue_type: e.target.value})}
                          className="w-full px-4 py-3 bg-[#141416] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Issue</option>
                          <option value="warranty">Warranty Claim</option>
                          <option value="returns">Returns & Refunds</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">Description *</label>
                      <textarea
                        required
                        rows={4}
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        className="w-full px-4 py-3 bg-[#141416] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none resize-none"
                        placeholder="Please describe your issue in detail..."
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-3 text-red-500 p-4 bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-5 h-5" />
                        <span>Failed to submit ticket. Please try again.</span>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Ticket'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowTicketForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="bg-[#141416] border-y border-[#27272a]">
          <div className="container-wide py-20">
            <div className="text-center">
              <p className="text-body mb-6">
                Can't find what you're looking for?
              </p>
              <button 
                onClick={() => setShowTicketForm(true)}
                className="btn-primary"
              >
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
