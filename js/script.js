
/* =========================
   DOM READY ENTRY POINT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initMobileNav();
  initTypedText();
  initProgressBar();
  initContactForm();
  initMouseTracker();
});

/* =========================
   1. SCROLL ANIMATIONS
========================= */
function initAnimations() {
  const animatedElements = document.querySelectorAll(
    ".animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in"
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        el.style.opacity = "1";
        el.style.transform = "translate(0)";
        el.classList.add("animated");

        obs.unobserve(el);
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px"
    }
  );

  animatedElements.forEach(el => {
    el.style.opacity = "0";

    if (el.classList.contains("animate-fade-in-up")) {
      el.style.transform = "translateY(30px)";
    }
    if (el.classList.contains("animate-fade-in-down")) {
      el.style.transform = "translateY(-20px)";
    }
    if (el.classList.contains("animate-fade-in-left")) {
      el.style.transform = "translateX(-30px)";
    }
    if (el.classList.contains("animate-fade-in-right")) {
      el.style.transform = "translateX(30px)";
    }

    observer.observe(el);
  });
}

/* =========================
   2. MOBILE NAV (SAFE)
========================= */
function initMobileNav() {
  const nav = document.querySelector(".main-nav ul");
  const headerContainer = document.querySelector(".site-header .container");
  const menuButton = document.querySelector(".menu-toggle");

  if (!nav || !headerContainer || !menuButton) return;

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuButton.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuButton.classList.remove("active");
    });
  });

  const handleResize = () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (!headerContainer.contains(menuButton)) {
        headerContainer.insertBefore(menuButton, nav);
      }
    } else {
     if (!isMobile) {
  nav.classList.remove("active");
  menuButton.classList.remove("active");
}
      }

      nav.classList.remove("active");
      menuButton.classList.remove("active");
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();
}

/* =========================
   3. TYPED TEXT (SAFE LOOP)
========================= */
function initTypedText() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const texts = [
    "Bring Your Story To Life.",
    "Turn Your Ideas into a Book.",
    "Become a Published Author."
  ];

  let index = 0;
  let char = 0;
  let deleting = false;

  function loop() {
    const current = texts[index];

    if (!deleting) {
      el.textContent = current.slice(0, char++);
      if (char > current.length) {
        deleting = true;
        setTimeout(loop, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, char--);
     if (char < 0) {
  deleting = false;
  index = (index + 1) % texts.length;
  char = 0;
}

    setTimeout(loop, deleting ? 50 : 90);
  }

  loop();
}

/* =========================
   4. SMOOTH PROGRESS BAR
========================= */
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  let target = 0;
  let current = 0;

  const calc = () => {
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;

    if (height <= 0) {
      target = 100;
      return;
    }

    target = (scroll / height) * 100;
  };

  const animate = () => {
    current += (target - current) * 0.08;
    bar.style.width = current + "%";
    requestAnimationFrame(animate);
  };

  window.addEventListener("scroll", calc, { passive: true });
  window.addEventListener("resize", calc);

  calc();
  animate();
}

/* =========================
   5. CONTACT FORM (CLEAN)
========================= */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("status-message");
  const btn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const spinner = document.getElementById("spinner");

    
  form.addEventListener("submit", async e => {
    e.preventDefault();
      status.textContent = "";
status.className = "";

    btn.disabled = true;
    if (btnText) btnText.textContent = "Sending...";
    if (spinner) spinner.style.display = "inline-block";

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        status.className = "success";
        status.textContent = "Message sent successfully!";
        form.reset();
      } else {
        status.className = "error";
        status.textContent = "Something went wrong.";
      }
    } catch {
      status.className = "error";
      status.textContent = "Network error.";
    }

    btn.disabled = false;
    if (btnText) btnText.textContent = "Send Message";
    if (spinner) spinner.style.display = "none";
  });
}

/* =========================
   6. MOUSE TRACKER
========================= */
function initMouseTracker() {
  document.addEventListener("mousemove", e => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
  }, { passive: true });
}
