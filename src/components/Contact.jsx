import React from 'react';
import { CONTACT, BRAND } from '../data/siteData';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="contact__badge">Get in Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <div className="section-header-bar" />
          <p className="section-subtitle">
            Reach us or contact us directly:
          </p>
        </div>

        {/* Contact cards */}
        <div className="contact__cards contact__cards--centered">
          {/* Location */}
          <div className="contact-card">
            <div className="contact-card__header">
              <span className="contact-card__icon">📍</span>
              <h3 className="contact-card__label">Location</h3>
            </div>
            <p className="contact-card__city">{CONTACT.city}</p>
            <p className="contact-card__address">
              {CONTACT.city}, {CONTACT.state}
            </p>
          </div>

          {/* Contact Number */}
          <div className="contact-card">
            <div className="contact-card__header">
              <span className="contact-card__icon">📞</span>
              <h3 className="contact-card__label">Contact Number</h3>
            </div>
            <a href={`tel:${CONTACT.phone}`} className="contact-card__phone-large">
              {CONTACT.displayPhone}
            </a>
            <p className="contact-card__subtext">
              Available for machinery enquiries & dealership support
            </p>
            <a href={`tel:${CONTACT.phone}`} className="btn btn-primary contact-card__btn">
              📞 Call Now
            </a>
          </div>
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
