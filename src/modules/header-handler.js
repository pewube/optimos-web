export let spaceForDesktopHeader = 0;

export const spaceForDesktopHeaderCalculator = () => {
  if (window.innerWidth > 767.9 && window.innerHeight > 599.9) {
    spaceForDesktopHeader = window.innerHeight * 0.02 + 75 + 10;
  } else {
    spaceForDesktopHeader = 0;
  }
};

export const setPaddingTop = () => {
  spaceForDesktopHeaderCalculator();
  document.querySelector(
    ".main-site__article--products"
  ).style.paddingTop = `${spaceForDesktopHeader}px`;
};
