import React, { useState } from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import {
  homeObjOne,
  homeObjThree,
  homeObjTwo
} from '../components/InfoSection/Data';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Sidebar from '../components/Sidebar';

const LandingPage = () => {
  // first value is the name of the state, the second is a function that will be updating it.
  const [isOpen, setIsOpen] = useState(false);

  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Hero />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Services />
      <InfoSection {...homeObjThree} />
      <Footer />
    </>
  );
};

export default LandingPage;
