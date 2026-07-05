"use strict";
///////////////////////////////////////////////////////////
// Persian number
function toPersianDigits(str) {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (d) => persian[d]);
}

document.querySelectorAll(".fa-num").forEach((el) => {
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = toPersianDigits(node.textContent);
    }
  });
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const links = document.querySelectorAll('a[href^="#"]');

  const getHeaderHeight = () => (header ? header.offsetHeight : 0);

  function scrollWithOffsetByHash(hash, smooth = true) {
    if (!hash || hash === "#") return false;

    let target;
    try {
      target = document.querySelector(hash);
    } catch {
      return false;
    }
    if (!target) return false;

    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      getHeaderHeight();

    window.scrollTo({
      top,
      behavior: smooth ? "smooth" : "auto",
    });

    return true;
  }

  function clearHash() {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const ok = scrollWithOffsetByHash(hash, true);
      if (!ok) return;

      e.preventDefault();
      setTimeout(clearHash, 80);
    });
  });

  if (window.location.hash) {
    const hash = window.location.hash;

    scrollWithOffsetByHash(hash, false);

    window.addEventListener("load", () => {
      scrollWithOffsetByHash(hash, false);

      setTimeout(() => {
        scrollWithOffsetByHash(hash, false);
        clearHash();
      }, 120);
    });
  }
});

///////////////////////////////////////////////////////////
// Active item in scrolling
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => link.classList.remove("active"));

      const activeLink = document.querySelector(
        `.main-nav-link[href="#${id}"]`,
      );
      if (activeLink) activeLink.classList.add("active");
    });
  },
  {
    root: null,
    threshold: 0.4,
  },
);

sections.forEach((section) => observer.observe(section));

///////////////////////////////////////////////////////////
// Lenis
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.4,
  wheelMultiplier: 1,
  gestureOrientation: "vertical",
  normalizeWheel: true,
  smoothWheel: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

///////////////////////////////////////////////////////////
// Accordion
document.querySelectorAll(".code-accordion").forEach((accordion) => {
  const summary = accordion.querySelector("summary");
  const content = accordion.querySelector("pre");

  summary.addEventListener("click", (e) => {
    e.preventDefault();

    if (accordion.open) {
      const closeAnim = content.animate(
        [
          { height: `${content.offsetHeight}px`, opacity: 1 },
          { height: "0px", opacity: 0 },
        ],
        { duration: 250, easing: "ease-out" },
      );

      closeAnim.onfinish = () => {
        accordion.open = false;
      };
    } else {
      accordion.open = true;
      const finalHeight = content.offsetHeight;

      content.animate(
        [
          { height: "0px", opacity: 0 },
          { height: `${finalHeight}px`, opacity: 1 },
        ],
        { duration: 300, easing: "ease-out" },
      );
    }
  });
});

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");

if (yearEl) {
  const currentYear = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
  }).format(new Date());

  yearEl.textContent = currentYear;
}

///////////////////////////////////////////////////////////
// Header Navbar
const body = document.body;
const header = document.querySelector(".header");
const btnNav = document.querySelector(".btn-mobile-nav");

// if (body.classList.contains("home-page") && btnNav && header)

if (btnNav && header) {
  btnNav.addEventListener("click", function () {
    const isOpen = header.classList.toggle("nav-open");
    btnNav.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  const navLinks = document.querySelectorAll(".main-nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("nav-open");
      btnNav.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================
   Elementor-like Animation Observer
========================================= */

const animationElements = document.querySelectorAll(".animation");

function normalizeTime(value) {
  if (!value) return null;

  const time = String(value).trim();

  if (time.endsWith("ms") || time.endsWith("s")) {
    return time;
  }

  const number = Number(time);

  if (Number.isNaN(number)) {
    return null;
  }

  if (number > 10) {
    return `${number}ms`;
  }

  return `${number}s`;
}

if (animationElements.length) {
  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        const duration = normalizeTime(el.dataset.duration);
        const delay = normalizeTime(el.dataset.delay);
        const once = el.dataset.once !== "false";

        if (duration) {
          el.style.setProperty("--anim-duration", duration);
        }

        if (delay) {
          el.style.setProperty("--anim-delay", delay);
        }

        el.classList.add("is-visible");

        if (once) {
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  animationElements.forEach((el) => {
    animationObserver.observe(el);
  });
}

/* =========================================
   Counter Animation
========================================= */

const counterElements = document.querySelectorAll(".counter");

function toEnglishDigits(value) {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
}

function formatCounterNumber(number) {
  const formatted = Math.floor(number).toLocaleString("en-US");
  return toPersianDigits(formatted);
}

function getTimeInMs(value) {
  if (!value) return 0;

  const time = String(value).trim();

  if (time.endsWith("ms")) {
    return parseFloat(time);
  }

  if (time.endsWith("s")) {
    return parseFloat(time) * 1000;
  }

  const number = Number(time);

  if (Number.isNaN(number)) return 0;

  return number;
}

function animateCounter(element) {
  if (element.dataset.counted === "true") return;

  element.dataset.counted = "true";

  const originalText = toEnglishDigits(element.textContent.trim());

  const targetNumber = Number(originalText.replace(/[^\d]/g, ""));
  const prefix = originalText.match(/^\D+/)?.[0] || "";
  const suffix = originalText.match(/\D+$/)?.[0] || "";

  if (!targetNumber) return;

  element.textContent = `${prefix}${formatCounterNumber(0)}${suffix}`;

  const duration = Number(element.dataset.counterDuration) || 1400;

  let startTime = null;

  function updateCounter(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    const currentValue = targetNumber * easedProgress;

    element.textContent = `${prefix}${formatCounterNumber(currentValue)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = `${prefix}${formatCounterNumber(targetNumber)}${suffix}`;
    }
  }

  requestAnimationFrame(updateCounter);
}

if (counterElements.length) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const card = el.closest(".animation");

        if (card) {
          const computedStyle = getComputedStyle(card);
          const animDelay = computedStyle.getPropertyValue("--anim-delay");
          const delayMs = getTimeInMs(animDelay);

          setTimeout(() => {
            animateCounter(el);
          }, delayMs);
        } else {
          animateCounter(el);
        }

        observer.unobserve(el);
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  counterElements.forEach((el) => {
    counterObserver.observe(el);
  });
}

///////////////////////////////////////////////////////////
// Progress Bar
function initScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress-bar");
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${percent}%`;
  };

  updateProgress();

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

initScrollProgress();
