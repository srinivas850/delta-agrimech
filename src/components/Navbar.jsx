import React, { useState, useEffect } from 'react';
import { BRAND } from '../data/siteData';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',            href: '#home' },
  { label: 'Products',        href: '#products' },
  { label: 'Video Gallery',   href: '#gallery' },
  { label: 'Become a Dealer', href: '#dealer' },
  { label: 'Network',         href: '#network' },
  { label: 'Contact Us',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">
        {/* Left: Delta Agrimech Logo (+ Sreshta Impex side-by-side on Mobile) */}
        <div className="navbar__left">
          <a href="#home" className="navbar__logo" onClick={() => handleLinkClick('#home')}>
            <img
              src={BRAND.logoUrl}
              alt="Delta Agrimech"
              className="navbar__logo-img"
              onError={(e) => {
                if (e.target.src !== window.location.origin + BRAND.localLogoUrl && !e.target.dataset.triedLocal) {
                  e.target.dataset.triedLocal = 'true';
                  e.target.src = BRAND.localLogoUrl;
                } else {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }
              }}
            />
            <div className="navbar__logo-fallback" style={{ display: 'none' }}>
              <span className="navbar__logo-delta">DELTA</span>
              <span className="navbar__logo-agrimech">AGRIMECH</span>
            </div>
          </a>

          {/* Sreshta Impex LLP shown side-by-side with Delta Agrimech on Mobile */}
          <div className="navbar__sreshta navbar__sreshta--mobile">
            <span className="navbar__brand-divider" />
            <img
              src={BRAND.sreshtaLogoUrl}
              alt="Sreshta Impex LLP"
              className="navbar__sreshta-img"
            />
            <span className="navbar__sreshta-text">Sreshta Impex LLP</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeLink === link.href ? 'navbar__link--active' : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Sreshta Impex LLP (Desktop) + Call CTA + Hamburger */}
        <div className="navbar__right">
          {/* Sreshta Impex LLP shown on the right on Desktop */}
          <div className="navbar__sreshta navbar__sreshta--desktop">
            <img
              src={BRAND.sreshtaLogoUrl}
              alt="Sreshta Impex LLP"
              className="navbar__sreshta-img"
            />
            <span className="navbar__sreshta-text">Sreshta Impex LLP</span>
          </div>

          {/* CTA */}
          <a href="tel:9912000499" className="btn btn-accent navbar__cta" aria-label="Call Sreshta Impex LLP">
            📞 Call Now
          </a>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeLink === link.href ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="tel:9912000499" className="btn btn-accent" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
              📞 Call Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
