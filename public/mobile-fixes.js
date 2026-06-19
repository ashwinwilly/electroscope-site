const navItems = [
  ["Home", "/"],
  ["Product", "/#product"],
  ["Architecture", "/architecture"],
  ["Use Cases", "/#use-cases"],
  ["About", "/about"],
  ["Contact Us", "/about#contact"],
];

const visibleNodes = [
  ["Problem", "The deal begins before the CRM has enough context."],
  ["Discovery", "Early conversations create signals that often stay buried in notes."],
  ["Outcome", "Business goals shift as stakeholders react."],
  ["Solution", "Technical fit changes as new documents and calls appear."],
  ["Buyer", "Influence moves between stakeholders."],
  ["Decision", "Timing and urgency change before the CRM reflects it."],
  ["Budget", "Pricing risk forms before the forecast changes."],
  ["Close", "The CRM shows a stage. Electroscope shows the story behind it."],
];

const hiddenNodes = [
  ["Champion", "Internal support can strengthen or weaken between meetings."],
  ["Impact", "Value is clarified outside the forecast fields."],
  ["Scope", "Requirements expand or contract quietly."],
  ["Key Metrics", "Success criteria appear across calls, emails, and documents."],
  ["Procurement", "Approval friction emerges late if nobody tracks it."],
];

const inputSignals = ["Calls", "Chats", "Inbox", "Documents", "CRM"];
const outputSignals = ["Risks", "Insights", "Next Moves", "Forecast Signals"];

function enhanceMobileNav() {
  document.querySelectorAll("header").forEach((header) => {
    if (header.querySelector(".mobile-menu-toggle")) return;
    const nav = header.querySelector("nav");
    const cta = [...nav.querySelectorAll("a")].find((link) => link.textContent.trim().includes("Book intro call"));
    if (!nav || !cta) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<span></span><span></span><span></span>';
    cta.insertAdjacentElement("afterend", toggle);

    const panel = document.createElement("div");
    panel.className = "mobile-menu-panel";
    panel.dataset.open = "false";
    panel.innerHTML = `<div>${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>`;
    nav.insertAdjacentElement("afterend", panel);

    const close = () => {
      panel.dataset.open = "false";
      toggle.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    };

    toggle.addEventListener("click", () => {
      const open = panel.dataset.open !== "true";
      panel.dataset.open = String(open);
      toggle.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });
    panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  });
}

function card([label, text], tone) {
  return `
    <article class="mobile-signal-card ${tone}">
      <span></span>
      <div>
        <h4>${label}</h4>
        <p>${text}</p>
      </div>
    </article>
  `;
}

function group(title, nodes, tone) {
  const first = nodes.slice(0, 4);
  const rest = nodes.slice(4);
  return `
    <section class="mobile-signal-group ${tone}">
      <div class="mobile-signal-heading">
        <span><i></i>${title}</span>
        <small>${nodes.length} signals</small>
      </div>
      <div class="mobile-signal-list">${first.map((node) => card(node, tone)).join("")}</div>
      ${rest.length ? `
        <details class="mobile-signal-more">
          <summary><span>More signals</span><b>⌄</b></summary>
          <div>${rest.map(([label]) => `<p><i></i>${label}</p>`).join("")}</div>
        </details>
      ` : ""}
    </section>
  `;
}

function compactSignalMap() {
  const containers = [...document.querySelectorAll(".md\\:hidden")];
  const target = containers.find((el) => el.textContent.includes("Visible CRM path") && el.textContent.includes("Hidden signal"));
  if (!target || target.dataset.mobileSignalCompact === "true") return;
  target.dataset.mobileSignalCompact = "true";
  target.innerHTML = group("Visible CRM path", visibleNodes, "orange") + group("Hidden signals", hiddenNodes, "cyan");
}

function chip(label, tone) {
  return `<span class="mobile-pipeline-chip ${tone}"><i></i>${label}</span>`;
}

function compactPipeline() {
  const section = [...document.querySelectorAll("section")].find((el) => el.textContent.includes("From scattered activity to actionable deal intelligence."));
  if (!section || section.querySelector(".mobile-pipeline-flow")) return;
  const original = section.querySelector(".relative.grid.items-center");
  if (!original) return;
  original.classList.add("pipeline-desktop-flow");
  original.insertAdjacentHTML("beforebegin", `
    <div class="mobile-pipeline-flow">
      <section>
        <header><span>Inputs</span><i class="cyan"></i></header>
        <div>${inputSignals.map((item) => chip(item, "cyan")).join("")}</div>
      </section>
      <div class="mobile-pipeline-connector"><i></i></div>
      <section class="mobile-pipeline-core">
        <b>Electroscope</b>
        <p>Agentic reasoning layer that keeps deal state alive.</p>
      </section>
      <div class="mobile-pipeline-connector orange"><i></i></div>
      <section>
        <header><span>Outputs</span><i class="orange"></i></header>
        <div>${outputSignals.map((item) => chip(item, "orange")).join("")}</div>
      </section>
    </div>
  `);
}

function compactProductTabs() {
  const product = document.getElementById("product");
  if (!product) return;
  [...product.querySelectorAll("button")].forEach((button) => {
    const text = button.textContent.trim();
    if (["Living Narrative", "Meeting Prep", "Plan My Day", "Auto-Onboard"].some((label) => text.startsWith(label))) {
      button.classList.add("mobile-output-tab");
    }
  });
}

function applyMobileFixes() {
  enhanceMobileNav();
  compactSignalMap();
  compactPipeline();
  compactProductTabs();
}

applyMobileFixes();
window.addEventListener("load", applyMobileFixes);
window.addEventListener("resize", applyMobileFixes);
