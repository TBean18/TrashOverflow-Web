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
          src="https://r5---sn-5ualdne7.c.drive.google.com/videoplayback?expire=1616554129&ei=UXBaYJe_Nuyoj-8P4deo6A4&ip=2603:9001:6706:70d1:c87b:3ac3:c548:41d7&cp=QVRGWEZfU1FQSlhPOk9UWXpCeVJPRVBXeFJtTmNwTlJWTFFXUnowX3pBV2ZZZDdQcjFlZVNKQXA&id=9f5f1213d9abf49c&itag=37&source=webdrive&requiressl=yes&mh=Nv&mm=32&mn=sn-5ualdne7&ms=su&mv=m&mvi=5&pl=32&ttl=transient&susc=dr&driveid=1hJ_OWQkjhYdT0ClgY6pmatRVUeULR8it&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=53.289&lmt=1616188311449335&mt=1616539219&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRQIhALT1n3xIYWDbABUDofj1rNiTbZcjK79Ho2iaSPEVU214AiAe0zgB0OVryK8bUIKX3DdgV05C-QOROdvURffochB4ag==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgP8UJ1N4jnTSCdbZVxXJsN7k2J1JwgrETyKcbC4f0t64CIF7XfDnT04tNvcR8ec-LZYVg03ZfeMKbaJTTEFb2Bcwy&cpn=I8aeiVdeXloqEij7&c=WEB_EMBEDDED_PLAYER&cver=1.20210321.0.0"
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
