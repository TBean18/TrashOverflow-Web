export const homeObjOne = {
  id: "about",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Why we are here",
  headline: "Confrontation-less Chore Management",
  description:
    "We've all had roommates who didn't do their fair-share. Our app rotates group members through chores so work is shared equally.",
  buttonLabel: "Get Started",
  imgStart: false,
  img: require("../../public/images/svg-3.svg").default,
  alt: "Laptop",
  dark: true,
  primary: true,
  darkText: false,
};

export const homeObjTwo = {
  // The id must match the id name in /Navbar/index.js
  id: "discover",
  // Controls the background of the section. True is white
  lightBg: true,
  // Controls color of headline. False is black.
  lightText: false,
  lightTextDesc: false,
  topLine: "Chores at a Glance",
  headline: "Check out our App",
  description:
    "View your chores on the go. Our mobile app lets you see your upcoming chores from your phone.",
  buttonLabel: "View the Repo",
  imgStart: true,
  img: require("../../public/images/svg-2.svg").default,
  alt: "Laptop",
  // Controls font color within button. False is white
  dark: false,
  // Primary color... i.e. orange
  primary: false,
  // Controls description color. True is black.
  darkText: true,
};

export const homeObjThree = {
  id: "signup",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "Sign up for a new account today",
  headline: "Easier than taking out the trash",
  description: "Sign up for an account and get started on your chores today.",
  buttonLabel: "Sign Up",
  imgStart: false,
  img: require("../../public/images/svg-1.svg").default,
  alt: "Laptop",
  dark: false,
  primary: false,
  darkText: true,
};
