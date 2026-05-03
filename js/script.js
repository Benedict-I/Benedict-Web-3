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
function initGalaxy()
  const canvas = document.getElementById("galaxy");
  const nebula = document.getElementById("nebula");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let w, h;
  let angle = 0;

  const layers = [
    { stars: [], speed: 0.3, size: 0.6, count: 120 },
    { stars: [], speed: 0.6, size: 1.2, count: 140 },
    { stars: [], speed: 1.2, size: 1.8, count: 160 }
  ];

  let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  let scrollBoost = 0;

  /* -------------------------
     RESIZE
  ------------------------- */
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    layers.forEach(layer => {
      layer.stars = [];
      for (let i = 0; i < layer.count; i++) {
        layer.stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 1000
        });
      }
    });
  }

  window.addEventListener("resize", resize);
  resize();

  /* -------------------------
     MOUSE TRACKING
  ------------------------- */
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  /* -------------------------
     SCROLL NEBULA BOOST
  ------------------------- */
  window.addEventListener("scroll", () => {
    scrollBoost = Math.min(window.scrollY * 0.002, 1.5);

    if (nebula) {
      nebula.style.opacity = 0.4 + scrollBoost * 0.3;
      nebula.style.transform = `scale(${1.2 + scrollBoost * 0.2})`;
    }
  });

  /* -------------------------
     SHOOTING STARS
  ------------------------- */
  const shootingStars = [];

  function spawnShootingStar() {
    shootingStars.push({
      x: Math.random() * w,
      y: Math.random() * h * 0.5,
      len: Math.random() * 200 + 100,
      speed: Math.random() * 6 + 4,
      angle: Math.PI / 4,
      life: 1
    });
  }

  setInterval(spawnShootingStar, 2500);

  /* -------------------------
     ANIMATION LOOP
  ------------------------- */
  function draw() {
    ctx.clearRect(0, 0, w, h);

    angle += 0.0008;

    /* =========================
       STAR LAYERS
    ========================= */
    layers.forEach((layer, index) => {
      layer.stars.forEach(star => {

        star.z -= layer.speed;
        if (star.z <= 0) {
          star.x = Math.random() * w;
          star.y = Math.random() * h;
          star.z = 1000;
        }

        const k = 120 / star.z;

        let x = (star.x - w / 2) * k + w / 2;
        let y = (star.y - h / 2) * k + h / 2;

        // swirl rotation
        const dx = x - w / 2;
        const dy = y - h / 2;

        const rx = dx * Math.cos(angle) - dy * Math.sin(angle);
        const ry = dx * Math.sin(angle) + dy * Math.cos(angle);

        x = rx + w / 2;
        y = ry + h / 2;

        // cursor gravity (stronger for closer layers)
        const distX = mouse.x - x;
        const distY = mouse.y - y;

        const dist = Math.sqrt(distX * distX + distY * distY);
        const force = Math.min(200 / dist, 3) * (index + 1);

        x += distX * force * 0.02;
        y += distY * force * 0.02;

        const size = layer.size * (1 - star.z / 1000);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.8;
        ctx.fill();
      });
    });

    ctx.globalAlpha = 1;

    /* =========================
       SHOOTING STARS
    ========================= */
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life -= 0.01;

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(
        s.x - Math.cos(s.angle) * s.len,
        s.y - Math.sin(s.angle) * s.len
      );

      ctx.strokeStyle = `rgba(255,255,255,${s.life})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (s.life <= 0) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}
