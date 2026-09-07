// Smoky cursor trail
(function () {
  const canvas = document.getElementById("cursor-fx-canvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  const FRICTION = 0.96;
  const ALPHA_DECAY = 0.012;
  const GROWTH_RATE = 0.06;
  const MAX_PARTICLES = 220;
  const isDesktop = () => !window.matchMedia("(pointer: coarse)").matches && window.innerWidth >= 768;

  let dpr = 1;
  let width = 0;
  let height = 0;
  let particles = [];
  let lastPos = null;
  let rafId = null;
  let running = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnPuffs(x, y, dx, dy) {
    for (let n = 0; n < 2; n++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: dx * 0.15 + (Math.random() - 0.5) * 0.4,
        vy: dy * 0.15 - 0.3 + (Math.random() - 0.5) * 0.4,
        size: 4 + Math.random() * 6,
        maxSize: 20 + Math.random() * 25,
        alpha: 0.45,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
    if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
  }

  function drawPuff(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.scale(1, 0.82);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
    gradient.addColorStop(0, `rgba(245, 158, 11, ${p.alpha * 0.3})`);
    gradient.addColorStop(0.3, `rgba(220, 38, 38, ${p.alpha * 0.28})`);
    gradient.addColorStop(0.6, `rgba(63, 63, 70, ${p.alpha * 0.15})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vx *= FRICTION;
      p.vy *= FRICTION;
      p.x += p.vx;
      p.y += p.vy;
      p.size += (p.maxSize - p.size) * GROWTH_RATE;
      p.alpha -= ALPHA_DECAY;
      p.rotation += p.rotationSpeed;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      drawPuff(p);
    }

    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    rafId = requestAnimationFrame(draw);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    particles = [];
    lastPos = null;
    canvas.classList.add("hidden");
  }

  function evaluate() {
    if (isDesktop() && !document.hidden) {
      canvas.classList.remove("hidden");
      start();
    } else {
      stop();
    }
  }

  window.addEventListener("mousemove", (e) => {
    if (!running) return;
    const x = e.clientX;
    const y = e.clientY;
    if (lastPos) spawnPuffs(x, y, x - lastPos.x, y - lastPos.y);
    lastPos = { x, y };
  });
  window.addEventListener("resize", () => {
    if (running) resize();
    evaluate();
  });
  document.addEventListener("visibilitychange", evaluate);
  window.addEventListener("blur", stop);
  window.addEventListener("focus", evaluate);

  evaluate();
})();
