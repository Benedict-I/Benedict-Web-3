document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initMobileNav();
  initTypedText();
  initProgressBar();
  initContactForm();
  initMouseTracker();
});

/* =========================
   1. SCROLL ANIMATIONS (YOUR STYLE PRESERVED)
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
   2. MOBILE NAV (FIXED CLEAN)
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
   3. TYPED TEXT (SMOOTH)
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
    const currentText = texts[textIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    el.textContent = currentText.substring(0, charIndex);

    let speed = isDeleting ? 120 : 90;

    // when finished typing
    if (!isDeleting && charIndex === currentText.length) {
      speed = 5000; // pause before deleting
      isDeleting = true;
    }

    // when finished deleting
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}


/* =========================
   4. PROGRESS BAR (SMOOTH)
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
   5. CONTACT FORM (PERFECT + SPINNER FIXED)
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

    // RESET UI
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
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        status.className = "error";
        status.textContent = "❌ Something went wrong.";
      }

    } catch {
      status.className = "error";
      status.textContent = "❌ Network error.";
    }

    // RESTORE BUTTON
    btn.disabled = false;
    if (btnText) btnText.style.display = "inline";
    if (spinner) spinner.style.display = "none";
  });
}

/* =========================
   6. MOUSE TRACKER (LIGHT EFFECT)
========================= */
function initMouseTracker() {
  document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
  }, { passive: true });
}
function initGalaxy() {
  const canvas = document.getElementById("galaxy");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  // create stars
  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.3,
      alpha: Math.random()
    });
  }

  function draw(// soft nebula glow
const gradient = ctx.createRadialGradient(
  w * 0.7, h * 0.3, 0,
  w * 0.7, h * 0.3, 400
);
gradient.addColorStop(0, "rgba(0,150,255,0.15)");
gradient.addColorStop(1, "transparent");

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, w, h);) {
    ctx.clearRect(0, 0, w, h);

    // draw stars
    stars.forEach(star => {
      star.y += star.speed;

      if (star.y > h) {
        star.y = 0;
        star.x = Math.random() * w;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// run it
document.addEventListener("DOMContentLoaded", initGalaxy);


function initGalaxy() {
  const canvas = document.getElementById("galaxy");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let w, h;
  let layers = [];
  let shootingStars = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let scrollProgress = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  // 🖱️ Mouse tracking
  document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // 📜 Scroll tracking
  window.addEventListener("scroll", () => {
    const max = document.body.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? window.scrollY / max : 0;
  });

  // ⭐ CREATE 3D LAYERS
  const layerCount = 3;

  for (let l = 0; l < layerCount; l++) {
    const stars = [];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * 1000,
        size: Math.random() * (l + 1),
        speed: (l + 1) * 0.2
      });
    }

    layers.push(stars);
  }

  // 🌠 Shooting stars
  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * w,
      y: 0,
      len: Math.random() * 100 + 50,
      speed: Math.random() * 10 + 5,
      opacity: 1
    });
  }

  setInterval(createShootingStar, 2500);

  function getSectionColor() {
    const sections = document.querySelectorAll("section");
    let color = "rgba(0,150,255,0.15)";

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        const val = getComputedStyle(sec).getPropertyValue("--galaxy-color");
        if (val) color = val;
      }
    });

    return color;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // 🌌 SWIRL ROTATION CENTER
    const cx = w / 2;
    const cy = h / 2;
    const time = Date.now() * 0.00005;

    // 🌈 SCROLL COLOR SHIFT
    const glowColor = getSectionColor();

    const gradient = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      500
    );
    gradient.addColorStop(0, glowColor);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // ⭐ DRAW PARALLAX STARS
    layers.forEach((stars, layerIndex) => {
      stars.forEach(star => {
        // perspective
        star.z -= star.speed;

        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * w - w / 2;
          star.y = Math.random() * h - h / 2;
        }

        let k = 128 / star.z;
        let px = star.x * k + cx;
        let py = star.y * k + cy;

        // 🌀 SWIRL ROTATION
        const angle = Math.atan2(py - cy, px - cx) + time * (0.2 + layerIndex * 0.1);
        const radius = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);

        px = cx + Math.cos(angle) * radius;
        py = cy + Math.sin(angle) * radius;

        // 🖱️ CURSOR GRAVITY
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          px -= dx * 0.01;
          py -= dy * 0.01;
        }

        const size = star.size * (1 - star.z / 1000);

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });
    });

    // 🌠 DRAW SHOOTING STARS
    shootingStars.forEach((s, i) => {
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.len, s.y + s.len);
      ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      s.x += s.speed;
      s.y += s.speed;
      s.opacity -= 0.015;

      if (s.opacity <= 0) shootingStars.splice(i, 1);
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// RUN
document.addEventListener("DOMContentLoaded", initGalaxy);
