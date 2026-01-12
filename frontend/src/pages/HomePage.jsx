import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import ManifestoStrip from '../components/home/ManifestoStrip';
import CommandCentre from '../components/home/CommandCentre';
import ProductSimulator from '../components/home/ProductSimulator';
import RiderStories from '../components/home/RiderStories';
import PackUnited from '../components/home/PackUnited';
import WhyBluarmor from '../components/home/WhyBluarmor';
import FinalCTA from '../components/home/FinalCTA';
import '../styles/bluarmor.css';

const HomePage = () => {
  return (
    <div className="bluarmor-app">
      <Header />
      <main>
        <HeroSection />
        <ManifestoStrip />
        <CommandCentre />
        <ProductSimulator />
        <RiderStories />
        <PackUnited />
        <WhyBluarmor />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
