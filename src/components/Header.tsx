'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;
  const isHomePage = pathname === '/';
  const desktopLinkColor = isScrolled ? 'text-[var(--text-muted)]' : 'text-[var(--text-main)]';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu on escape key and handle body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Simple body scroll lock without jumping to top
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY.replace('-', '')));
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Admin sayfasında Header'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[rgba(247,242,234,0.88)] backdrop-blur-xl shadow-lg border-b border-[rgba(232,220,203,0.7)]' 
        : 'bg-[var(--bg-main)] lg:bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative transition-all duration-300">
              <Image 
                src="/davines_logo"
                alt="Davines Logo"
                width={210}
                height={84}
                className="h-9 w-auto sm:h-10 md:h-11 lg:h-12 group-hover:scale-[1.02] transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-soft)] hover:text-[var(--accent)] ${
              desktopLinkColor
            }`}>
              Ana Sayfa
            </Link>
            <Link href="/hizmetlerimiz" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-soft)] hover:text-[var(--accent)] ${
              desktopLinkColor
            }`}>
              Hizmetlerimiz
            </Link>
            <Link href="/galeri" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-soft)] hover:text-[var(--accent)] ${
              desktopLinkColor
            }`}>
              Galeri
            </Link>
            <Link href="/haberler" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-soft)] hover:text-[var(--accent)] ${
              desktopLinkColor
            }`}>
              Haberler
            </Link>
            <Link href="/hakkimizda" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-soft)] hover:text-[var(--accent)] ${
              desktopLinkColor
            }`}>
              Hakkımızda
            </Link>
            <Link href="/iletisim" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-soft)] hover:text-[var(--accent)] ${
              desktopLinkColor
            }`}>
              İletişim
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-soft)] transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-[var(--text-muted)] transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-[var(--text-muted)] transition-all duration-300 my-1 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-[var(--text-muted)] transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Portal */}
        {isMenuOpen && typeof window !== 'undefined' && createPortal(
          <div className="lg:hidden fixed inset-0 z-[9999] bg-[var(--bg-main)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bg-soft)]">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Image 
                  src="/davines_logo"
                  alt="Davines Logo"
                  width={140}
                  height={56}
                  className="h-9 w-auto"
                  priority
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--bg-soft)] transition-colors duration-200"
                aria-label="Close mobile menu"
              >
                <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <div className="space-y-3">
                <Link 
                  href="/" 
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors duration-200" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ana Sayfa
                </Link>
                <Link 
                  href="/hizmetlerimiz" 
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors duration-200" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hizmetlerimiz
                </Link>
                <Link 
                  href="/galeri" 
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors duration-200" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Galeri
                </Link>
                <Link 
                  href="/haberler" 
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors duration-200" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Haberler
                </Link>
                <Link 
                  href="/hakkimizda" 
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors duration-200" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hakkımızda
                </Link>
                <Link 
                  href="/iletisim" 
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors duration-200" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  İletişim
                </Link>
              </div>
            </nav>
          </div>,
          document.body
        )}
      </div>
    </header>
  );
};

export default Header;
