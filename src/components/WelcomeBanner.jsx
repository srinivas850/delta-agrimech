import React from 'react';
import './WelcomeBanner.css';

export default function WelcomeBanner() {
  return (
    <section className="welcome-banner">
      <div className="container welcome-banner__inner">
        <h2 className="welcome-banner__title">Welcome to Sreshta Impex LLP</h2>
        <div className="welcome-banner__divider" />
        <p className="welcome-banner__text">
          Sreshta Impex LLP offers a wide range of harvesting machines, including combine harvesters,
          forage harvesters, and balers. Our machines are engineered to meet the diverse needs of modern
          Indian agriculture — from small-scale family holdings to large commercial farming operations.
        </p>
      </div>
    </section>
  );
}
