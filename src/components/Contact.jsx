import React from 'react';
import { CONTACT, BRAND } from '../data/siteData';
import './Contact.css';

export default function Contact() {
  const { headOffice, branchOffice, distributor } = CONTACT;

  return (
    <section id="contact" className="section contact">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="contact__badge">Find Us</span>
          <h2 className="section-title">Contact Us</h2>
          <div className="section-header-bar" />
          <p className="section-subtitle">
            Reach out to our offices or connect with our authorized distributor in Vijayawada.
          </p>
        </div>

        {/* Contact cards */}
        <div className="contact__cards">
          {/* Head Office */}
          <ContactCard
            type="head"
            label={headOffice.label}
            icon="🏢"
            address={headOffice.address}
            phone={headOffice.phone}
            showCallBtn
          />

          {/* Branch Office */}
          <ContactCard
            type="branch"
            label={branchOffice.label}
            icon="📍"
            address={branchOffice.address}
            phone={branchOffice.phone}
          />

          {/* Authorized Distributor */}
          <ContactCard
            type="distributor"
            label={distributor.label}
            icon="🤝"
            address={distributor.address}
            phone={distributor.phone}
            showCallBtn
          />
        </div>

        {/* Emergency / quick call strip */}
        <div className="contact__call-strip">
          <div className="contact__call-strip-text">
            <span className="contact__call-strip-icon">📞</span>
            <span>Need immediate assistance or machine enquiry?</span>
          </div>
          <a href={`tel:${BRAND.phone}`} className="btn btn-accent contact__call-btn">
            Call Now: +91 {BRAND.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable Contact Card ───────────────────────────────── */
function ContactCard({ label, icon, address, phone, showCallBtn }) {
  return (
    <div className="contact-card">
      <div className="contact-card__header">
        <span className="contact-card__icon">{icon}</span>
        <h3 className="contact-card__label">{label}</h3>
      </div>

      <p className="contact-card__address">
        <span className="contact-card__addr-icon">📌</span>
        {address}
      </p>

      {phone && (
        <a href={`tel:${phone}`} className="contact-card__phone">
          <span>📞</span> +91 {phone}
        </a>
      )}

      {showCallBtn && phone && (
        <a href={`tel:${phone}`} className="btn btn-primary contact-card__btn">
          📞 Call Now
        </a>
      )}
    </div>
  );
}
