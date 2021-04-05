import React from 'react';
import Story from './Story';
import '../../css/StoryReel.css';
import JoIcon from '../../public/images/JoIcon.png';
import StockWoman from '../../public/images/stockWoman.png';

function StoryReel() {
  return (
    <div className="storyReel">
      <Story
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7b%2F58%2F94%2F7b58942b9ff430c88ebf30cf2047af20.jpg&f=1&nofb=1"
        profileSrc={JoIcon}
        title="Jo Johnson"
      />
      <Story
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBHC2s4NFdzXEsVzvBPGjkrSePQa-8XFuNtQ&usqp=CAU"
        profileSrc="https://avatars2.githubusercontent.com/u/24712956?s=400&u=b71527e605ae1b748fc2d4157a842e57ad44&v=4"
        title="Ryan Serson"
      />
      <Story
        image="https://webcdn-adespressoinc.netdna-ssl.com/wp-content/uploads/2019/11/amazing-example-fb-ig-stories-that-convert-01.jpg"
        profileSrc="https://prod-takelessons.netdna-ssl.com/document/profile_183419_pi_IMG_6868.JPG?v=156106635"
        title="Aaron Bernath"
      />
      <Story
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.officelovin.com%2Fwp-content%2Fuploads%2F2015%2F03%2Fgoogle-office-irvine-5.jpg&f=1&nofb=1"
        profileSrc={StockWoman}
        title="Karissa Evans"
      />
      <Story
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fmedia%2Fassets%2F2019%2F04%2F_1200x630_crop_center-center_82_none%2Ffacebook-newsfeed-vs-story-fi.jpg%3Fmtime%3D1556862505&f=1&nofb=1"
        profileSrc="https://miro.medium.com/fit/c/336/336/2*4lH0jftaq_sPRqQisUsVqw.jpeg"
        title="Nathan Leonard"
      />
    </div>
  );
}

export default StoryReel;
