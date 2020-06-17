// logo animation
import { TimelineLite, CSSPlugin } from "gsap/all";

const plugins = [CSSPlugin];

const burger = document.querySelector(".menu__burger");

export const burgerAnimation = () => {
  const tl = new TimelineLite({ onComplete: burgerAnimation });
  tl.set(burger, { transformOrigin: "50% 50%" });
  tl.to(burger, 0.2, {
    scaleX: 0.5,
    repeat: 1,
    yoyo: true,
    ease: "bounce.out",
    delay: 3,
  });
  console.log(play);
  return tl;

  // tl.kill();
};

export const burgerAnimationReset = () => {
  burger.style.transform = "translate(0px,0px)";
};
