// Portfolio front-end logic

document.getElementById("year").textContent = new Date().getFullYear();

// Hero role ticker
(function () {
  const TITLES = ["Software Engineer", "Cloud Engineer", "AWS Engineer", "Full-Stack Developer"];
  const HOLD_MS = 2500;
  const TRANSITION_MS = 450;
  const el = document.getElementById("role-ticker-text");
  if (!el) return;

  let index = 0;
  let timerId = null;

  function advance() {
    el.classList.add("ticker-leave");
    setTimeout(() => {
      index = (index + 1) % TITLES.length;
      el.textContent = TITLES[index];
      el.classList.remove("ticker-leave");
      el.classList.add("ticker-enter-start");
      void el.offsetWidth;
      el.classList.remove("ticker-enter-start");
    }, TRANSITION_MS);
  }

  function start() {
    if (timerId) return;
    timerId = setInterval(advance, HOLD_MS);
  }

  function stop() {
    clearInterval(timerId);
    timerId = null;
  }

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  start();
})();

const iconFor = (key) => {
  const icons = {
    github:
      '<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.7 11.7 0 0 1 6.2 0c2.4-1.6 3.4-1.2 3.4-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>',
    linkedin:
      '<path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.6V9H7v11.4Z"/>',
    leetcode:
      '<path d="m13.5 2-8 8.4a2.4 2.4 0 0 0 0 3.3l4.9 4.9a2.4 2.4 0 0 0 3.4 0l3-3a1.2 1.2 0 0 0-1.7-1.7l-2.7 2.7a.6.6 0 0 1-.8 0l-4.6-4.6a.6.6 0 0 1 0-.8l7.7-8.1A1.2 1.2 0 1 0 13.5 2Zm5 13.4a1.2 1.2 0 0 0-1.2 1.2 1.6 1.6 0 0 1-1.6 1.6H12a1.2 1.2 0 1 0 0 2.4h3.7a4 4 0 0 0 4-4 1.2 1.2 0 0 0-1.2-1.2Z"/>',
    twitter:
      '<path d="M23 4.9c-.8.4-1.7.6-2.6.8a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1a4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 3.6a4.5 4.5 0 0 0 1.4 6 4.4 4.4 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 19.5a12.8 12.8 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.2Z"/>',
    mail:
      '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.2V17h18V7.2l-8.5 6.1a1 1 0 0 1-1 0L3 7.2Zm1.4-.7 7.6 5.4 7.6-5.4H4.4Z"/>',
    resume:
      '<path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm8 1.5V8h4.5L14 3.5ZM8 12h8v1.5H8V12Zm0 3.5h8V17H8v-1.5ZM8 8.5h4V10H8V8.5Z"/>',
  };
  return icons[key] || "";
};

function svgIcon(key, extraClass = "h-4 w-4") {
  return `<svg viewBox="0 0 24 24" fill="currentColor" class="${extraClass}">${iconFor(key)}</svg>`;
}

function initialsFor(name) {
  const words = name.replace(/[()/.]/g, " ").trim().split(/\s+/).filter(Boolean);
  const initials = words.length >= 2 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return initials.toUpperCase();
}

