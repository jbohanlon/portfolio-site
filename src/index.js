import "bootstrap";
import "./css/main.scss";
const { outputAsListItems } = require("./backend-js/helpers.js");
import { library, dom } from "@fortawesome/fontawesome-svg-core";

// When developing, it's useful to import all FontAwesome icons
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
//library.add(fas, far);
//dom.watch();

// For an actual build of the website, we reduce the build size by
// importing only the icons that are used in the site.
import {
  faBars as fasBars,
  faLaptopCode as fasLaptopCode,
  faFlask as fasFlask,
  faDatabase as fasDatabase,
  faChartBar as fasChartBar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPython as fabPython,
} from "@fortawesome/free-brands-svg-icons";
library.add(
  // Navbar toggle icon
  fasBars,
  // Skills section
  fasLaptopCode,
  fasFlask,
  fasDatabase,
  fabPython,
  fasChartBar
);
dom.watch();

window.addEventListener("DOMContentLoaded", () => {
  setCopyrightYear();
  setUpContactForm();
});

const setCopyrightYear = () => {
  document.getElementById(
    "copyright-year"
  ).innerHTML = new Date().getFullYear();
};

const setUpContactForm = () => {
  const contactFormElement = document.getElementById("contact-form");

  if (!contactFormElement) {
    return;
  }

  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitContactForm();
  });
};

const submitContactForm = () => {
  (async () => {
    const response = await fetch(
      "https://services.ejdigitalmedia.com/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(collectContactFormData()),
      }
    );

    handleContactFormResponse(await response.json());
  })();
};

const collectContactFormData = () => {
  return {
    source: "www.jonathanohanlon.com",
    name: document.querySelector("#contact-form input[name='name']").value,
    email: document.querySelector("#contact-form input[name='email']").value,
    message: document.querySelector("#contact-form textarea[name='message']").value,
    "g-recaptcha-response": document.querySelector(
      "#contact-form textarea[name='g-recaptcha-response']"
    ).value,
  };
};

const handleContactFormResponse = (contactSubmitResponse) => {
  if (contactSubmitResponse.success) {
    document.getElementById(
      "contact-submission-feedback"
    ).innerHTML = `<p class="text-center mt-3">Thank you for your message!</p>`;

    const sendButtonElement = document.getElementById(
      "contact-form-send-button"
    );
    sendButtonElement.style.outline = "none";
    sendButtonElement.classList.add("d-none");
  } else {
    document.getElementById(
      "contact-submission-feedback"
    ).innerHTML = `<div class="alert alert-danger mt-3"><p class="mb-1">Please correct the following errors:</p><ul class="mb-0">${outputAsListItems(
      contactSubmitResponse.errors
    )}</ul></div>`;
  }
};
