import React from 'react';
import { BRAND } from '../data/siteData';
import './NetworkMap.css';

export default function NetworkMap() {
  return (
    <section id="network" className="section section-dark network-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="network-badge">Presence</span>
          <h2 className="section-title">Dealer & Service Network</h2>
          <div className="section-header-bar" />
          <p className="section-subtitle">
            Pan-India authorized sales, service, and spare parts network across Andhra Pradesh,
            Telangana, Karnataka, and Tamil Nadu.
          </p>
        </div>

        {/* Map Showcase Image Only */}
        <div className="network-map-showcase">
          <div className="network-map-image-card">
            <img
              src="https://res.cloudinary.com/dhge37es8/image/upload/v1793191187/India_Map_with_Glowing_Regional_Highlights.png"
              alt="India Map with Glowing Regional Highlights — Andhra Pradesh, Telangana, Karnataka, Tamil Nadu"
              className="network-map-img"
              loading="lazy"
            />
            <div className="network-map-overlay-badge">
              <span className="network-map-overlay-dot" />
              <span>Active Regional Hubs: AP • TS • KA • TN</span>
            </div>
          </div>
        </div>

        {/* Quick Connect Strip */}
        <div className="network-connect-strip">
          <p className="network-connect-strip__text">
            Looking for an authorized dealer or certified service center in your region?
          </p>
          <div className="network-connect-strip__actions">
            <a href={`tel:${BRAND.phone}`} className="btn btn-accent">
              📞 Call Now: +91 {BRAND.phone}
            </a>
            <a href="#dealer" className="btn btn-outline">
              Become a Dealer →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
