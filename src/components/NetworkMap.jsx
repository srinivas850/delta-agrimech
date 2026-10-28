import React, { useState } from 'react';
import { NETWORK_STATES, BRAND } from '../data/siteData';
import './NetworkMap.css';

export default function NetworkMap() {
  const [selectedState, setSelectedState] = useState('ALL');

  // Filter out the 'ALL' entry for state card rendering
  const individualStates = NETWORK_STATES.filter((s) => s.code !== 'ALL');

  const displayedStates =
    selectedState === 'ALL'
      ? individualStates
      : individualStates.filter((s) => s.code === selectedState);

  return (
    <section id="network" className="section section-dark network-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="network-badge">Presence</span>
          <h2 className="section-title">Dealer & Service Network</h2>
          <div className="section-header-bar" />
          <p className="section-subtitle">
            15 authorized sales, service, and spare parts hubs across Andhra Pradesh,
            Telangana, Tamil Nadu, and Karnataka ensuring prompt farmer support.
          </p>
        </div>

        {/* State Filter Pills */}
        <div className="network-tabs">
          {NETWORK_STATES.map((st) => (
            <button
              key={st.code}
              type="button"
              className={`network-tab ${selectedState === st.code ? 'network-tab--active' : ''}`}
              onClick={() => setSelectedState(st.code)}
            >
              <span>{st.name}</span>
              <span className="network-tab__count">{st.count}</span>
            </button>
          ))}
        </div>

        {/* State Network Cards Grid */}
        <div className="network-grid">
          {displayedStates.map((st) => (
            <div key={st.code} className="network-state-card">
              {/* Card Header */}
              <div className="network-state-card__header">
                <div>
                  <span className="network-state-card__tag">{st.code}</span>
                  <h3 className="network-state-card__title">{st.name}</h3>
                </div>
                <span className="network-state-card__count-badge">
                  {st.count} {st.count === 1 ? 'Location' : 'Locations'}
                </span>
              </div>

              {/* City Chips */}
              <div className="network-city-chips">
                {st.cities.map((city) => {
                  const isMainHub = city.includes('Vijayawada');
                  return (
                    <div
                      key={city}
                      className={`network-chip ${isMainHub ? 'network-chip--hq' : ''}`}
                    >
                      <span className="network-chip__icon">{isMainHub ? '⭐' : '📍'}</span>
                      <span className="network-chip__name">{city}</span>
                    </div>
                  );
                })}
              </div>

              {/* Service Capabilities */}
              <div className="network-state-card__services">
                <span className="service-pill">🚜 Machine Sales</span>
                <span className="service-pill">🔧 Certified Service</span>
                <span className="service-pill">⚙️ Genuine Spares</span>
              </div>

              {/* Action */}
              <div className="network-state-card__footer">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="btn btn-primary network-state-card__btn"
                >
                  📞 Contact Hub: +91 {BRAND.phone}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="network-stats-strip">
          <div className="network-stat-box">
            <span className="network-stat-box__num">4</span>
            <span className="network-stat-box__label">States Covered</span>
          </div>
          <div className="network-stat-divider" />
          <div className="network-stat-box">
            <span className="network-stat-box__num">15</span>
            <span className="network-stat-box__label">Authorized Network Hubs</span>
          </div>
          <div className="network-stat-divider" />
          <div className="network-stat-box">
            <span className="network-stat-box__num">Vijayawada</span>
            <span className="network-stat-box__label">Central Headquarters</span>
          </div>
          <div className="network-stat-divider" />
          <div className="network-stat-box">
            <span className="network-stat-box__num">Prompt</span>
            <span className="network-stat-box__label">On-Field Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
