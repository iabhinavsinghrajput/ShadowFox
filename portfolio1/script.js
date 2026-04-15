/* =============================================
   script.js – Portfolio Logic
   ============================================= */

// ─── 1. LOADER ──────────────────────────────────
(function startLoader() {
  const progressLine = document.querySelector(".progress");
  const progressText = document.getElementById("progress-text");
  const loader = document.getElementById("loader");

  let count = 0;
  const speed = 22;

  const counter = setInterval(() => {
    if (count >= 100) {
      clearInterval(counter);
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        // Init AOS only after loader is gone
        AOS.init({ once: true, offset: 80, duration: 800 });
      }, 400);
    } else {
      count++;
      if (progressLine) progressLine.style.width = count + "%";
      if (progressText) progressText.innerText = count + "%";
    }
  }, speed);
})();

// ─── 3. PARTICLES BACKGROUND ────────────────────
function getParticlesConfig() {
  return {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 900 } },
      color: {
        value: ["#c80000", "#ffffff", "#800000"],
      },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        out_mode: "out",
      },
      links: {
        enable: true,
        distance: 140,
        color: "#ffffff",
        opacity: 0.06,
        width: 1,
      },
      opacity: {
        value: 0.6,
      },
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 130, line_linked: { opacity: 0.3 } },
        push: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  };
}

// Initial load
if (window.tsParticles) {
  tsParticles.load("particles", getParticlesConfig());
}

// ─── 4. MOBILE MENU ─────────────────────────────
(function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-link");

  if (toggle) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        toggle.classList.remove("active");
      }
    });
  });
})();

// ─── 5. CONSOLIDATED SCROLL HANDLER ─────────────
(function initScrollHandler() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("back-to-top");
  const scrollProgressBar = document.getElementById("scroll-progress");

  let isTicking = false;

  function update() {
    const scrollY = window.scrollY;
    
    // 5a. Scroll Spy
    const spyScrollY = scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (spyScrollY >= top && spyScrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });

    // 5b. Navbar Scroll
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // 5c. Back To Top
    if (scrollY > 500) {
      if (backToTopBtn) backToTopBtn.classList.add("visible");
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove("visible");
    }

    // 5d. Scroll Progress Bar
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgressBar) scrollProgressBar.style.width = scrolled + "%";

    isTicking = false;
  }

  function requestUpdate() {
    if (!isTicking) {
      requestAnimationFrame(update);
      isTicking = true;
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
