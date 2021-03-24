export const homeObjOne = {
  id: 'about',
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Top Line 1',
  headline: 'Headline 1 Goes Here',
  description: 'Make sure to put a description here.',
  buttonLabel: 'Get Started',
  imgStart: false,
  img: require('../../images/svg-3.svg').default,
  alt: 'Laptop',
  dark: true,
  primary: true,
  darkText: false
};

export const homeObjTwo = {
  // The id must match the id name in /Navbar/index.js
  id: 'discover',
  // Controls the background of the section. True is white
  lightBg: true,
  // Controls color of headline. False is black.
  lightText: false,
  lightTextDesc: false,
  topLine: 'Top Line 2',
  headline: 'Headline 2 Goes Here',
  description: 'Make sure to put a description here.',
  buttonLabel: 'Get Started',
  imgStart: true,
  img: require('../../images/svg-2.svg').default,
  alt: 'Laptop',
  // Controls font color within button. False is white
  dark: false,
  // Primary color... i.e. orange
  primary: false,
  // Controls description color. True is black.
  darkText: true
};

export const homeObjThree = {
  id: 'signup',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Sign up for a new account today',
  headline: 'Easier than taking out the trash',
  description: "It will also look like you're doing something.",
  buttonLabel: 'Sign Up',
  imgStart: false,
  img: require('../../images/svg-1.svg').default,
  alt: 'Laptop',
  dark: false,
  primary: false,
  darkText: true
};