const SIMPLE_ICONS_VERSION = "latest";
const BRAND_ICONS = {
  Java: { iconUrl: "assets/icons/java.svg", hex: "007396" },
  Python: { slug: "python", hex: "3776AB" },
  JavaScript: { slug: "javascript", hex: "F7DF1E" },
  TypeScript: { slug: "typescript", hex: "3178C6" },
  HTML5: { slug: "html5", hex: "E34F26" },
  CSS3: { slug: "css3", hex: "1572B6" },
  "Spring Boot": { slug: "springboot", hex: "6DB33F" },
  AWS: { slug: "amazonwebservices", hex: "FF9900" },
  Azure: { slug: "microsoftazure", hex: "0078D4" },
  Docker: { slug: "docker", hex: "2496ED" },
  Kubernetes: { slug: "kubernetes", hex: "326CE5" },
  "Apache Kafka": { slug: "apachekafka", hex: "231F20", displayHex: "E6EDF3" },
  PostgreSQL: { slug: "postgresql", hex: "4169E1" },
  MySQL: { slug: "mysql", hex: "4479A1" },
  MongoDB: { slug: "mongodb", hex: "47A248" },
  Redis: { slug: "redis", hex: "DC382D" },
  Jenkins: { slug: "jenkins", hex: "D24939" },
  "GitHub Actions": { slug: "githubactions", hex: "2088FF" },
  Terraform: { slug: "terraform", hex: "7B42BC" },
  Git: { slug: "git", hex: "F05032" },
  "Linux (Ubuntu)": { slug: "linux", hex: "FCC624" },
  Maven: { slug: "apachemaven", hex: "C71A36" },
  FastAPI: { slug: "fastapi", hex: "009688" },
  Flask: { slug: "flask", hex: "000000" },
  JUnit: { slug: "junit5", hex: "25A162" },
  SonarQube: { slug: "sonarqube", hex: "4E9BCD" },
  "Spring MVC": { slug: "spring", hex: "6DB33F" },
  "Spring GraphQL": { slug: "graphql", hex: "E10098" },
  "Hibernate ORM": { slug: "hibernate", hex: "59666C" },
  BigQuery: { slug: "googlebigquery", hex: "4285F4" },
  Pytest: { slug: "pytest", hex: "0A9EDC" },
  LangChain: { slug: "langchain", hex: "1C3C3C" },
  HackerRank: { slug: "hackerrank", hex: "00EA64" },
  "AWS Lambda": { slug: "awslambda", hex: "FF9900" },
  "Amazon S3": { slug: "amazons3", hex: "569A31" },
  "Amazon EC2": { slug: "amazonec2", hex: "FF9900" },
  "AWS ECS": { slug: "amazonecs", hex: "FF9900" },
  "AWS EKS": { slug: "amazoneks", hex: "FF9900" },
  "Amazon DynamoDB": { slug: "amazondynamodb", hex: "4053D6" },
  "Amazon SQS": { slug: "amazonsqs", hex: "FF4F8B" },
  "Amazon API Gateway": { slug: "amazonapigateway", hex: "FF4F8B" },
  Claude: { slug: "claude", hex: "D97757" },
  Cursor: { slug: "cursor", hex: "000000", displayHex: "E6EDF3" },
  ChatGPT: { iconUrl: "assets/icons/openai.svg", hex: "412991" },
};

const NO_LOGO_SKILLS = new Set(["Prompt Engineering"]);

