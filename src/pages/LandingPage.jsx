import React from 'react';
import Navbar        from '../components/Navbar';
import Hero          from '../components/Hero';
import WelcomeBanner from '../components/WelcomeBanner';
import Products      from '../components/Products';
import VideoGallery  from '../components/VideoGallery';
import DealerSection from '../components/DealerSection';
import NetworkMap    from '../components/NetworkMap';
import Contact       from '../components/Contact';
import Footer        from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WelcomeBanner />
        <Products />
        <VideoGallery />
        <DealerSection />
        <NetworkMap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
