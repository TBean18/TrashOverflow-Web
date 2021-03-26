import React, { useState } from 'react';
import {
  HeroContainer,
  HeroBackground,
  VideoBackground,
  HeroContent,
  HeroH1,
  HeroP,
  HeroButtonWrapper,
  ArrowForward,
  ArrowRight
} from './HeroElements';
import { Button } from '../ButtonElement';

const Hero = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer>
      <HeroBackground>
        <VideoBackground
          autoPlay
          loop
          muted
          src="https://r5---sn-5uaeznd7.c.drive.google.com/videoplayback?expire=1616611615&ei=31BbYPr7NOevzLUP84i-2A4&ip=2603:9001:6706:70d1:8983:93b2:3aaf:d5a2&cp=QVRGWEdfUFZPRlhPOk9VVXdHeE5PRVBXeU5qU2JsTlJWTFJTT2U5X3pBV2ZaejRVcTdlZVNKQmw&id=9f5f1213d9abf49c&itag=37&source=webdrive&requiressl=yes&mh=Nv&mm=32&mn=sn-5uaeznd7&ms=su&mv=m&mvi=5&pl=32&ttl=transient&susc=dr&driveid=1hJ_OWQkjhYdT0ClgY6pmatRVUeULR8it&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=53.289&lmt=1616188311449335&mt=1616597066&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRAIgI6WeO_qo9Y6u4Pi4xaoTUogNFdGwj4LRN1PMk4B8dvECIEVDzUjaUHoI1eBB4sDW484vS9Al674gxugzeccXd2C8&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAMSPscg8ctn8oqvjHUk9DpMMNHk5AY1LWh-uKZQCvaTLAiEAmsAZHqoOLqRw5htdGImdyxErumh6nPLm4q9iA_a4d9s=&cpn=Y-RbxXbelE3h4Wni&c=WEB_EMBEDDED_PLAYER&cver=1.20210322.1.0"
          type="video"
        />
      </HeroBackground>
      <HeroContent>
        <HeroH1>The Dishes are Still in the Sink</HeroH1>
        <HeroP>
          Because we all know your roommate isn't going to do it, anyway.
        </HeroP>
        <HeroButtonWrapper>
          <Button
            to="signup"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroButtonWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
