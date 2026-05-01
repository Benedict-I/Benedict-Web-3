/* =========================
   MAIN ENTRY (CLEAN + SAFE)
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
   1. SCROLL ANIMATIONS (YOUR STYLE + OPTIMIZED)
========================= */
function initAnimations() {
  const elements = document.querySelectorAll(
    ".animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in"
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      let animation =
        el.classList.contains("animate-fade-in-up") ? "fadeInUp" :
        el.classList.contains("animate-fade-in-down") ? "fadeInDown" :
        el.classList.contains("animate-fade-in-left") ? "fadeInLeft" :
        el.classList.contains("animate-fade-in-right") ? "fadeInRight" :
        "fadeIn";

      el.style.animation = `${animation} 0.8s ease-out forwards`;
      el.style.opacity = "1";
      el.style.transform = "translate(0)";

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
   2. MOBILE NAV (FIXED + CLEAN)
========================= */
function initMobileNav() {
  const nav = document.querySelector(".main-nav ul");
  const header = document.querySelector(".site-header .container");
  const btn = document.querySelector(".menu-toggle");

  if (!nav || !header || !btn) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      btn.classList.remove("active");
    });
  });

  function handleResize() {
    if (window.innerWidth > 768) {
      nav.classList.remove("active");
      btn.classList.remove("active");
    }
  }

  window.addEventListener("resize", handleResize);
}


/* =========================
   3. TYPING EFFECT (YOUR PERFECT VERSION)
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
    let speed;

    if (!isDeleting) {
      el.textContent = currentText.substring(0, charIndex);
      charIndex++;

      speed = currentText[charIndex - 1] === " " ? 120 : 90;

      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 6000);
        return;
      }
    } else {
      el.textContent = currentText.substring(0, charIndex);
      charIndex--;

      speed = 50;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
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

  function calc() {
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    target = height <= 0 ? 100 : (scroll / height) * 100;
  }

  function animate() {
    current += (target - current) * 0.08;
    bar.style.width = current + "%";
    requestAnimationFrame(animate);
  }

  window.addEventListener("scroll", calc, { passive: true });
  window.addEventListener("resize", calc);

  calc();
  animate();
}


/* =========================
   5. CONTACT FORM (BEST VERSION - NO CONFLICT)
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

    if (status) {
      status.textContent = "";
      status.className = "";
    }

    // START LOADING
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
        if (status) {
          status.className = "success";
          status.textContent = "✅ Message sent successfully!";
        }
        form.reset();
      } else {
        if (status) {
          status.className = "error";
          status.textContent = "❌ Something went wrong.";
        }
      }
    } catch {
      if (status) {
        status.className = "error";
        status.textContent = "❌ Network error.";
      }
    }

    // STOP LOADING
    btn.disabled = false;
    if (btnText) btnText.style.display = "inline";
    if (spinner) spinner.style.display = "none";
  });
}


/* =========================
   6. MOUSE TRACKER (SMOOTH)
========================= */
function initMouseTracker() {
  document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
  }, { passive: true });
}
