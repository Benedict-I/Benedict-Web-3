window.client
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
  initScrollReveal();
});
function initScrollReveal() {
  const elements = document.querySelectorAll("section > .container > div, .service-item, .review-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el, index) => {
    el.classList.add("reveal");

    if (index % 2 === 0) {
      el.classList.add("reveal-left");
    } else {
      el.classList.add("reveal-right");
    }

    observer.observe(el);
  });
}
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

  /* OPEN/CLOSE MENU */
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
    menuBtn.classList.toggle("active");

    /* LOCK SCROLL */
    if (nav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
   
  /* CLOSE WHEN LINK CLICKED */
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
   
  /* CLOSE WHEN CLICKING OUTSIDE */
  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      nav.classList.remove("active");
      menuBtn.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
  /* FIX RESIZE BUG */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("active");
      menuBtn.classList.remove("active");
      document.body.style.overflow = "";
    }
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
   5. CONTACT FORM + LIVE REVIEWS
========================= */
function initContactForm() {

  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("status-message");
  const btn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const spinner = document.getElementById("spinner");

  loadReviews();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "";
    btn.disabled = true;

    if (btnText) btnText.style.display = "none";
    if (spinner) spinner.style.display = "inline-block";

    const name =
      form.querySelector('input[name="name"]')?.value || "Anonymous";

    const message =
      form.querySelector('textarea[name="review"]')?.value || "";

    try {
      const { error } = await client
        .from("reviews")
        .insert([{ name, message }]);

      if (error) throw error;

      addReviewToPage({
        name,
        message,
        date: new Date().toLocaleDateString()
      });

      status.textContent = "Review saved successfully!";
      form.reset();

    } catch (err) {
      console.error(err);
      status.textContent = "Failed to save review";
    }

    btn.disabled = false;
    if (btnText) btnText.style.display = "inline";
    if (spinner) spinner.style.display = "none";
  });






      <div>

        <h4>${review.name}</h4>

        <small>${review.date}</small>

      </div>

    </div>

    <div class="review-stars">
      ★★★★★
    </div>

    <p class="review-text">
      ${review.message}
    </p>
  ;

  container.prepend(card);

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

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let scrollBoost = 0;

  /* =========================
     RESIZE
  ========================= */
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

  /* =========================
     MOUSE
  ========================= */
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  /* =========================
     SCROLL BOOST (NEBULA)
  ========================= */
  window.addEventListener("scroll", () => {
    scrollBoost = Math.min(window.scrollY * 0.002, 1.5);

    if (nebula) {
      nebula.style.opacity = 0.4 + scrollBoost * 0.3;
      nebula.style.transform = `scale(${1.2 + scrollBoost * 0.2})`;
    }
  });

  /* =========================
     SHOOTING STARS
  ========================= */
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

  /* =========================
     DRAW LOOP
  ========================= */
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    angle += 0.0008;

    /* =========================
       STAR LAYERS
    ========================= */
    layers.forEach((layer, index) => {

      ctx.globalAlpha = 0.8;

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

        // swirl
        const dx = x - w / 2;
        const dy = y - h / 2;

        const rx = dx * Math.cos(angle) - dy * Math.sin(angle);
        const ry = dx * Math.sin(angle) + dy * Math.cos(angle);

        x = rx + w / 2;
        y = ry + h / 2;

        // gravity
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




/* =========================
   PORTFOLIO MODAL SYSTEM
========================= */
const modal = document.getElementById("portfolioModal");

if (modal) {
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalDesc = document.getElementById("modalDesc");
  const closeBtn = document.querySelector(".close-btn");

  document.querySelectorAll(".portfolio-item").forEach(item => {
    item.addEventListener("click", () => {
      modal.style.display = "flex";

      modalImg.src = item.dataset.img;
      modalTitle.textContent = item.dataset.title;
      modalMeta.textContent = item.dataset.meta;
      modalDesc.textContent = item.dataset.desc;
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });
}





/* =========================================================
GLOBAL MOUSE PARALLAX
========================================================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});


/* =========================================================
ABOUT — SPACE PARTICLES
========================================================= */

const spaceCanvas = document.getElementById("space");

if (spaceCanvas) {

    const ctx = spaceCanvas.getContext("2d");

    let particles = [];

    function resizeSpace() {

        spaceCanvas.width = window.innerWidth;
        spaceCanvas.height = window.innerHeight;
    }

    resizeSpace();

    for (let i = 0; i < 150; i++) {

        particles.push({

            x: Math.random() * spaceCanvas.width,
            y: Math.random() * spaceCanvas.height,

            size: Math.random() * 2,

            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }

    function animateSpace() {

        ctx.clearRect(
            0,
            0,
            spaceCanvas.width,
            spaceCanvas.height
        );

        for (let p of particles) {

            ctx.fillStyle = "rgba(255,255,255,0.7)";

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = spaceCanvas.width;
            if (p.x > spaceCanvas.width) p.x = 0;

            if (p.y < 0) p.y = spaceCanvas.height;
            if (p.y > spaceCanvas.height) p.y = 0;
        }

        requestAnimationFrame(animateSpace);
    }

    animateSpace();

    window.addEventListener("resize", resizeSpace);
}


/* =========================================================
SERVICES — BLUE TORUS KNOT
========================================================= */

const torusCanvas = document.getElementById("torus-canvas");

if (torusCanvas) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        1,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas: torusCanvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    const geometry = new THREE.TorusKnotGeometry(
        1,
        0.3,
        220,
        32
    );

    const material = new THREE.MeshBasicMaterial({

        color: 0x4aa3ff,
        wireframe: true,

        transparent: true,
        opacity: 0.55
    });

    const torus = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(torus);

    camera.position.z = 4;

    function resizeTorus() {

        const parent = torusCanvas.parentElement;

        renderer.setSize(
            parent.offsetWidth,
            parent.offsetHeight
        );

        camera.aspect =
            parent.offsetWidth /
            parent.offsetHeight;

        camera.updateProjectionMatrix();
    }

    resizeTorus();

    function animateTorus() {

        requestAnimationFrame(animateTorus);

        torus.rotation.x += 0.0025;
        torus.rotation.y += 0.0035;

        camera.position.x +=
            (mouseX * 1.2 - camera.position.x) * 0.03;

        camera.position.y +=
            (-mouseY * 1.2 - camera.position.y) * 0.03;

        renderer.render(scene, camera);
    }

    animateTorus();

    window.addEventListener(
        "resize",
        resizeTorus
    );
}


/* =========================================================
CONTACT — GALAXY SPIRAL
========================================================= */

const galaxyCanvas = document.getElementById("galaxy-canvas");

if (galaxyCanvas) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        1,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({

        canvas: galaxyCanvas,

        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    const particlesGeometry =
        new THREE.BufferGeometry();

    const particlesCount =
        window.innerWidth < 768
            ? 1200
            : 3000;

    const posArray =
        new Float32Array(
            particlesCount * 3
        );

    for (let i = 0; i < particlesCount * 3; i++) {

        posArray[i] =
            (Math.random() - 0.5) * 24;
    }

    particlesGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            posArray,
            3
        )
    );

    const particlesMaterial =
        new THREE.PointsMaterial({

            size: 0.025,

            color: 0xffffff,

            transparent: true,

            opacity: 0.8
        });

    const particlesMesh =
        new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );

    scene.add(particlesMesh);

    camera.position.z = 5;

    function resizeGalaxy() {

        const parent =
            galaxyCanvas.parentElement;

        renderer.setSize(
            parent.offsetWidth,
            parent.offsetHeight
        );

        camera.aspect =
            parent.offsetWidth /
            parent.offsetHeight;

        camera.updateProjectionMatrix();
    }

    resizeGalaxy();

    function animateGalaxy() {

        requestAnimationFrame(
            animateGalaxy
        );

        particlesMesh.rotation.y += 0.0007;

        particlesMesh.rotation.x += 0.0002;

        camera.position.x +=
            (mouseX * 0.7 - camera.position.x)
            * 0.02;

        camera.position.y +=
            (-mouseY * 0.7 - camera.position.y)
            * 0.02;

        renderer.render(scene, camera);
    }

    animateGalaxy();

    window.addEventListener(
        "resize",
        resizeGalaxy
    );
}


/* =========================================================
PORTFOLIO — FLOATING WIREFRAME SPHERES
========================================================= */

const sphereCanvas =
    document.getElementById(
        "sphere-canvas"
    );

if (sphereCanvas) {

    const scene = new THREE.Scene();

    const camera =
        new THREE.PerspectiveCamera(
            75,
            1,
            0.1,
            1000
        );

    const renderer =
        new THREE.WebGLRenderer({

            canvas: sphereCanvas,

            alpha: true,

            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    const group = new THREE.Group();

    for (let i = 0; i < 12; i++) {

        const geometry =
            new THREE.SphereGeometry(

                Math.random() * 0.6 + 0.25,

                18,

                18
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                wireframe: true,

                transparent: true,

                opacity: 0.35
            });

        const sphere =
            new THREE.Mesh(
                geometry,
                material
            );

        sphere.position.x =
            (Math.random() - 0.5) * 10;

        sphere.position.y =
            (Math.random() - 0.5) * 6;

        sphere.position.z =
            (Math.random() - 0.5) * 5;

        sphere.userData = {

            speed:
                Math.random() * 0.003 + 0.001
        };

        group.add(sphere);
    }

    scene.add(group);

    camera.position.z = 6;

    function resizeSphere() {

        const parent =
            sphereCanvas.parentElement;

        renderer.setSize(
            parent.offsetWidth,
            parent.offsetHeight
        );

        camera.aspect =
            parent.offsetWidth /
            parent.offsetHeight;

        camera.updateProjectionMatrix();
    }

    resizeSphere();

    function animateSphere() {

        requestAnimationFrame(
            animateSphere
        );

        group.rotation.y += 0.0015;

        group.children.forEach((sphere) => {

            sphere.rotation.x +=
                sphere.userData.speed;

            sphere.rotation.y +=
                sphere.userData.speed;
        });

        camera.position.x +=
            (mouseX * 1.5 - camera.position.x)
            * 0.03;

        camera.position.y +=
            (-mouseY * 1.5 - camera.position.y)
            * 0.03;

        renderer.render(scene, camera);
    }

    animateSphere();

    window.addEventListener(
        "resize",
        resizeSphere
    );
}




   function getInitials(name) {
  return name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";
}

function generateAvatarGradient(name) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue1 = hash % 360;
  const hue2 = (hash * 3) % 360;

  return `radial-gradient(circle at top left,
    hsl(${hue1}, 90%, 60%),
    hsl(${hue2}, 80%, 45%)
  )`;
}
