import React from 'react';
import { CONTACT, BRAND } from '../data/siteData';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home',            href: '#home' },
  { label: 'Products',        href: '#products' },
  { label: 'Video Gallery',   href: '#gallery' },
  { label: 'Become a Dealer', href: '#dealer' },
  { label: 'Dealer Network',  href: '#network' },
  { label: 'Contact Us',      href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand column */}
        <div className="footer__col footer__col--brand">
          <a href="#home" className="footer__logo-link">
            <img
              src={BRAND.logoUrl}
              alt="Delta Agrimech"
              className="footer__logo-img"
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
            <div className="footer__logo" style={{ display: 'none' }}>
              <span className="footer__logo-delta">DELTA</span>
              <span className="footer__logo-agrimech">AGRIMECH</span>
            </div>
          </a>
          <p className="footer__tagline">
            Powering India's agricultural future with premium machinery built for
            performance, reliability, and productivity.
          </p>
          <a href={`tel:${BRAND.phone}`} className="footer__phone">
            📞 +91 {BRAND.phone}
          </a>
        </div>

        {/* Quick links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Head Office */}
        <div className="footer__col">
          <h4 className="footer__col-title">Head Office</h4>
          <p className="footer__address">{CONTACT.headOffice.address}</p>
          <a href={`tel:${CONTACT.headOffice.phone}`} className="footer__addr-phone">
            📞 +91 {CONTACT.headOffice.phone}
          </a>
        </div>

        {/* Authorized Distributor: Vijayawada & 9848557862 */}
        <div className="footer__col">
          <h4 className="footer__col-title">Authorized Distributor</h4>
          <p className="footer__address">
            📍 <strong>{CONTACT.distributor.address}</strong>
          </p>
          <a href={`tel:${CONTACT.distributor.phone}`} className="footer__addr-phone">
            📞 +91 {CONTACT.distributor.phone}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {year} Sreshta Impex LLP. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <span className="footer__built">
              Premium Agricultural Machinery | Made for India
            </span>
            <span className="footer__sep"> • </span>
            <a href="/admin/enquiries" className="footer__admin-link" title="Staff Admin Dashboard">
              🔒 Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
