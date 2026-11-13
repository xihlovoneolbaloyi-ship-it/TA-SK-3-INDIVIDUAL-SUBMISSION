"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

menuToggle?.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

dropdownToggle?.addEventListener("click", () => {
  const isOpen = dropdownMenu.classList.toggle("open");
  dropdownToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".primary-nav a").forEach(link => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    dropdownMenu?.classList.remove("open");
    dropdownToggle?.setAttribute("aria-expanded", "false");
  });
});

const checks = [...document.querySelectorAll(".course-check")];
const countOutput = document.getElementById("selected-count");
const discountOutput = document.getElementById("discount-result");
const totalOutput = document.getElementById("total-result");

function calculateDiscount() {
  const selected = checks.filter(check => check.checked);
  const count = selected.length;
  const subtotal = selected.reduce((sum, check) => sum + Number(check.dataset.price || 0), 0);
  let discount = 0;
  if (count === 2) discount = 5;
  else if (count === 3) discount = 10;
  else if (count > 3) discount = 15;
  const total = subtotal * (1 - discount / 100);
  countOutput.textContent = `${count} ${count === 1 ? "course" : "courses"} selected`;
  discountOutput.textContent = `${discount}% discount`;
  totalOutput.textContent = `Estimated total: R${total.toFixed(2)} (before discount: R${subtotal.toFixed(2)})`;
}
checks.forEach(check => check.addEventListener("change", calculateDiscount));
document.getElementById("clear-selection")?.addEventListener("click", () => {
  checks.forEach(check => { check.checked = false; });
  calculateDiscount();
});
calculateDiscount();

const quoteForm = document.getElementById("quote-form");
const statusOutput = document.getElementById("form-status");
const fields = {
  fullName: document.getElementById("full-name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  interest: document.getElementById("interest"),
  consent: document.getElementById("consent")
};
const errors = {
  fullName: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  phone: document.getElementById("phone-error"),
  interest: document.getElementById("interest-error"),
  consent: document.getElementById("consent-error")
};

function setError(key, message) {
  errors[key].textContent = message;
  fields[key].classList.toggle("invalid", Boolean(message));
  if (message) fields[key].setAttribute("aria-invalid", "true");
  else fields[key].removeAttribute("aria-invalid");
}
function validateForm() {
  let valid = true;
  const name = fields.fullName.value.trim();
  const email = fields.email.value.trim();
  const phone = fields.phone.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+\d\s()-]{7,20}$/;
  const validations = {
    fullName: name.length >= 2 ? "" : "Please enter your name (at least 2 characters).",
    email: emailPattern.test(email) ? "" : "Enter a valid email address.",
    phone: !phone || phonePattern.test(phone) ? "" : "Enter a valid contact number.",
    interest: fields.interest.value ? "" : "Please choose an option.",
    consent: fields.consent.checked ? "" : "Please provide consent before submitting."
  };
  Object.entries(validations).forEach(([key, message]) => {
    setError(key, message);
    if (message) valid = false;
  });
  return valid;
}
Object.entries(fields).forEach(([key, field]) => {
  field.addEventListener("input", () => setError(key, ""));
  field.addEventListener("change", () => setError(key, ""));
});
quoteForm?.addEventListener("submit", event => {
  event.preventDefault();
  statusOutput.textContent = "";
  statusOutput.className = "form-status";
  if (!validateForm()) {
    statusOutput.textContent = "Please correct the highlighted fields and try again.";
    statusOutput.classList.add("error");
    quoteForm.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  statusOutput.textContent = "Thank you. Your demonstration request passed validation. No data has been sent or stored.";
  statusOutput.classList.add("success");
  quoteForm.reset();
});
document.getElementById("year").textContent = new Date().getFullYear();
