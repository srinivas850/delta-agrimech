import React from 'react';
import { BRAND } from '../data/siteData';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Overlay gradient */}
      <div className="hero__overlay" />

      {/* Background — replace this image with your actual hero machine photo */}
      {/* Place your file at: public/assets/images/hero-machine.jpg */}
      {/* Background — Golden Hour Fieldwork machinery background */}
      <div className="hero__bg">
        <img
          src={BRAND.heroBgUrl}
          alt="Delta Agrimech machinery working in agricultural field at golden hour"
          className="hero__bg-image"
          onError={(e) => {
            if (e.target.src !== window.location.origin + BRAND.localHeroBgUrl && !e.target.dataset.triedLocal) {
              e.target.dataset.triedLocal = 'true';
              e.target.src = BRAND.localHeroBgUrl;
            } else {
              e.target.style.display = 'none';
            }
          }}
        />
        {/* Fallback gradient shown when no image is available */}
        <div className="hero__bg-fallback" />
      </div>

      <div className="container hero__content">


        {/* Headline */}
        <h1 className="hero__headline animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          Powering India's<br />
          <span className="hero__headline-accent">Agricultural Future</span>
        </h1>

        {/* Subheading */}
        <p className="hero__subheading animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Premium agricultural machinery engineered for performance, reliability, and
          unmatched productivity across every Indian farming season.
        </p>

        {/* CTAs */}
        <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
          <a href="#products" className="btn btn-accent hero__btn">
            🚜 Explore Products
          </a>
          <a href="#dealer" className="btn btn-outline hero__btn">
            Become a Dealer
          </a>
        </div>

        {/* Stats bar */}
        <div className="hero__stats animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="hero__stat">
            <span className="hero__stat-num">100+</span>
            <span className="hero__stat-label">Dealers Across India</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">3</span>
            <span className="hero__stat-label">Premium Products</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">Pan-India</span>
            <span className="hero__stat-label">Service Network</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint">
        <span>Scroll Down</span>
        <div className="hero__scroll-arrow" />
      </div>
    </section>
  );
}