function brandIconHTML(name, { size = "h-9 w-9", tintOnHover = false, scaleOnHover = false, alwaysBrand = false } = {}) {
  const brand = BRAND_ICONS[name];
  if (!brand) {
    return `<span class="flex ${size} shrink-0 items-center justify-center rounded-md border border-ink-border font-display text-[10px] font-bold text-amber">${initialsFor(name)}</span>`;
  }
  const iconUrl = brand.iconUrl || `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}/icons/${brand.slug}.svg`;
  const colorClass = alwaysBrand ? "" : tintOnHover ? "text-ink_text-muted group-hover:text-[var(--brand)]" : "text-ink_text-muted";
  const behaviorClasses = ["transition-all duration-200", colorClass, scaleOnHover ? "group-hover/skill:scale-110" : ""].join(" ");
  return `<span
      class="mask-icon ${size} shrink-0 ${behaviorClasses}"
      style="${alwaysBrand ? `color:#${brand.displayHex || brand.hex};` : ""}mask-image:url('${iconUrl}');-webkit-mask-image:url('${iconUrl}');--brand:#${brand.hex}"
      aria-hidden="true"
    ></span>`;
}

function skillCardHTML(name, years) {
  return `
    <div class="group aspect-square rounded-lg shadow-md shadow-black/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/40 [perspective:1000px]">
      <div class="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div class="card absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg p-4 text-center [backface-visibility:hidden]">
          ${brandIconHTML(name, { alwaysBrand: true })}
          <span class="font-mono text-xs font-medium leading-snug text-ink_text-primary">${name}</span>
        </div>
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg border border-amber/40 bg-ink-card p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span class="font-display text-2xl font-extrabold text-amber">${years}</span>
          <span class="font-mono text-[10px] uppercase tracking-widest text-ink_text-muted">Experience</span>
        </div>
      </div>
    </div>`;
}

fetch("data/content.json")
  .then((res) => res.json())
  .then(renderContent)
  .catch((err) => console.error("Failed to load content.json", err));

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightPhrases(text, phrases) {
  let safe = escapeHtml(text);
  phrases.forEach((phrase) => {
    const escapedPhrase = escapeHtml(phrase);
    safe = safe.replace(escapedPhrase, `<span class="text-ink_text-primary font-medium">${escapedPhrase}</span>`);
  });
  return safe;
}

function renderContent(data) {
  // Hero
  document.getElementById("hero-name").textContent = data.name;
  document.getElementById("hero-summary").innerHTML = highlightPhrases(data.summary, ["3.5+ years", "Java microservices"]);
  document.getElementById("about-summary").textContent = data.summary;
  document.getElementById("about-location").textContent = data.location || "—";
  document.getElementById("resume-link").href = data.resumeUrl || "#";
  document.getElementById("contact-email").href = `mailto:${data.email}`;
  document.getElementById("contact-email").textContent = data.email;
  document.title = `${data.name} — ${data.role}`;

  const heroLinks = document.getElementById("hero-links");
  const socialOrder = ["github", "linkedin", "leetcode", "twitter"];
  heroLinks.innerHTML = socialOrder
    .filter((key) => data.links && data.links[key])
    .map(
      (key) => `
      <a href="${data.links[key]}" target="_blank" rel="noopener" class="flex items-center gap-1.5 transition-colors duration-300 hover:text-ink_text-primary">
        ${svgIcon(key)} ${key}
      </a>`
    )
    .join("");

  // Technical Skills
  const skillsGrid = document.getElementById("skills-grid");
  const skillYears = data.experienceYears || "3.5+";
  skillsGrid.innerHTML = Object.entries(data.skills || {})
    .map(([category, items]) => {
      const withLogo = (items || []).filter((item) => BRAND_ICONS[item] || NO_LOGO_SKILLS.has(item));
      if (!withLogo.length) return "";
      return `
      <div>
        <p class="mb-3 font-mono text-xs text-amber">${category}</p>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
          ${withLogo.map((item) => skillCardHTML(item, skillYears)).join("")}
        </div>
      </div>`;
    })
    .join("");

  // Projects
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = (data.projects || [])
    .map(
      (p, i) => `
      <article class="card reveal flex flex-col p-6" style="transition-delay:${i * 80}ms">
        <div class="mb-4 flex items-start justify-between">
          <span class="font-mono text-xs text-ink_text-faint">${p.id || String(i + 1).padStart(2, "0")}</span>
          <div class="flex gap-3 text-ink_text-muted">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="hover:text-amber" aria-label="GitHub repository">${svgIcon("github")}</a>` : ""}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="hover:text-amber" aria-label="Live demo">${svgIcon("mail")}</a>` : ""}
          </div>
        </div>
        <h3 class="font-display text-lg font-semibold">${p.title}</h3>
        <p class="mt-3 flex-1 text-sm leading-relaxed text-ink_text-muted">${p.description}</p>
        <div class="mt-5 flex flex-wrap gap-2 border-t border-ink-border pt-4">
          ${(p.stack || []).map((s) => `<span class="tag-pill">${s}</span>`).join("")}
        </div>
      </article>`
    )
    .join("");

  // Experience
  const experienceList = document.getElementById("experience-list");
  experienceList.innerHTML = (data.experience || [])
    .map(
      (job, i) => `
      <div class="reveal relative pb-14 last:pb-0" data-timeline-item="${i}" style="transition-delay:${i * 100}ms">
        <span class="timeline-dot absolute -left-[2.15rem] top-1 h-3 w-3 rounded-full border-2 border-amber bg-ink" data-dot="${i}"></span>
        <p class="font-mono text-xs uppercase tracking-widest text-amber">${job.period}</p>
        <div class="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h3 class="font-display text-lg font-semibold">${job.role}</h3>
          ${
            job.stack && job.stack.length
              ? `<div class="flex flex-wrap gap-2">${job.stack.map((s) => `<span class="tag-pill">${s}</span>`).join("")}</div>`
              : ""
          }
        </div>
        <p class="text-sm text-ink_text-muted">${job.company}</p>
        <p class="mt-4 text-sm leading-relaxed text-ink_text-muted">${job.summary || ""}</p>
      </div>`
    )
    .join("");

  // Certifications
  const certGrid = document.getElementById("certifications-grid");
  certGrid.innerHTML = (data.certifications || [])
    .map(
      (c, i) => `
      <div class="card reveal flex flex-col gap-4 p-6" style="transition-delay:${i * 80}ms">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            ${brandIconHTML(c.issuer, { size: "h-10 w-10", alwaysBrand: true })}
            <div>
              <h3 class="font-display text-base font-semibold">${c.title}</h3>
              <p class="mt-0.5 text-xs text-ink_text-muted">${c.issuer}${c.date ? ` · ${c.date}` : ""}</p>
            </div>
          </div>
          ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener" class="btn-ghost !px-4 !py-2 text-xs shrink-0">View</a>` : ""}
        </div>
        ${c.description ? `<p class="text-sm leading-relaxed text-ink_text-muted">${c.description}</p>` : ""}
        ${
          c.stack && c.stack.length
            ? `<div class="flex flex-wrap gap-2 border-t border-ink-border pt-4">${c.stack.map((s) => `<span class="tag-pill">${s}</span>`).join("")}</div>`
            : ""
        }
      </div>`
    )
    .join("");

  // Important Links
  const linksList = document.getElementById("important-links");
  const importantLinks = [
    { key: "github", label: "GitHub", url: data.links?.github },
    { key: "linkedin", label: "LinkedIn", url: data.links?.linkedin },
    { key: "leetcode", label: "LeetCode", url: data.links?.leetcode },
    { key: "twitter", label: "Twitter / X", url: data.links?.twitter },
    { key: "resume", label: "Résumé", url: data.resumeUrl },
  ].filter((l) => l.url);

  linksList.innerHTML = importantLinks
    .map(
      (l) => `
      <li>
        <a href="${l.url}" target="_blank" rel="noopener" class="group flex items-center justify-between border-b border-ink-border py-3 text-ink_text-primary hover:text-amber transition-colors">
          <span class="flex items-center gap-3">${svgIcon(l.key)} ${l.label}</span>
          <span class="text-ink_text-muted transition-transform group-hover:translate-x-1 group-hover:text-amber">→</span>
        </a>
      </li>`
    )
    .join("");

  renderSkillsMenu("skills-mega-menu", data.skills, "grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4");

  observeReveals();
  observeTimeline();
}

function observeTimeline() {
  const items = document.querySelectorAll("[data-timeline-item]");
  const dots = document.querySelectorAll(".timeline-dot");
  if (!items.length) return;

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = entry.target.getAttribute("data-timeline-item");
        dots.forEach((dot) => dot.classList.toggle("is-active", dot.getAttribute("data-dot") === index));
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  items.forEach((item) => timelineObserver.observe(item));
}

function skillMenuRowHTML(name) {
  return `
    <div class="group/skill flex cursor-default items-center gap-3 rounded-md px-2 py-1.5 text-sm text-ink_text-muted transition-colors duration-150 hover:bg-ink-border/40 hover:text-ink_text-primary">
      ${brandIconHTML(name, { size: "h-5 w-5", scaleOnHover: true })}
      <span>${name}</span>
    </div>`;
}

function renderSkillsMenu(containerId, skills, gridClass) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const columns = Object.entries(skills || {})
    .map(
      ([category, items]) => `
      <div>
        <p class="mb-3 font-mono text-[11px] uppercase tracking-widest text-amber">${category}</p>
        <div class="space-y-1">${items.map(skillMenuRowHTML).join("")}</div>
      </div>`
    )
    .join("");
  el.innerHTML = `<div class="${gridClass}">${columns}</div>`;
}

// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");

let menuOpen = false;
menuToggle.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("hidden", !menuOpen);
  mobileMenu.classList.toggle("flex", menuOpen);
  bar1.style.transform = menuOpen ? "rotate(45deg) translateY(3px)" : "";
  bar2.style.transform = menuOpen ? "rotate(-45deg) translateY(-3px)" : "";
});

document.querySelectorAll("#mobile-menu a").forEach((a) =>
  a.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    bar1.style.transform = "";
    bar2.style.transform = "";
  })
);

// Technical Skills nav item
const skillsItem = document.getElementById("skills-menu-item");
const skillsTrigger = document.getElementById("skills-menu-trigger");
const skillsMenu = document.getElementById("skills-mega-menu");
const skillsChevron = document.getElementById("skills-menu-chevron");
let skillsMenuOpen = false;

function setSkillsMenu(open) {
  skillsMenuOpen = open;
  skillsMenu.classList.toggle("is-open", open);
  skillsTrigger.setAttribute("aria-expanded", String(open));
  skillsChevron.style.transform = open ? "rotate(180deg)" : "";
}

if (skillsItem && skillsTrigger && skillsMenu) {
  skillsTrigger.addEventListener("click", () => setSkillsMenu(false));
  skillsItem.addEventListener("mouseenter", () => setSkillsMenu(true));
  skillsItem.addEventListener("mouseleave", () => setSkillsMenu(false));
  document.addEventListener("click", (e) => {
    if (skillsMenuOpen && !skillsItem.contains(e.target)) setSkillsMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setSkillsMenu(false);
  });
}

// Header backdrop on scroll
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("border-ink-border/60");
  } else {
    header.classList.remove("border-ink-border/60");
  }
});

// Scroll-spy
const sections = ["home", "about", "skills", "projects", "experience", "certifications", "contact"];
const navLinks = document.querySelectorAll(".nav-link");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.nav === id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) spyObserver.observe(el);
});

// Reveal-on-scroll animation
function observeReveals() {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}
observeReveals();

// Contact form submission
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("contact-status");
const submitBtn = document.getElementById("contact-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());

  submitBtn.disabled = true;
  submitBtn.classList.add("opacity-60");
  statusEl.textContent = "Sending…";
  statusEl.className = "mt-4 font-mono text-sm text-ink_text-muted";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    if (!res.ok) throw new Error(result.error || "Something went wrong.");

    statusEl.textContent = "Message sent — thanks for reaching out! I'll reply soon.";
    statusEl.className = "mt-4 font-mono text-sm text-amber";
    form.reset();
  } catch (err) {
    statusEl.textContent = err.message || "Failed to send. Please email me directly.";
    statusEl.className = "mt-4 font-mono text-sm text-red-400";
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-60");
  }
});
