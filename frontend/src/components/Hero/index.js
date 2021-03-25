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
    <HeroContainer id="home">
      <HeroBackground>
        <VideoBackground
          autoPlay
          loop
          muted
          src="https://r5---sn-5ualdne7.c.drive.google.com/videoplayback?expire=1616708631&ei=18tcYLi9FK7oj-8Pg6O0oAU&ip=2603:9001:6706:70d1:294a:b8d2:ed66:f22d&cp=QVRGWEhfV1ZRQlhPOk9WVGRHekpPRVBXek1xU2RoTlJWTFNSVmUxX3pBV2ZBeTFVczNlZVNKQ2s&id=9f5f1213d9abf49c&itag=37&source=webdrive&requiressl=yes&mh=Nv&mm=32&mn=sn-5ualdne7&ms=su&mv=m&mvi=5&pl=32&ttl=transient&susc=dr&driveid=1hJ_OWQkjhYdT0ClgY6pmatRVUeULR8it&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=53.289&lmt=1616188311449335&mt=1616694021&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRQIhAKhPpPsO8JsKytjjAqHvnDB3Y_AG4l4cs3E8h9Uqw53GAiABXgAPdkD9f5jUwl9nPTjhuZwrG0a5sO9d8PgX9YmTcw==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAOiZWKLStxculwq8iSpgmW_pW5NzUteyOQg50noA5x3ZAiAAm19LWh9jd8aD3y3GwIRhsPYOhM29cFbbysoSz63hSQ==&cpn=HtakvG72ddq7J6MA&c=WEB_EMBEDDED_PLAYER&cver=1.20210322.1.0"
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
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroButtonWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
