import "./scss/style.scss";
import { logoLettersAnimation } from "./modules/logo-animation.js";

logoLettersAnimation();

// mobile menu handler

const burger = document.querySelector(".menu__burger");
const burgerLayerTop = document.querySelector(".menu__burger__top");
const burgerLayerMiddle = document.querySelector(".menu__burger__middle");
const burgerLayerBottom = document.querySelector(".menu__burger__bottom");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".menu__nav");
const menuLinks = document.querySelectorAll(".menu__nav__link--scroll");

const showMenuBar = () => menu.classList.remove("menu--hide");
const hideMenuBar = () => menu.classList.add("menu--hide");
const hideMenuBarTimeout = () => {
  setTimeout(() => hideMenuBar(), 800);
};
const hideActiveMenu = () => {
  menu.classList.remove("menu--active");
  nav.classList.remove("menu__nav--active");
  burgerLayerTop.classList.remove("menu__burger__top--active");
  burgerLayerMiddle.classList.remove("menu__burger__middle--active");
  burgerLayerBottom.classList.remove("menu__burger__bottom--active");
};
let scrollStart = 0;
const scrollMenuBarAction = () => {
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
const smoothScroll = (event) => {
  event.preventDefault();
  const targetElement = event.currentTarget.getAttribute("href");
  let targetPosition =
    document.querySelector(targetElement).offsetTop - spaceForDesktopHeader;

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  const duration = 800;
  let start = null;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    // linear
    window.scrollTo(0, distance * (progress / duration) + startPosition);
    if (progress < duration) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
};

menuLinks.forEach((link) =>
  link.addEventListener("click", () => {
    smoothScroll(event);
    if (window.innerWidth < 768 || window.innerHeight < 768) {
      hideActiveMenu();
      hideMenuBarTimeout();
    }
  })
);

burger.addEventListener("click", function () {
  if (window.innerWidth < 768 || window.innerHeight < 768) {
    menu.classList.toggle("menu--active");
    nav.classList.toggle("menu__nav--active");
    burgerLayerTop.classList.toggle("menu__burger__top--active");
    burgerLayerMiddle.classList.toggle("menu__burger__middle--active");
    burgerLayerBottom.classList.toggle("menu__burger__bottom--active");
  }
});

["wheel", "touchmove", "keydown"].forEach((event) =>
  window.addEventListener(event, () => {
    if (window.innerWidth < 768 || window.innerHeight < 768) {
      scrollMenuBarAction();
    }
  })
);

// tablet/desktop main-site padding top calculator
let spaceForDesktopHeader = 0;

const spaceForDesktopHeaderCalculator = () => {
  if (window.innerWidth > 767.9 && window.innerHeight > 599.9) {
    spaceForDesktopHeader = window.innerHeight * 0.02 + 75 + 10;
  } else {
    spaceForDesktopHeader = 0;
  }
};

const setPaddingTop = () => {
  spaceForDesktopHeaderCalculator();
  document.querySelector(
    ".main-site__article--products"
  ).style.paddingTop = `${spaceForDesktopHeader}px`;
};

setPaddingTop();

window.addEventListener("resize", () => {
  setPaddingTop();
});

// contact form handler

const contactForm = document.querySelector(".contact-form");
const inputs = document.querySelectorAll(".form__input");
const inputsText = document.querySelectorAll(
  ".form__input-title, .form__input-message"
);
const inputsEmail = document.querySelectorAll(".form__input-email");
const submitBtn = document.querySelector(".form__btn");
const statusPanel = document.querySelector(".contact-form__status-panel");

contactForm.setAttribute("novalidate", true); // disable html validation

const checkEmailValidity = (input) => {
  const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
  return reg.test(input.value);
};

const markInputIfInvalid = (input, isInvalid) => {
  if (isInvalid) {
    input.classList.add("form__input--invalid");
  } else {
    input.classList.remove("form__input--invalid");
  }
};

const resetLabels = (el) => {
  el.removeAttribute("aria-invalid");
  el.removeAttribute("aria-describedBy");
  el.previousElementSibling.innerText = `${el.getAttribute("placeholder")}`;
  el.previousElementSibling.style.color = "#000";
};

const showErrorsIfInvalid = (isInvalid) => {
  if (isInvalid) {
    for (const el of inputsText) {
      if (
        el.classList.contains("form__input--invalid") &&
        el.classList.contains("form__input-title")
      ) {
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedBy", "input-title-label");
        el.previousElementSibling.innerText =
          "Błąd. Pole tytułu musi zawierać od 5 do 200 znaków";
        el.previousElementSibling.style.color = "#f00";
      } else if (
        el.classList.contains("form__input--invalid") &&
        el.classList.contains("form__input-message")
      ) {
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedBy", "input-message-label");
        el.previousElementSibling.innerText =
          "Błąd. Pole treści wiadomości musi zawierać od 10 do 2000 znaków";
        el.previousElementSibling.style.color = "#f00";
      }
    }
    for (const el of inputsEmail) {
      if (
        el.classList.contains("form__input--invalid") &&
        el.classList.contains("form__input-email")
      ) {
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedBy", "input-email-label");
        el.previousElementSibling.innerText =
          "Błąd. Wprowadź prawidłowy adres e-mail";
        el.previousElementSibling.style.color = "#f00";
      }
    }
  }
};

for (const el of inputsText) {
  el.addEventListener("input", (e) => {
    markInputIfInvalid(e.target, !e.target.checkValidity());
    resetLabels(el);
  });
}

for (const el of inputsEmail) {
  el.addEventListener("input", (e) => {
    markInputIfInvalid(e.target, !checkEmailValidity(e.target));
    resetLabels(el);
  });
}

const resetStatusPanel = () => {
  statusPanel.style.display = "none";
  statusPanel.classList.remove("contact-form__status-panel--error");
  statusPanel.innerHTML = "";
};

const enableSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.classList.remove("form__btn--busy");
};

const disableSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.classList.add("form__btn--busy");
};

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  resetStatusPanel();

  let inputError = false;

  for (const el of inputsText) {
    markInputIfInvalid(el, false);
    resetLabels(el);
    if (!el.checkValidity()) {
      markInputIfInvalid(el, true);
      showErrorsIfInvalid(true);
      inputError = true;
    }
  }

  for (const el of inputsEmail) {
    markInputIfInvalid(el, false);
    resetLabels(el);
    if (!checkEmailValidity(el)) {
      markInputIfInvalid(el, true);
      showErrorsIfInvalid(true);
      inputError = true;
    }
  }

  if (!inputError) {
    disableSubmitButton();

    const formData = new FormData();
    for (const el of inputs) {
      formData.append(el.name, el.value);
    }

    const url = contactForm.getAttribute("action");
    const method = contactForm.getAttribute("method");

    fetch(url, {
      method: method.toUpperCase(),
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          const selectors = res.errors.map((el) => `[name="${el}"]`);
          const inputsWithErrors = document.querySelectorAll(
            selectors.join(",")
          );
          for (const el of inputsWithErrors) {
            markInputIfInvalid(el, true);
            showErrorsIfInvalid(true);
          }
        } else {
          if (res.status === "ok") {
            statusPanel.style.display = "block";
            statusPanel.classList.remove("contact-form__status-panel--error");
            statusPanel.innerHTML = `
            <p>Wiadomość została wysłana.</p>
            <p>Dziękujemy za kontakt.</p>
            <p>Postaramy się odpowiedzieć jak najszybciej.</p>
            `;
            for (const el of inputs) {
              el.previousElementSibling.remove();
              el.remove();
            }
            submitBtn.remove();
          }
          if (res.status === "error") {
            statusPanel.style.display = "block";
            statusPanel.classList.add("contact-form__status-panel--error");
            statusPanel.style.textAlign = "center";
            statusPanel.innerText = "Wysłanie wiadomości nie powiodło się.";
          }
        }
      })
      .finally(() => {
        enableSubmitButton();
      });
  }
});
