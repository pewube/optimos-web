import { spaceForDesktopHeader } from "./header-handler.js";
import { duration } from "./settings.js";

export const smoothScroll = (event) => {
  event.preventDefault();
  const targetElement = event.currentTarget.getAttribute("href");
  let targetPosition =
    document.querySelector(targetElement).offsetTop - spaceForDesktopHeader;

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  let start = null;

  const move = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    // linear
    window.scrollTo(0, distance * (progress / duration) + startPosition);
    if (progress < duration) window.requestAnimationFrame(move);
  };
  window.requestAnimationFrame(move);
};
