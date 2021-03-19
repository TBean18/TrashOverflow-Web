import React from 'react';
import { HeroContainer, HeroBackground, VideoBackground } from './HeroElements';

const Hero = () => {
  return (
    <HeroContainer>
      <HeroBackground>
        <VideoBackground
          autoPlay
          loop
          muted
          src="https://r5---sn-5ualdne7.c.drive.google.com/videoplayback?expire=1616203236&ei=pBVVYNDeHKGP0_wPxOeRcA&ip=2603:9001:6706:70d1:ac88:c58b:dd12:ff22&cp=QVRGWENfUlJRR1hPOlF1NGpiWFRqOUYzNTBoUjE5Y0VHXzJaaUV6UFBqRmFfcDJKMnQtTk9RaUU&id=9f5f1213d9abf49c&itag=37&source=webdrive&requiressl=yes&mh=Nv&mm=32&mn=sn-5ualdne7&ms=su&mv=m&mvi=5&pl=32&ttl=transient&susc=dr&driveid=1hJ_OWQkjhYdT0ClgY6pmatRVUeULR8it&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=53.289&lmt=1616188311449335&mt=1616188581&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRgIhAIM-Hsh3Dtzi5pHO13AuhOxCoEA-h_MhQcJVs9QcrLP0AiEApnnSxZiYhxJTItYokUJBMrbTGM2ejDQlZJ8BXY5zgZA=&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgT-v7WVb7ya8JikH_ksgQzVdYpbTXwC-gyPqjGBYwky4CIQD1x9I9JZ-mG7uT28V3SfzQust7irGnuBw6j8SIf2C0mQ==&cpn=muXECb_f2Jfvn86H&c=WEB_EMBEDDED_PLAYER&cver=1.20210315.1.1"
          type="video"
        />
      </HeroBackground>
    </HeroContainer>
  );
};

export default Hero;
