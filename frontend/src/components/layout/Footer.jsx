import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '../../services/api';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    setSubscribeStatus(null);

    try {
      await subscribeNewsletter(email);
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus(null), 5000);
    } catch (error) {
      if (error.response?.status === 400) {
        setSubscribeStatus('already');
      } else {
        setSubscribeStatus('error');
      }
      setTimeout(() => setSubscribeStatus(null), 5000);
    } finally {
      setSubscribing(false);
    }
  };

  const footerLinks = {
    product: [
      { label: 'BLU3 E', href: '#products' },
      { label: 'BLU5 Pro', href: '#products' },
      { label: 'BLU7 Ultra', href: '#products' },
      { label: 'Accessories', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    support: [
      { label: 'Help Centre', href: '/support' },
      { label: 'Warranty', href: '#' },
      { label: 'Service Centres', href: '#' },
      { label: 'Downloads', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-[#0a0a0b] border-t border-[#27272a]">
      <div className="container-wide">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-[#27272a]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-medium text-[#f5f5f7] mb-1">Stay Connected</h4>
              <p className="text-sm text-[#71717a]">Get updates on new products and features.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-[#141416] border border-[#27272a] text-[#f5f5f7] text-sm focus:border-[#2563eb] focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={subscribing}
                className="btn-primary text-sm px-6"
              >
                {subscribing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
          {subscribeStatus && (
            <div className={`mt-4 flex items-center gap-2 text-sm ${
              subscribeStatus === 'success' ? 'text-green-500' : 
              subscribeStatus === 'already' ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {subscribeStatus === 'success' ? (
                <><CheckCircle className="w-4 h-4" /> Successfully subscribed!</>
              ) : subscribeStatus === 'already' ? (
                <><AlertCircle className="w-4 h-4" /> Email already subscribed.</>
              ) : (
                <><AlertCircle className="w-4 h-4" /> Failed to subscribe. Please try again.</>
              )}
            </div>
          )}
        </div>

        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight text-[#f5f5f7]">
                BLU<span className="text-[#2563eb]">ARMOR</span>
              </span>
            </Link>
            <p className="text-sm text-[#71717a] leading-relaxed mb-6">
              Engineered to disappear.
              Built to last.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:support@bluarmor.com"
                className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@bluarmor.com
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 123 456 7890
              </a>
              <div className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-[#71717a] mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-[#71717a] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-[#71717a] mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-[#71717a] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#71717a]">
            © {currentYear} Bluarmor Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-[#71717a]">
            Made in India. For the World.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
