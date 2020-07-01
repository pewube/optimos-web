export const imagesBrightness = () => {
  const articleImages = document.querySelectorAll(".main-site__article__img");
  const articles = document.querySelectorAll(
    ".about-site__article, .contact-site__article"
  );

  for (const image of articleImages) {
    if (
      image.offsetTop + image.height / 4 - window.scrollY < 0 ||
      window.innerHeight - image.offsetTop - image.height + window.scrollY < 0
    ) {
      image.style.filter = "opacity(0.1)";
    } else {
      image.style.filter = "opacity(1)";
    }
  }
};
