import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ShoppingCart } from 'lucide-react';
import { navigationLinks } from '../../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0b]/95 backdrop-blur-sm border-b border-[#27272a]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tight text-[#f5f5f7]">
                BLU<span className="text-[#2563eb]">ARMOR</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-150 ${
                  location.pathname === link.href
                    ? 'text-[#f5f5f7]'
                    : 'text-[#a1a1aa] hover:text-[#f5f5f7]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Cart & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link
              to="/products"
              className="btn-primary text-sm px-6 py-3"
            >
              Explore the 2026 Armoury
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#f5f5f7]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#141416] border-t border-[#27272a]">
            <div className="py-6 px-4 space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-sm font-medium tracking-wider uppercase text-[#a1a1aa] hover:text-[#f5f5f7] py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/products"
                className="btn-primary w-full mt-4 text-sm"
              >
                Explore the 2026 Armoury
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
