import React, { useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import InfoSection2 from "../components/InfoSection/index2";
import InfoSection3 from "../components/InfoSection/index3";
import {
  homeObjOne,
  homeObjThree,
  homeObjTwo,
} from "../components/InfoSection/Data";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Sidebar from "../components/Sidebar";
import { GlobalContext } from "../context/GlobalState";
import { useLoggedInRedirect } from "../hooks/useLoggedInRedirect";

const LandingPage = () => {
  // first value is the name of the state, the second is a function that will be updating it.
  const [isOpen, setIsOpen] = useState(false);
  useLoggedInRedirect(GlobalContext);

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
      <InfoSection3 {...homeObjTwo} />
      <InfoSection2 {...homeObjThree} />
      <Footer />
    </>
  );
};

export default LandingPage;
