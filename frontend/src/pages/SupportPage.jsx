import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ChevronRight, ChevronDown, Phone, MessageCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supportHero, supportContact, faqCategories } from '../data/mock';
import { createSupportTicket } from '../services/api';
import '../styles/bluarmor.css';

const SupportPage = () => {
  const [openCategory, setOpenCategory] = useState('comms-connectivity');
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    phone: '',
    email: '',
    device_name: '',
    serial_number: '',
    issue_type: 'general',
    description: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleFaq = (categoryId, index) => {
    const key = `${categoryId}-${index}`;
    setOpenFaq(openFaq === key ? null : key);
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      await createSupportTicket({
        name: ticketForm.name,
        email: ticketForm.email,
        device_id: ticketForm.serial_number,
        issue_type: ticketForm.issue_type,
        description: `Device: ${ticketForm.device_name}\nPhone: ${ticketForm.phone}\n\n${ticketForm.description}`
      });
      setSubmitStatus('success');
      setTicketForm({
        name: '',
        phone: '',
        email: '',
        device_name: '',
        serial_number: '',
        issue_type: 'general',
        description: ''
      });
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
        <section className="min-h-[40vh] flex items-center justify-center bg-[#0a0a0b] pt-20">
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

        {/* Support Form Section */}
        <section className="section-spacing bg-[#141416]">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="heading-subsection text-[#f5f5f7] mb-2">
                  FACING A TECHNICAL ANOMALY?
                </h2>
                <p className="text-body mb-8">
                  Fill out the report below. Our support team will analyze the situation and reach back to you.
                </p>

                {submitStatus === 'success' ? (
                  <div className="p-8 bg-[#0a0a0b] border border-green-500/30">
                    <div className="flex items-center gap-3 text-green-500 mb-4">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-lg font-medium">Report Submitted Successfully</span>
                    </div>
                    <p className="text-[#a1a1aa]">
                      Our support team will analyze the situation and reach back to you within 24-48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                          className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={ticketForm.phone}
                          onChange={(e) => setTicketForm({...ticketForm, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">Email ID *</label>
                      <input
                        type="email"
                        required
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Device Name *</label>
                        <select
                          required
                          value={ticketForm.device_name}
                          onChange={(e) => setTicketForm({...ticketForm, device_name: e.target.value})}
                          className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                        >
                          <option value="">Select device</option>
                          <option value="C60 Pro">C60 Pro</option>
                          <option value="C60 Plus">C60 Plus</option>
                          <option value="C60">C60</option>
                          <option value="C50 Pro">C50 Pro</option>
                          <option value="C50 Plus">C50 Plus</option>
                          <option value="C50">C50</option>
                          <option value="C40">C40</option>
                          <option value="C30">C30</option>
                          <option value="C20">C20</option>
                          <option value="C10">C10</option>
                          <option value="HS2">HS2</option>
                          <option value="HS1">HS1</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Serial Number</label>
                        <input
                          type="text"
                          value={ticketForm.serial_number}
                          onChange={(e) => setTicketForm({...ticketForm, serial_number: e.target.value})}
                          className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                          placeholder="e.g., BLU-XXXX-XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">Issue Category *</label>
                      <select
                        required
                        value={ticketForm.issue_type}
                        onChange={(e) => setTicketForm({...ticketForm, issue_type: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="connectivity">Comms & Connectivity</option>
                        <option value="audio">Audio & Sound</option>
                        <option value="hardware">Hardware & Mounting</option>
                        <option value="app">App & Updates</option>
                        <option value="warranty">Warranty Claim</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">Description *</label>
                      <textarea
                        required
                        rows={5}
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#27272a] text-[#f5f5f7] focus:border-[#2563eb] focus:outline-none resize-none"
                        placeholder="Please describe your issue in detail..."
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-3 text-red-500 p-4 bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-5 h-5" />
                        <span>Failed to submit. Please try again.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Report
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <div className="p-8 bg-[#0a0a0b] border border-[#27272a] mb-8">
                  <h3 className="heading-subsection text-[#f5f5f7] mb-6">
                    OR REACH OUT DIRECTLY
                  </h3>
                  <div className="space-y-6">
                    <a
                      href={`tel:${supportContact.phone}`}
                      className="flex items-center gap-4 p-4 bg-[#141416] border border-[#27272a] hover:border-[#2563eb] transition-colors"
                    >
                      <div className="w-12 h-12 bg-[#1a1a1e] flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#2563eb]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#71717a] uppercase tracking-wider">Call Us</p>
                        <p className="text-lg font-medium text-[#f5f5f7]">{supportContact.phone}</p>
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/${supportContact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#141416] border border-[#27272a] hover:border-[#2563eb] transition-colors"
                    >
                      <div className="w-12 h-12 bg-[#1a1a1e] flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-[#2563eb]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#71717a] uppercase tracking-wider">WhatsApp</p>
                        <p className="text-lg font-medium text-[#f5f5f7]">{supportContact.whatsapp}</p>
                      </div>
                    </a>
                  </div>
                  <p className="text-sm text-[#71717a] mt-6">
                    We're available {supportContact.hours}. Feel free to reach out during our working hours and our team will be happy to assist you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-spacing bg-[#0a0a0b]">
          <div className="container-wide">
            <div className="mb-12">
              <span className="text-label text-[#2563eb] mb-4 block">Common Issues and Fixes</span>
              <h2 className="heading-section text-[#f5f5f7]">
                TROUBLESHOOTING GUIDE
              </h2>
              <p className="text-body mt-4 max-w-2xl">
                Here are the most common friction points, written in our "Rider-to-Rider" voice—direct, practical, and solution-oriented.
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-6">
              {faqCategories.map((category) => (
                <div key={category.id} className="border border-[#27272a]">
                  {/* Category Header */}
                  <button
                    onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                    className="w-full flex items-center justify-between p-6 bg-[#141416] text-left"
                  >
                    <span className="text-sm font-medium tracking-wider uppercase text-[#f5f5f7]">
                      {category.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#71717a] transition-transform duration-200 ${
                        openCategory === category.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Category Questions */}
                  {openCategory === category.id && (
                    <div className="border-t border-[#27272a]">
                      {category.items.map((item, index) => (
                        <div key={index} className="border-b border-[#27272a] last:border-b-0">
                          <button
                            onClick={() => toggleFaq(category.id, index)}
                            className="w-full flex items-start justify-between p-6 text-left hover:bg-[#141416]/50"
                          >
                            <span className="font-medium text-[#a1a1aa] pr-4">
                              Q: "{item.question}"
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-[#71717a] flex-shrink-0 mt-1 transition-transform duration-200 ${
                                openFaq === `${category.id}-${index}` ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {openFaq === `${category.id}-${index}` && (
                            <div className="px-6 pb-6">
                              <p className="text-[#f5f5f7] bg-[#141416] p-4 border-l-2 border-[#2563eb]">
                                <span className="text-[#2563eb] font-medium">The Fix: </span>
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
