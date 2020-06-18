import { duration } from "./settings.js";

const burger = document.querySelector(".menu__burger");
const burgerLayerTop = document.querySelector(".menu__burger__top");
const burgerLayerMiddle = document.querySelector(".menu__burger__middle");
const burgerLayerBottom = document.querySelector(".menu__burger__bottom");
export const menu = document.querySelector(".menu");
const nav = document.querySelector(".menu__nav");

export const menuToggler = () => {
  menu.classList.toggle("menu--active");
  nav.classList.toggle("menu__nav--active");
  burger.classList.toggle("menu__burger--active");
  burgerLayerTop.classList.toggle("menu__burger__top--active");
  burgerLayerMiddle.classList.toggle("menu__burger__middle--active");
  burgerLayerBottom.classList.toggle("menu__burger__bottom--active");
};
const showMenuBar = () => menu.classList.remove("menu--hide");
const hideMenuBar = () => menu.classList.add("menu--hide");
export const hideMenuBarTimeout = () => {
  setTimeout(() => hideMenuBar(), duration);
};
export const hideActiveMenu = () => {
  menu.classList.remove("menu--active");
  nav.classList.remove("menu__nav--active");
  burgerLayerTop.classList.remove("menu__burger__top--active");
  burgerLayerMiddle.classList.remove("menu__burger__middle--active");
  burgerLayerBottom.classList.remove("menu__burger__bottom--active");
};
let scrollStart = 0;
export const scrollMenuBarAction = () => {
  let scrollValue = scrollY;
  if (window.innerWidth < 768 || window.innerHeight < 768) {
    if (menu.classList.contains("menu--active")) {
      hideActiveMenu();
    }
    if (scrollValue > scrollStart) {
      hideMenuBar();
    } else {
      showMenuBar();
    }
    if (scrollY <= 10) {
      showMenuBar();
    }
    scrollStart = scrollValue <= 0 ? 0 : scrollValue;
  }
};
