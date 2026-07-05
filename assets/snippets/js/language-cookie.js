function setLanguage(lang) {
  const days = 30;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();

  document.cookie =
    "selected_lang=" + lang + "; " + expires + "; path=/; SameSite=Lax; Secure";
  document.cookie =
    "pll_language=" + lang + "; " + expires + "; path=/; SameSite=Lax; Secure";

  window.location.href = "https://launchyourbrands.com/" + lang + "/home/";
}

document.addEventListener("click", function (e) {
  const target = e.target.closest("[data-lang]");
  if (target) {
    e.preventDefault();
    const lang = target.getAttribute("data-lang");
    setLanguage(lang);
  }
});
