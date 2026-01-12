import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'BLU3 E', href: '#' },
      { label: 'BLU5 Pro', href: '#' },
      { label: 'BLU7 Ultra', href: '#' },
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
