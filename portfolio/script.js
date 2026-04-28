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

// ─── 2. PARTICLES BACKGROUND ────────────────────
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

// ─── 3. MOBILE MENU + CLICK ACTIVE STATE ────────
(function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const navLinksEl = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      navLinksEl.classList.toggle("active");
      navbar.classList.toggle("active");
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Immediately mark clicked link as active
          links.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");

          // Scroll to center
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Close mobile menu if open
          if (navLinksEl.classList.contains("active")) {
            navLinksEl.classList.remove("active");
            toggle.classList.remove("active");
            navbar.classList.remove("active");
          }
        }
      }
    });
  });
})();

// ─── 4. CONSOLIDATED SCROLL HANDLER ─────────────
(function initScrollHandler() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("back-to-top");
  const scrollProgressBar = document.getElementById("scroll-progress");

  let isTicking = false;

  function update() {
    const scrollY = window.scrollY;
    
    // Scroll Spy
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

    //  Navbar Scroll
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    //  Back To Top
    if (scrollY > 500) {
      if (backToTopBtn) backToTopBtn.classList.add("visible");
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove("visible");
    }

    // Scroll Progress Bar
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
