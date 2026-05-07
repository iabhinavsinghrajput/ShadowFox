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
  const isMobile = window.innerWidth < 768;
  return {
    particles: {
      number: { 
        value: isMobile ? 25 : 50, 
        density: { enable: true, value_area: 900 } 
      },
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
        enable: !isMobile, // Disable links on mobile for performance
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
        onhover: { enable: !isMobile, mode: "grab" },
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

          // Scroll to top of section (respecting scroll-padding-top)
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
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

  // 1. Scroll Spy using IntersectionObserver (More Performant)
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Trigger when section is in the upper part of the viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 2. Optimized Scroll Handler for Navbar and Progress
  let isTicking = false;

  function update() {
    const scrollY = window.scrollY;

    // Navbar Scroll
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back To Top
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

// ─── 5. HIDDEN LINK HANDLER ─────────────────────
(function initHiddenLinks() {
  const links = document.querySelectorAll(".js-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = link.getAttribute("data-href");
      const target = link.getAttribute("target") || "_self";
      if (url) {
        window.open(url, target);
      }
    });
  });
})();
