document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("announcement-bar");
  const closeBtn = document.querySelector(".announcement-close");

  const hiddenUntil = localStorage.getItem("announcement_hidden_until");

  const now = Date.now();

  if (hiddenUntil && now < Number(hiddenUntil)) {
    bar.style.display = "none";
    return;
  }

  closeBtn.addEventListener("click", () => {
    bar.style.display = "none";
    const expire = now + 24 * 60 * 60 * 1000;
    localStorage.setItem("announcement_hidden_until", expire);
  });
});
