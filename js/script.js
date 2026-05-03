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
  initGalaxy();
});

/* =========================
   1. SCROLL ANIMATIONS
========================= */
function initAnimations() {
  const elements = document.querySelectorAll(
    ".animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in"
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      el.style.opacity = "1";
      el.style.transform = "translate(0)";
      el.style.animationPlayState = "running";

      obs.unobserve(el);
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = "0";

    if (el.classList.contains("animate-fade-in-up")) el.style.transform = "translateY(30px)";
    if (el.classList.contains("animate-fade-in-down")) el.style.transform = "translateY(-20px)";
    if (el.classList.contains("animate-fade-in-left")) el.style.transform = "translateX(-30px)";
    if (el.classList.contains("animate-fade-in-right")) el.style.transform = "translateX(30px)";

    observer.observe(el);
  });
}

/* =========================
   2. MOBILE NAV
========================= */
function initMobileNav() {
  const nav = document.querySelector(".main-nav ul");
  const menuBtn = document.querySelector(".menu-toggle");

  if (!nav || !menuBtn) return;

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });
}

/* =========================
   3. TYPED TEXT
========================= */
function initTypedText() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const texts = [
    "Bring Your Story To Life.",
    "Turn Your Ideas into a Book.",
    "Become a Published Author."
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = texts[textIndex];

    charIndex += isDeleting ? -1 : 1;
    el.textContent = current.substring(0, charIndex);

    let speed = isDeleting ? 60 : 90;

    if (!isDeleting && charIndex === current.length) {
      speed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

/* =========================
   4. SMOOTH PROGRESS BAR
========================= */
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  let target = 0;
  let current = 0;

  const update = () => {
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    target = height > 0 ? (scroll / height) * 100 : 100;
  };

  const animate = () => {
    current += (target - current) * 0.08;
    bar.style.width = current + "%";
    requestAnimationFrame(animate);
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  update();
  animate();
}

/* =========================
   5. CONTACT FORM
========================= */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("status-message");
  const btn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const spinner = document.getElementById("spinner");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "";
    status.className = "";

    btn.disabled = true;
    if (btnText) btnText.style.display = "none";
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
    if (btnText) btnText.style.display = "inline";
    if (spinner) spinner.style.display = "none";
  });
}

/* =========================
   6. MOUSE TRACKER
========================= */
function initMouseTracker() {
  document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
  }, { passive: true });
}

/* =========================
   7. GALAXY BACKGROUND
========================= */
function initGalaxy() {
  const canvas = document.getElementById("galaxy");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let w, h;
  let stars = [];
  let angle = 0;

  let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  // Create stars
  for (let i = 0; i < 260; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: 0,
      baseY: 0,
      z: Math.random() * 1000
    });
  }

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);

    angle += 0.0008; // slow swirl speed

    stars.forEach(star => {
      // depth movement
      star.z -= 1.5;
      if (star.z <= 0) {
        star.x = Math.random() * w;
        star.y = Math.random() * h;
        star.z = 1000;
      }

      // base projection
      const k = 128 / star.z;
      let x = (star.x - w / 2) * k + w / 2;
      let y = (star.y - h / 2) * k + h / 2;

      // ===== SWIRL ROTATION =====
      const dx = x - w / 2;
      const dy = y - h / 2;

      const rotatedX = dx * Math.cos(angle) - dy * Math.sin(angle);
      const rotatedY = dx * Math.sin(angle) + dy * Math.cos(angle);

      x = rotatedX + w / 2;
      y = rotatedY + h / 2;

      // ===== CURSOR GRAVITY =====
      const distX = mouse.x - x;
      const distY = mouse.y - y;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const force = Math.min(120 / distance, 2); // clamp force

      x += distX * force * 0.05;
      y += distY * force * 0.05;

      // star size
      const size = (1 - star.z / 1000) * 2;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}
