import { gsap } from "gsap";

export const logoLettersAnimation = () => {
  const tl = gsap.timeline({ onComplete: logoLettersAnimation });
  const scale = () => {
    return 0.6 + Math.random();
  };
  const letter = document.querySelectorAll(".menu__logo__svg__letters > *");
  tl.set(letter, { transformOrigin: "100% 100%" });
  tl.to(letter, 0.5, {
    scaleY: scale,
    repeat: 1,
    yoyo: true,
    ease: "bounce.out",
    delay: 2,
  });
  return tl;
};
