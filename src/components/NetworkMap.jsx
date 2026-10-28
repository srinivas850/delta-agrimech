import React, { useState } from 'react';
import { NETWORK_LOCATIONS, NETWORK_STATES, BRAND } from '../data/siteData';
import './NetworkMap.css';

export default function NetworkMap() {
  const [activeState, setActiveState] = useState('ALL');
  const [selectedLoc, setSelectedLoc] = useState(
    NETWORK_LOCATIONS.find((l) => l.isHub) || NETWORK_LOCATIONS[0]
  );

  const filteredLocations =
    activeState === 'ALL'
      ? NETWORK_LOCATIONS
      : NETWORK_LOCATIONS.filter((l) => l.stateCode === activeState);

  return (
    <section id="network" className="section section-dark network-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="network-badge">Presence</span>
          <h2 className="section-title">Dealer & Service Network</h2>
          <div className="section-header-bar" />
          <p className="section-subtitle">
            Strategically located sales, support, and spare parts hubs across Andhra Pradesh,
            Telangana, Karnataka, and Tamil Nadu ensuring rapid farmer support.
          </p>
        </div>

        {/* State Filter Tabs */}
        <div className="network-tabs">
          {NETWORK_STATES.map((st) => (
            <button
              key={st.code}
              type="button"
              className={`network-tab ${activeState === st.code ? 'network-tab--active' : ''}`}
              onClick={() => setActiveState(st.code)}
            >
              <span className="network-tab__name">{st.name}</span>
              <span className="network-tab__count">{st.count}</span>
            </button>
          ))}
        </div>

        {/* Main Content: Map Visual + Location Explorer */}
        <div className="network-content">
          {/* Left: Interactive India Map Visual */}
          <div className="network-map-wrap">
            <div className="network-map-header">
              <div className="network-map-header__title">
                <span className="network-map-header__dot" />
                <span>Interactive Network Map</span>
              </div>
              <span className="network-map-header__hint">Click a pin to view hub details</span>
            </div>

            <div className="network-map-container">
              {/* Decorative SVG India Regional Map */}
              <svg
                viewBox="0 0 100 100"
                className="network-map-svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* Subtle Grid Pattern */}
                  <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="0.4"
                    />
                  </pattern>

                  {/* Gradient for Landmass */}
                  <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#15331d" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#1f4c28" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#102b17" stopOpacity="0.85" />
                  </linearGradient>

                  {/* Highlight Gradient for South States */}
                  <linearGradient id="southHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#296c34" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#608a10" stopOpacity="0.35" />
                  </linearGradient>
                </defs>

                {/* Background Grid */}
                <rect width="100" height="100" fill="url(#gridPattern)" />

                {/* Stylized India Landmass Outline (Focus on Southern Peninsula) */}
                <path
                  className="map-landmass"
                  d="
                    M 35 12
                    C 42 10, 52 14, 55 18
                    C 58 24, 70 28, 76 34
                    C 80 40, 78 48, 74 54
                    C 70 60, 64 68, 58 78
                    C 54 84, 52 90, 50 94
                    C 48 94, 46 88, 43 82
                    C 38 72, 32 66, 30 56
                    C 28 48, 30 38, 28 32
                    C 26 24, 30 16, 35 12
                    Z
                  "
                  fill="url(#indiaGrad)"
                  stroke="rgba(153, 202, 60, 0.35)"
                  strokeWidth="0.8"
                />

                {/* Active States Region Glow (AP, TS, KA, TN) */}
                <path
                  className="map-active-states"
                  d="
                    M 32 40
                    C 45 36, 68 38, 75 48
                    C 72 58, 64 72, 57 82
                    C 53 88, 50 94, 49 94
                    C 46 88, 42 78, 36 68
                    C 33 58, 31 48, 32 40
                    Z
                  "
                  fill="url(#southHighlight)"
                  stroke="rgba(153, 202, 60, 0.6)"
                  strokeWidth="0.6"
                  strokeDasharray="2, 1"
                />

                {/* State Label Callouts */}
                <text x="62" y="47" className="map-state-text">ANDHRA PRADESH</text>
                <text x="38" y="44" className="map-state-text">TELANGANA</text>
                <text x="32" y="62" className="map-state-text">KARNATAKA</text>
                <text x="46" y="82" className="map-state-text">TAMIL NADU</text>

                {/* Radar Grid Circles around Vijayawada (HQ) */}
                <circle cx="57" cy="55" r="8" fill="none" stroke="rgba(153, 202, 60, 0.2)" strokeWidth="0.4" />
                <circle cx="57" cy="55" r="16" fill="none" stroke="rgba(153, 202, 60, 0.12)" strokeWidth="0.3" strokeDasharray="1, 1" />
              </svg>

              {/* HTML Pin Overlays for absolute responsiveness and crisp interaction */}
              {NETWORK_LOCATIONS.map((loc) => {
                const isSelected = selectedLoc && selectedLoc.id === loc.id;
                const isFilteredOut =
                  activeState !== 'ALL' && loc.stateCode !== activeState;

                return (
                  <button
                    key={loc.id}
                    type="button"
                    className={`map-pin ${isSelected ? 'map-pin--selected' : ''} ${
                      loc.isHub ? 'map-pin--hub' : ''
                    } ${isFilteredOut ? 'map-pin--dimmed' : ''}`}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    onClick={() => setSelectedLoc(loc)}
                    aria-label={`${loc.name}, ${loc.state}`}
                  >
                    {/* Pulsing Radar Ring */}
                    <span className="map-pin__pulse" />

                    {/* Pin Marker Core */}
                    <span className="map-pin__core">
                      {loc.isHub ? '★' : '•'}
                    </span>

                    {/* Tooltip / Label */}
                    <span className="map-pin__label">
                      <strong>{loc.name}</strong>
                      <span className="map-pin__state-tag">{loc.stateCode}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="network-map-legend">
              <div className="network-map-legend__item">
                <span className="legend-dot legend-dot--hub" />
                <span>Central HQ (Vijayawada)</span>
              </div>
              <div className="network-map-legend__item">
                <span className="legend-dot legend-dot--dealer" />
                <span>Authorized Dealer & Service Hub</span>
              </div>
              <div className="network-map-legend__item">
                <span className="legend-dot legend-dot--active" />
                <span>Active Region (AP, TS, TN, KA)</span>
              </div>
            </div>
          </div>

          {/* Right: Selected Location Detail & Hub List */}
          <div className="network-sidebar">
            {/* Active Hub Spotlight Card */}
            {selectedLoc && (
              <div className="network-spotlight">
                <div className="network-spotlight__header">
                  <span className="network-spotlight__badge">
                    {selectedLoc.isHub ? '⭐ Central HQ & Main Hub' : '📍 Authorized Network Location'}
                  </span>
                  <span className="network-spotlight__state">{selectedLoc.state}</span>
                </div>

                <h3 className="network-spotlight__name">{selectedLoc.name}</h3>

                <p className="network-spotlight__desc">
                  {selectedLoc.isHub
                    ? 'Primary headquarters, flagship machinery display, customer training, and master spare-parts distribution center for India.'
                    : `Authorized sales point, certified machinery technicians, and prompt spares delivery covering ${selectedLoc.name} and surrounding farming clusters.`}
                </p>

                <div className="network-spotlight__features">
                  <span className="spotlight-feature">🚜 Machine Sales</span>
                  <span className="spotlight-feature">🔧 Genuine Service</span>
                  <span className="spotlight-feature">⚙️ Original Spares</span>
                </div>

                <div className="network-spotlight__actions">
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="btn btn-accent network-spotlight__btn"
                  >
                    📞 Call Hub: +91 {BRAND.phone}
                  </a>
                  <a href="#dealer" className="btn btn-outline network-spotlight__btn">
                    Dealer Enquiry
                  </a>
                </div>
              </div>
            )}

            {/* Location Cards Grid */}
            <div className="network-city-list">
              <div className="network-city-list__title">
                <span>Locations in {activeState === 'ALL' ? 'South India' : activeState} ({filteredLocations.length})</span>
              </div>

              <div className="network-city-cards">
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLoc && selectedLoc.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      className={`network-city-card ${
                        isSelected ? 'network-city-card--active' : ''
                      }`}
                      onClick={() => setSelectedLoc(loc)}
                    >
                      <div className="network-city-card__left">
                        <span className="network-city-card__icon">
                          {loc.isHub ? '⭐' : '📍'}
                        </span>
                        <div>
                          <p className="network-city-card__name">
                            {loc.name}
                            {loc.isHub && <span className="hub-tag">HQ</span>}
                          </p>
                          <span className="network-city-card__state">{loc.state}</span>
                        </div>
                      </div>

                      <a
                        href={`tel:${BRAND.phone}`}
                        className="network-city-card__call-link"
                        title={`Call ${loc.name} Hub`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        📞
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="network-stats-strip">
          <div className="network-stat-box">
            <span className="network-stat-box__num">4</span>
            <span className="network-stat-box__label">States Covered</span>
          </div>
          <div className="network-stat-divider" />
          <div className="network-stat-box">
            <span className="network-stat-box__num">15+</span>
            <span className="network-stat-box__label">Dealer & Service Hubs</span>
          </div>
          <div className="network-stat-divider" />
          <div className="network-stat-box">
            <span className="network-stat-box__num">Vijayawada</span>
            <span className="network-stat-box__label">Central Headquarters</span>
          </div>
          <div className="network-stat-divider" />
          <div className="network-stat-box">
            <span className="network-stat-box__num">24-48 hrs</span>
            <span className="network-stat-box__label">Rapid On-Field Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
