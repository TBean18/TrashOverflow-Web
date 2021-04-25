import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
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
  TeamMeet,
} from "./FooterElements";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <TeamMeet />
        Meet the Team
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle style={{ "white-space": "pre-wrap" }}>
                {"Phillip Mitchell\nFront End"}
              </FooterLinkTitle>
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
              <FooterLinkTitle style={{ "white-space": "pre-wrap" }}>
                {"Alexa Keene\nAPI/Backend"}
              </FooterLinkTitle>
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
            <FooterLinkItems>
              <FooterLinkTitle style={{ "white-space": "pre-wrap" }}>
                {"Adrian Cooper\nAPI/Backend"}
              </FooterLinkTitle>
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
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle style={{ "white-space": "pre-wrap" }}>
                {"Taylor Bean\nProject Manager"}
              </FooterLinkTitle>
              <FooterLink to="//github.com/TBean18" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle style={{ "white-space": "pre-wrap" }}>
                {"Conrad Smith\nBackend/Mobile"}
              </FooterLinkTitle>
              <FooterLink to="//github.com/conradsmi" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle style={{ "white-space": "pre-wrap" }}>
                {"Jo Johnson\nFront End"}
              </FooterLinkTitle>
              <FooterLink to="//github.com/jojohnson-jsj" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle style={{ "white-space": "pre-wrap" }}>
                {"Sam Eslick\nDesign/Mobile"}
              </FooterLinkTitle>
              <FooterLink
                to="//www.linkedin.com/in/samuel-eslick-3b59141b7/"
                target="_blank"
              >
                LinkedIn
              </FooterLink>
              <FooterLink to="//github.com/jukebox303" target="_blank">
                GitHub
              </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              TrashOverflow
            </SocialLogo>
            <WebsiteRights>
              Trash Overflow © {new Date().getFullYear()}
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href="//www.facebook.com/ucfknights"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                href="//www.instagram.com/ucf.football/"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href="//www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                aria-label="Youtube"
              >
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink
                href="//twitter.com/elonmusk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                target="_blank"
                aria-label="Twitter"
              >
                <FaTwitter />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
