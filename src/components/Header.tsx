import React, { useState, useEffect } from 'react';
import './Header.css';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#hero" className="header__brand" onClick={closeMenu}>
          <span className="header__brand-title">Hyderabad Goa Transport</span>
          <span className="header__brand-badge">HGT</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Main Navigation">
          <ul className="header__menu">
            <li><a href="#hero" className="header__link">Home</a></li>
            <li><a href="#about" className="header__link">About</a></li>
            <li><a href="#services" className="header__link">Services</a></li>
            <li><a href="#coverage" className="header__link">Route</a></li>
            <li>
              <a href="tel:+919849302205" className="header__phone-link">
                <span className="header__phone-icon">📞</span>
                <span>+91 98493 02205</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="header__cta-btn">
                Inquire Cargo
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`header__mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Dropdown Menu */}
        <div className={`header__mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
          <ul className="header__mobile-list">
            <li><a href="#hero" className="header__mobile-link" onClick={closeMenu}>Home</a></li>
            <li><a href="#about" className="header__mobile-link" onClick={closeMenu}>About Us</a></li>
            <li><a href="#services" className="header__mobile-link" onClick={closeMenu}>Services</a></li>
            <li><a href="#coverage" className="header__mobile-link" onClick={closeMenu}>Corridor Route</a></li>
            <li>
              <a href="#contact" className="header__mobile-cta" onClick={closeMenu}>
                Contact & Inquire
              </a>
            </li>
            <li className="header__mobile-contact-wrap">
              <a href="tel:+919849302205" className="header__mobile-phone" onClick={closeMenu}>
                📞 Call: +91 98493 02205
              </a>
              <a href="mailto:Hyderabadgoa1977@gmail.com" className="header__mobile-email" onClick={closeMenu}>
                ✉ Hyderabadgoa1977@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
