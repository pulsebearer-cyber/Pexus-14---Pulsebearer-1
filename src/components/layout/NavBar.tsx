import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTowingOpen, setMobileTowingOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileTowingOpen(false);
    setMobileServicesOpen(false);
    setMobileCompanyOpen(false);
  }, [location.pathname]);

  const towingServices = [
    { title: 'Emergency Towing', path: '/towing' },
    { title: 'Service Areas Directory', path: '/service-areas' }
  ];

  const otherServices = [
    { title: 'All Services', path: '/services' },
    { title: 'Auto Repairs & Diagnostics', path: '/repairs' },
    { title: 'Body Works & Spray Painting', path: '/body-works' },
    { title: 'Genuine Auto Parts', path: '/parts' },
    { title: 'Commercial Fleet Maintenance', path: '/fleet' }
  ];

  const isLightNav = isScrolled || location.pathname !== '/';
  const logoSrc = isLightNav 
    ? 'https://i.ibb.co/rS4MyLS/Pexus-Logo-Dark-Version.png'
    : 'https://i.ibb.co/jjG8ysr/Pexus-Logo-White-Version.png';

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isLightNav 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5 text-dark translate-y-0" 
          : "bg-secondary/90 backdrop-blur-md text-white py-4 translate-y-0 lg:translate-y-9 border-b border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoSrc} 
            alt="Pexus Logo" 
            className="h-10 md:h-11 w-auto object-contain transition-opacity duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-logo')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-logo flex items-center gap-2';
                fallback.innerHTML = `
                  <div class="bg-accent p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white w-6 h-6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                  </div>
                  <span class="font-bold text-xl md:text-2xl tracking-tight text-inherit">
                    Pexus
                  </span>
                `;
                parent.appendChild(fallback);
              }
            }}
          />
        </Link>

        {/* Desktop Nav (Large Screens) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          
          {/* Towing Services Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1 hover:text-accent transition-colors py-2">
              Towing Services <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
              {towingServices.map(s => (
                <Link 
                  key={s.title} 
                  to={s.path} 
                  className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/haulage" className="hover:text-accent transition-colors font-semibold flex items-center gap-1">
            Haulage Services
          </Link>

          {/* Other Services Dropdown */}
          <div className="relative group cursor-pointer">
            <Link to="/services" className="flex items-center gap-1 hover:text-accent transition-colors py-2">
              Other Services <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
              {otherServices.map(s => (
                <Link 
                  key={s.title} 
                  to={s.path} 
                  className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
          <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            to="/search" 
            className="hidden sm:flex items-center justify-center p-2.5 rounded-full hover:bg-white/10 transition-colors text-inherit"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5" />
          </Link>
          <a 
            href="tel:0597684860" 
            className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 font-semibold text-sm transition-all shadow-md shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 rounded-full"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now: 0597684860</span>
          </a>
          <button 
            className="lg:hidden p-2 text-inherit rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white text-dark shadow-2xl absolute top-full left-0 right-0 border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 font-medium divide-y divide-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 rounded-full">Home</Link>
              <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 flex items-center gap-2 rounded-full">
                <SearchIcon className="w-4 h-4" />
                <span>Search</span>
              </Link>

              {/* Haulage Services Direct Mobile Link */}
              <Link 
                to="/haulage" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 flex items-center justify-between font-bold text-accent rounded-full"
              >
                <span>Haulage Services</span>
                <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 font-bold uppercase">Heavy Transport</span>
              </Link>
              
              {/* Towing Services Accordion */}
              <div className="flex flex-col shrink-0">
                <button 
                  onClick={() => setMobileTowingOpen(!mobileTowingOpen)}
                  className="flex justify-between items-center py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors w-full text-left rounded-full"
                >
                  <span>Towing Services</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileTowingOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobileTowingOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col bg-slate-50 rounded-[1px] my-1 py-1"
                    >
                      {towingServices.map(s => (
                        <Link 
                          key={s.title}
                          to={s.path} 
                          onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-6 hover:text-accent text-sm font-medium"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Services Accordion */}
              <div className="flex flex-col shrink-0">
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex justify-between items-center py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors w-full text-left rounded-full"
                >
                  <span>Other Services</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col bg-slate-50 rounded-[1px] my-1 py-1"
                    >
                      {otherServices.map(s => (
                        <Link 
                          key={s.title} 
                          to={s.path} 
                          onClick={() => setMobileMenuOpen(false)} 
                          className="py-2.5 px-6 hover:text-accent text-sm font-medium"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Company Accordion */}
              <div className="flex flex-col shrink-0">
                <button 
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="flex justify-between items-center py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors w-full text-left rounded-full"
                >
                  <span>Company &amp; Resources</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileCompanyOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobileCompanyOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col bg-slate-50 rounded-[1px] my-1 py-1"
                    >
                      <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-6 hover:text-accent text-sm font-medium">Gallery</Link>
                      <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-6 hover:text-accent text-sm font-medium">Blog</Link>
                      <Link to="/sitemap" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-6 hover:text-accent text-sm font-medium">Sitemap</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 rounded-full">Contact</Link>
              
              <div className="pt-4 pb-2 px-2 shrink-0">
                <a 
                  href="tel:0597684860" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3.5 font-semibold transition-all text-center flex items-center justify-center gap-2 shadow-md rounded-full"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now: 0597684860</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
