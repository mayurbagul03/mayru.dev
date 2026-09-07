// Portfolio assistant
(function () {
  const toggle = document.getElementById("chatbot-toggle");
  const panel = document.getElementById("chatbot-panel");
  const iconOpen = document.getElementById("chatbot-icon-open");
  const iconClose = document.getElementById("chatbot-icon-close");
  const messagesEl = document.getElementById("chatbot-messages");
  const quickRepliesEl = document.getElementById("chatbot-quick-replies");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  if (!toggle || !panel || !form || !input) return;

  const QUICK_REPLIES = [
    { label: "Skills", question: "What are your skills?" },
    { label: "Projects", question: "Tell me about your projects" },
    { label: "Experience", question: "What's your work experience?" },
    { label: "Certifications", question: "What certifications do you have?" },
    { label: "Résumé", question: "Can I see your résumé?" },
    { label: "Contact", question: "How can I contact you?" },
  ];

  let data = null;
  let open = false;
  let greeted = false;

  function addMessage(text, from) {
    const bubble = document.createElement("div");
    bubble.className =
      from === "user"
        ? "ml-auto max-w-[85%] rounded-lg bg-amber px-3 py-2 text-ink"
        : "mr-auto max-w-[85%] rounded-lg border border-ink-border bg-ink px-3 py-2 leading-relaxed text-ink_text-primary";
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addLinkMessage(text, href, linkLabel) {
    const wrap = document.createElement("div");
    wrap.className = "mr-auto max-w-[85%] space-y-2 rounded-lg border border-ink-border bg-ink px-3 py-2 text-ink_text-primary";
    const p = document.createElement("p");
    p.className = "leading-relaxed";
    p.textContent = text;
    const a = document.createElement("a");
    a.href = href;
    a.textContent = linkLabel;
    a.className = "inline-block font-mono text-xs text-amber hover:underline";
    if (href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    wrap.append(p, a);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function findMentionedSkill(qLower) {
    if (!data || !data.skills) return null;
    const allSkills = Object.values(data.skills).flat();
    const matches = allSkills.filter((skill) => new RegExp(`\\b${escapeRegex(skill.toLowerCase())}\\b`).test(qLower));
    if (!matches.length) return null;
    return matches.sort((a, b) => b.length - a.length)[0];
  }

  function renderQuickReplies() {
    quickRepliesEl.innerHTML = "";
    QUICK_REPLIES.forEach((q) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = q.label;
      btn.className = "tag-pill hover:text-amber";
      btn.addEventListener("click", () => handleQuestion(q.question));
      quickRepliesEl.appendChild(btn);
    });
  }

  function respond(question) {
    if (!data) {
      addMessage("Still loading the portfolio data, try again in a second.", "bot");
      return;
    }
    const q = question.toLowerCase();

    if (/\b(hi|hello|hey)\b/.test(q)) {
      addMessage("Hi! Ask me about my skills, projects, experience, certifications, résumé, or how to get in touch.", "bot");
      return;
    }

    const mentionedSkill = findMentionedSkill(q);
    if (mentionedSkill) {
      addMessage(
        `Yes, I have hands-on experience with ${mentionedSkill}, built up over ${data.experienceYears || "3.5+"} years of professional work.`,
        "bot"
      );
      return;
    }

    if (/skill|tech|stack|language/.test(q)) {
      const categories = Object.keys(data.skills || {});
      addMessage(`I work across: ${categories.join(", ")}. See the Technical Skills section for the full breakdown.`, "bot");
      return;
    }

    if (/project|built|app/.test(q)) {
      const titles = (data.projects || []).map((p) => p.title);
      addMessage(`A few things I've built: ${titles.join(", ")}. Full details and GitHub links are in the Projects section.`, "bot");
      return;
    }

    if (/experience|work histor|job|career|compan/.test(q)) {
      const roles = (data.experience || []).map((e) => `${e.role} at ${e.company}`);
      addMessage(`My professional experience: ${roles.join("; ")}.`, "bot");
      return;
    }

    if (/certificat|credential/.test(q)) {
      const certs = (data.certifications || []).map((c) => c.title);
      addMessage(certs.length ? `My certifications: ${certs.join(", ")}.` : "I don't have any certifications listed yet.", "bot");
      return;
    }

    if (/resume|cv|résumé/.test(q)) {
      addLinkMessage("Here's my résumé:", data.resumeUrl || "resume.html", "View Résumé →");
      return;
    }

    if (/contact|email|reach|hire|talk|get in touch/.test(q)) {
      addLinkMessage("You can reach me directly, or use the contact form on this page:", `mailto:${data.email}`, data.email);
      return;
    }

    if (/about|who are you|summary|yourself/.test(q)) {
      addMessage(data.summary, "bot");
      return;
    }

    addMessage("I'm not sure about that one, try asking about skills, projects, experience, certifications, résumé, or contact info.", "bot");
  }

  function handleQuestion(question) {
    addMessage(question, "user");
    setTimeout(() => respond(question), 250);
  }

  function openPanel(auto) {
    open = true;
    panel.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    iconOpen.classList.add("hidden");
    iconClose.classList.remove("hidden");
    if (!greeted) {
      greeted = true;
      setTimeout(() => {
        addMessage("Ask me anything about my skills, projects, experience, or how to get in touch. Tap a suggestion below or type your own question.", "bot");
      }, 150);
    }
    if (!auto) input.focus();
  }

  function closePanel() {
    open = false;
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
  }

  toggle.addEventListener("click", () => (open ? closePanel() : openPanel()));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    handleQuestion(value);
    input.value = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) closePanel();
  });

  renderQuickReplies();

  const AUTO_OPEN_DELAY_MS = 1500;
  setTimeout(() => {
    if (!open) openPanel(true);
  }, AUTO_OPEN_DELAY_MS);

  fetch("data/content.json")
    .then((res) => res.json())
    .then((json) => {
      data = json;
    })
    .catch(() => {
      addMessage("Couldn't load portfolio data right now, please try refreshing the page.", "bot");
    });
})();
