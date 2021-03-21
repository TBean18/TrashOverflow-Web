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
          src="https://r5---sn-5uaeznd7.c.drive.google.com/videoplayback?expire=1616383856&ei=MNdXYLKrCvmBzLUP8s2xmAI&ip=2603:9001:6706:70d1:59bb:84b3:abe9:40fb&cp=QVRGWERfUlhTR1hPOlFaTnJTUjNnVkg0eUdaNy1WSElXZVFrSlE0Mkd0djdTVnNaVWMwa1NaTm8&id=9f5f1213d9abf49c&itag=37&source=webdrive&requiressl=yes&mh=Nv&mm=32&mn=sn-5uaeznd7&ms=su&mv=m&mvi=5&pl=32&ttl=transient&susc=dr&driveid=1hJ_OWQkjhYdT0ClgY6pmatRVUeULR8it&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=53.289&lmt=1616188311449335&mt=1616369300&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRgIhAJMn-e-wjPrkqu3-lldmnDM9GkIUoC0cLGnHhAYkhW9AAiEA9W9mjFOZmQc488cDbh3S0lVQjW9XnU4NbCN9RnHVpWs=&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgMdgIeCdgltPAqymc8PEjA0szu-ISAl4QxbcHcWvHtKACIGdD8L5CF5va-9a_DDJokjnMTAAyKru_jpLA6VA52Ocz&cpn=_nbK2n9NUbPU7Qba&c=WEB_EMBEDDED_PLAYER&cver=1.20210315.1.1"
          type="video"
        />
      </HeroBackground>
    </HeroContainer>
  );
};

export default Hero;
