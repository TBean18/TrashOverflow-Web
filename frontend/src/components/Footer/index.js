import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
  TeamMeet
} from './FooterElements';

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <TeamMeet /> Meet the Team
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Phillip Mitchell</FooterLinkTitle>
              <FooterLink
                to="//www.linkedin.com/in/phillipmitchell90/"
                target="_blank"
              >
                LinkedIn
              </FooterLink>
              <FooterLink to="//www.facebook.com/philmitch" target="_blank">
                FaceBook
              </FooterLink>
              <FooterLink to="//github.com/sheffield712" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Alexa Keene</FooterLinkTitle>
              <FooterLink
                to="//www.linkedin.com/in/alexakeene/"
                target="_blank"
              >
                LinkedIn
              </FooterLink>
              <FooterLink to="//github.com/keeneale" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Adrian Cooper</FooterLinkTitle>
              <FooterLink
                to="//www.linkedin.com/in/adrian-cooper-ab38b2120/"
                target="_blank"
              >
                LinkedIn
              </FooterLink>
              <FooterLink to="//github.com/adriancooper13" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Taylor Bean</FooterLinkTitle>
              <FooterLink to="//github.com/TBean18" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Conrad Smith</FooterLinkTitle>
              <FooterLink to="//github.com/conradsmi" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Jo Johnson</FooterLinkTitle>
              <FooterLink to="//github.com/jojohnson-jsj" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Sam Eslick</FooterLinkTitle>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              Trash Overflow
            </SocialLogo>
            <WebsiteRights>
              Trash Overflow © {new Date().getFullYear()} All rights reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink
                href="//www.linkedin.com/in/phillipmitchell90/"
                target="_blank"
                aria-label="Linkedin"
              >
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
