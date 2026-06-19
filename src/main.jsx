import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDotDashed,
  Cpu,
  DatabaseZap,
  FileText,
  Headphones,
  Inbox,
  MessagesSquare,
  Network,
  Pause,
  Play,
  Quote,
  Radar,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UserPlus,
  Waypoints,
  Workflow,
} from "lucide-react";
import AboutPage from "./AboutPage.jsx";
import ArchitecturePage from "./ArchitecturePage.jsx";
import "./styles.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/#product" },
  { label: "Architecture", href: "/architecture" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/about#contact" },
];

const useCases = [
  {
    title: "Account Executives",
    icon: BriefcaseBusiness,
    text: "Walk into every interaction with current deal truth, open risks, stakeholder shifts, and the best next action.",
  },
  {
    title: "Sales Engineers",
    icon: Blocks,
    text: "See technical blockers, proof points, security asks, and mutual action plan gaps without hunting through threads.",
  },
  {
    title: "RevOps",
    icon: DatabaseZap,
    text: "Replace brittle CRM hygiene with source-backed updates, forecast signals, and consistent opportunity narratives.",
  },
  {
    title: "Customer Success",
    icon: Headphones,
    text: "Carry forward every promise, risk, champion, and implementation cue as deals move from close to expansion.",
  },
];

const architecture = [
  {
    title: "Capture",
    icon: Radar,
    text: "Ingest calls, chats, emails, documents, calendar activity, and CRM changes across the full enterprise sales motion.",
  },
  {
    title: "Reason",
    icon: CircleDotDashed,
    text: "Turn scattered evidence into living deal narratives, risk models, stakeholder maps, and forecast-quality signals.",
  },
  {
    title: "Act",
    icon: Workflow,
    text: "Recommend next moves, draft CRM updates, escalate risk, and keep teams aligned while opportunities are still changing.",
  },
];

const testimonials = [
  {
    quote: "Electroscope helped me stop rebuilding deal context from scratch before every meeting. I walk in knowing what changed, what matters, and what to do next.",
    name: "N.W.",
    role: "Technical Sales Lead",
  },
  {
    quote: "The biggest value is that it surfaces risk while the deal is still moving, not two weeks later when someone finally updates the CRM.",
    name: "A.E.",
    role: "Revenue Operations Leader",
    featured: true,
  },
  {
    quote: "Meeting prep used to live in scattered notes and memory. Electroscope turned that into a repeatable workflow.",
    name: "S.P.",
    role: "Solutions Engineer",
  },
  {
    quote: "It gives our team a living deal narrative instead of static CRM snapshots.",
    name: "M.R.",
    role: "Account Executive",
  },
];

const inputSignals = [
  { label: "Calls", icon: Headphones },
  { label: "Chats", icon: MessagesSquare },
  { label: "Inbox", icon: Inbox },
  { label: "Documents", icon: FileText },
  { label: "CRM", icon: DatabaseZap },
];

const outputSignals = ["Risks", "Insights", "Next Moves", "Forecast Signals"];

const productTabs = [
  {
    title: "Living Narrative",
    icon: FileText,
    step: "1 / 6 · Read the room",
    description: "A timeline of what happened, what changed, and what the deal now depends on.",
  },
  {
    title: "Meeting Prep",
    icon: CalendarCheck,
    step: "2 / 6 · Brief the call",
    description: "Every call briefed with goals, prior context, risks, stakeholders, and materials to bring.",
  },
  {
    title: "Plan My Day",
    icon: CheckCircle2,
    step: "3 / 6 · Prioritize risk",
    description: "A prioritized view of the deals, follow-ups, and risks that need attention now.",
  },
  {
    title: "Auto-Onboard",
    icon: UserPlus,
    step: "4 / 6 · Transfer context",
    description: "A fast handoff for new team members, managers, or post-sales teams joining the account.",
  },
];

const previewSignals = [
  {
    label: "Economic buyer absent from last 3 interactions",
    highlight: "Economic buyer absent",
    tone: "orange",
    value: "+18%",
  },
  {
    label: "Security review accelerated after new doc upload",
    tone: "cyan",
    value: "High intent",
  },
  {
    label: "Champion sentiment softened on pricing thread",
    tone: "orange",
    value: "Watch",
  },
];

const graphNodes = [
  { label: "Problem", x: 8, y: 58, type: "crm", size: "md", text: "The deal begins before the CRM has enough context." },
  { label: "Discovery", x: 21, y: 47, type: "crm", size: "md", text: "Early conversations create signals that often stay buried in notes." },
  { label: "Outcome", x: 34, y: 35, type: "crm", size: "md", text: "Business goals shift as stakeholders react." },
  { label: "Solution", x: 47, y: 50, type: "crm", size: "md", text: "Technical fit changes as new documents and calls appear." },
  { label: "Buyer", x: 61, y: 43, type: "crm", size: "md", text: "Influence moves between stakeholders." },
  { label: "Decision", x: 73, y: 52, type: "crm", size: "md", text: "Timing and urgency change before the CRM reflects it." },
  { label: "Budget", x: 83, y: 61, type: "crm", size: "md", text: "Pricing risk forms before the forecast changes." },
  { label: "Close", x: 91, y: 48, type: "crm", size: "lg", text: "The CRM shows a stage. Electroscope shows the story behind it." },
  { label: "Champion", x: 28, y: 20, type: "hidden", size: "sm", text: "Internal support can strengthen or weaken between meetings." },
  { label: "Impact", x: 43, y: 22, type: "hidden", size: "sm", text: "Value is clarified outside the forecast fields." },
  { label: "Scope", x: 52, y: 73, type: "hidden", size: "sm", text: "Requirements expand or contract quietly." },
  { label: "Key Metrics", x: 70, y: 22, type: "hidden", size: "sm", text: "Success criteria appear across calls, emails, and documents." },
  { label: "Procurement", x: 80, y: 31, type: "hidden", size: "sm", text: "Approval friction emerges late if nobody tracks it." },
];

const cyanConnections = [
  ["Discovery", "Champion"],
  ["Champion", "Outcome"],
  ["Outcome", "Impact"],
  ["Impact", "Solution"],
  ["Solution", "Scope"],
  ["Scope", "Budget"],
  ["Buyer", "Key Metrics"],
  ["Key Metrics", "Procurement"],
  ["Procurement", "Close"],
];

const orangePath = ["Problem", "Discovery", "Outcome", "Solution", "Buyer", "Decision", "Budget", "Close"];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const hash = location.hash;
    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      const headerOffset = 112;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };

    window.requestAnimationFrame(scrollToHash);
    const timers = [80, 260, 520, 1000].map((delay) => window.setTimeout(scrollToHash, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <>
      <HashScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
      </Routes>
    </>
  );
}

function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <SignalBackground reduceMotion={reduceMotion} />
      <Navbar />
      <Hero reduceMotion={reduceMotion} />
      <Problem reduceMotion={reduceMotion} />
      <Solution reduceMotion={reduceMotion} />
      <ProductDemo reduceMotion={reduceMotion} />
      <UseCases />
      <Architecture />
      <Testimonials />
      <FinalCta />
      <Footer />
    </main>
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#05070d]/74 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Electroscope home">
          <span className="grid size-9 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_30px_rgba(36,221,255,0.18)]">
            <Radar className="size-5 text-cyan-200" />
          </span>
          <span className="text-base font-semibold tracking-wide text-white">Electroscope</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="transition hover:text-cyan-100">
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          to="/about#contact"
          className="group inline-flex h-10 items-center gap-2 rounded-md border border-orange-300/35 bg-orange-300/10 px-4 text-sm font-medium text-orange-100 shadow-[0_0_28px_rgba(255,144,69,0.14)] transition hover:border-orange-200/70 hover:bg-orange-300/16"
        >
          Book intro call
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </header>
  );
}

function SignalBackground({ reduceMotion }) {
  const dots = Array.from({ length: 34 }, (_, index) => ({
    id: index,
    left: `${(index * 23) % 100}%`,
    top: `${(index * 37) % 100}%`,
    delay: (index % 7) * 0.45,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(37,221,255,0.16),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(255,142,62,0.12),transparent_28%),linear-gradient(180deg,#07101f_0%,#05070d_44%,#030407_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute size-1 rounded-full bg-cyan-200/60 shadow-[0_0_14px_rgba(92,225,255,0.9)]"
          style={{ left: dot.left, top: dot.top }}
          animate={reduceMotion ? undefined : { opacity: [0.15, 0.8, 0.2], scale: [0.8, 1.6, 0.9] }}
          transition={{ duration: 4.6, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Hero({ reduceMotion }) {
  return (
    <section className="relative z-10 mx-auto grid min-h-[calc(100svh-2rem)] max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:pt-28">
      <motion.div {...fadeUp()} className="max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/[0.03] px-3 py-1.5 text-sm text-cyan-100">
          <Sparkles className="size-4 text-orange-200" />
          Agentic sales intelligence for enterprise revenue teams
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl xl:text-[4rem]">
          Know where every deal stands before your CRM catches up.
        </h1>
        <p className="mt-9 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
          Electroscope is an agentic sales engine that analyzes calls, chats, emails, and CRM activity to surface risks, uncover insights, and eliminate manual data entry while deals are still forming.
        </p>
        <div className="mt-11 flex flex-col gap-3 sm:flex-row">
          <a href="#book" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-200 px-5 text-sm font-semibold text-[#051019] shadow-[0_0_34px_rgba(80,226,255,0.24)] transition hover:bg-cyan-100">
            Book intro call
            <ArrowRight className="size-4" />
          </a>
          <a href="#product" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 text-sm font-semibold text-slate-300 transition hover:border-cyan-100/28 hover:bg-white/[0.05] hover:text-white">
            See how it works
            <ArrowRight className="size-4 opacity-70" />
          </a>
        </div>
      </motion.div>
      <ProductPreview reduceMotion={reduceMotion} />
    </section>
  );
}

function ProductPreview({ reduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(37,221,255,0.2),transparent_64%)] blur-2xl" />
        <div className="relative rounded-2xl border border-cyan-100/18 bg-[#09111f]/95 p-4 shadow-[0_0_70px_rgba(34,211,238,0.18)] backdrop-blur-xl sm:p-5">
          <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-4">
            <div>
              <p className="text-sm text-slate-400">Opportunity narrative</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Northstar Systems expansion</h2>
            </div>
            <motion.span
              className="rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1 text-xs font-medium text-orange-100"
              animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 rgba(255,142,62,0)", "0 0 24px rgba(255,142,62,0.32)", "0 0 0 rgba(255,142,62,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Risk rising
            </motion.span>
          </div>
          <div className="grid gap-3">
            {previewSignals.map((signal, index) => (
              <SignalRow key={signal.label} {...signal} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 rounded-xl border border-cyan-200/18 bg-cyan-200/[0.06] p-4"
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <Waypoints className="size-4" />
              Recommended next move
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Ask Maya to re-confirm procurement owner and invite CFO sponsor to the security closeout before forecast commit.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Draft follow-up", "Update CRM", "Flag forecast"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SignalRow({ label, highlight, tone, value, index = 0, reduceMotion = false }) {
  const color = tone === "cyan" ? "text-cyan-100 bg-cyan-300/10 border-cyan-200/20" : "text-orange-100 bg-orange-300/10 border-orange-200/20";
  const parts = highlight ? label.split(highlight) : null;
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.32 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.035] p-3"
    >
      <div className="flex gap-3">
        <span className={`mt-0.5 grid size-7 place-items-center rounded-md border ${color}`}>
          <ShieldAlert className="size-4" />
        </span>
        <p className="text-sm leading-6 text-slate-200">
          {parts ? (
            <>
              {parts[0]}
              <motion.span
                className="rounded-[4px] px-1 text-orange-50"
                animate={reduceMotion ? undefined : { textShadow: ["0 0 0 rgba(255,183,109,0)", "0 0 16px rgba(255,183,109,0.75)", "0 0 0 rgba(255,183,109,0)"] }}
                transition={{ duration: 2.2, delay: 0.85, repeat: Infinity, repeatDelay: 3.4 }}
              >
                {highlight}
              </motion.span>
              {parts[1]}
            </>
          ) : (
            label
          )}
        </p>
      </div>
      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs ${color}`}>{value}</span>
    </motion.div>
  );
}

function Problem({ reduceMotion }) {
  return (
    <section className="relative z-10 border-y border-white/8 bg-black/12 pt-24">
      <motion.div {...fadeUp()} className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">The problem</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Deals are not linear, but CRMs treat them like they are.</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Enterprise opportunities unfold across meetings, side threads, security reviews, pricing debates, and quiet stakeholder changes. By the time that context reaches the CRM, the signal has already gone stale.
        </p>
      </motion.div>
      <DealSignalGraph reduceMotion={reduceMotion} />
    </section>
  );
}

function DealSignalGraph({ reduceMotion }) {
  const nodeByLabel = Object.fromEntries(graphNodes.map((node) => [node.label, node]));

  return (
    <motion.div
      {...fadeUp(0.08)}
      className="relative mt-16 overflow-hidden px-5 pb-24 pt-14 sm:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(34,211,238,0.11),transparent_34%),radial-gradient(circle_at_76%_55%,rgba(255,142,62,0.1),transparent_30%),linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:auto,auto,76px_76px,76px_76px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05070d] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05070d] to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Signal map</p>
          <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Deal signals scatter before they reach the CRM.</h3>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-orange-200 shadow-[0_0_16px_rgba(255,142,62,0.95)]" /> Orange: Visible CRM path</span>
          <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.95)]" /> Cyan: Hidden signals</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-10 hidden max-w-7xl md:block">
        <div className="relative min-h-[620px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="cyan-glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="orange-glow">
                <feGaussianBlur stdDeviation="1.7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="orange-path-reveal">
                <motion.rect
                  x="0"
                  y="0"
                  height="100"
                  initial={reduceMotion ? false : { width: 0 }}
                  whileInView={{ width: 100 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </clipPath>
            </defs>
            <g clipPath="url(#orange-path-reveal)">
              {orangePath.slice(0, -1).map((label) => {
                const from = nodeByLabel[label];
                const to = nodeByLabel[orangePath[orangePath.indexOf(label) + 1]];
                return <line key={`${label}-${to.label}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="signal-line-orange" filter="url(#orange-glow)" />;
              })}
            </g>
            {cyanConnections.map(([fromLabel, toLabel], index) => {
              const from = nodeByLabel[fromLabel];
              const to = nodeByLabel[toLabel];
              return (
                <motion.g
                  key={`${fromLabel}-${toLabel}`}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, delay: 1.25 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="signal-line-cyan" filter="url(#cyan-glow)" />
                </motion.g>
              );
            })}
          </svg>

          {graphNodes.map((node, index) => (
            <SignalNode key={node.label} node={node} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-9 grid max-w-2xl gap-4 md:hidden">
        {graphNodes.map((node, index) => (
          <motion.article
            key={node.label}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
            className={`relative border-l pl-5 ${node.type === "crm" ? "border-orange-200/40" : "border-cyan-200/40"}`}
          >
            <span className={`absolute -left-[7px] top-1 size-3 rounded-full ${node.type === "crm" ? "bg-orange-200 shadow-[0_0_18px_rgba(255,142,62,0.9)]" : "bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.9)]"}`} />
            <div className={`rounded-xl border p-4 backdrop-blur-sm ${node.type === "crm" ? "border-orange-200/16 bg-orange-200/[0.045]" : "border-cyan-200/16 bg-cyan-200/[0.045]"}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${node.type === "crm" ? "text-orange-100" : "text-cyan-100"}`}>
                {node.type === "crm" ? "Visible CRM path" : "Hidden signal"}
              </p>
              <h4 className="mt-2 font-semibold text-white">{node.label}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-300">{node.text}</p>
            </div>
          </motion.article>
          ))}
      </div>

      <p className="relative z-10 mx-auto mt-8 max-w-3xl text-center text-base leading-7 text-slate-300">
        Your CRM only sees what someone remembers to enter. Electroscope sees the deal as it is forming.
      </p>
    </motion.div>
  );
}

function SignalNode({ node, index, reduceMotion }) {
  const isCrm = node.type === "crm";
  const isClose = node.label === "Close";
  const panelPosition = node.x > 82 ? "left-auto right-0 translate-x-0" : node.x < 18 ? "left-0 translate-x-0" : "left-1/2 -translate-x-1/2";
  const nodeSize = isClose ? "size-[5.6rem]" : isCrm ? "size-[4.15rem]" : "size-[3.15rem]";
  const coreSize = isClose ? "size-4" : isCrm ? "size-3" : "size-2.5";
  const labelOffset = isClose ? "top-[calc(100%+0.7rem)]" : "top-[calc(100%+0.45rem)]";

  return (
    <button
      type="button"
      className="group absolute -translate-x-1/2 -translate-y-1/2 text-center outline-none"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      aria-label={`${node.label}: ${node.text}`}
    >
      <span
        className={`relative z-10 grid place-items-center rounded-full border transition duration-200 group-hover:scale-105 group-focus:scale-105 ${nodeSize} ${isCrm ? "border-orange-200/24 bg-orange-200/[0.035] shadow-[0_0_42px_rgba(255,142,62,0.2)]" : "border-cyan-200/24 bg-cyan-200/[0.035] shadow-[0_0_36px_rgba(34,211,238,0.18)]"}`}
      >
        <motion.span
          className="grid size-full place-items-center rounded-full"
          animate={reduceMotion ? undefined : { y: [0, isCrm ? -4 : 4, 0], boxShadow: isCrm ? ["0 0 22px rgba(255,142,62,0.12)", "0 0 50px rgba(255,142,62,0.28)", "0 0 22px rgba(255,142,62,0.12)"] : ["0 0 18px rgba(34,211,238,0.12)", "0 0 42px rgba(34,211,238,0.26)", "0 0 18px rgba(34,211,238,0.12)"] }}
          transition={{ duration: 5.4, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className={`absolute inset-2 rounded-full border ${isCrm ? "border-orange-100/10" : "border-cyan-100/10"}`} />
          <span className={`rounded-full ${coreSize} ${isCrm ? "bg-orange-100 shadow-[0_0_20px_rgba(255,142,62,1)]" : "bg-cyan-100 shadow-[0_0_18px_rgba(34,211,238,1)]"}`} />
        </motion.span>
      </span>
      <span className={`absolute left-1/2 ${labelOffset} z-20 -translate-x-1/2 whitespace-nowrap text-xs font-medium tracking-wide ${isCrm ? "text-orange-50" : "text-cyan-50"}`}>
        {node.label}
      </span>
      <span className={`pointer-events-none absolute top-[calc(100%+2.1rem)] z-20 w-64 translate-y-1 rounded-xl border border-white/10 bg-[#0b1220]/96 p-4 text-left text-sm leading-6 text-slate-300 opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${panelPosition}`}>
        <span className="mb-1 block font-semibold text-white">{node.label}</span>
        {node.text}
      </span>
    </button>
  );
}

function Solution({ reduceMotion }) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <motion.div {...fadeUp()} className="mb-12 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Signal pipeline</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">From scattered activity to actionable deal intelligence.</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Electroscope ingests the scattered work around a deal, reasons over the context, and surfaces the risks, insights, and next moves your team needs before the CRM catches up.
        </p>
      </motion.div>
      <div className="relative grid items-center gap-5 lg:grid-cols-[1.08fr_0.34fr_0.82fr_0.34fr_1.08fr]">
        <PipelineGroup items={inputSignals} reduceMotion={reduceMotion} />
        <PipelineLine reduceMotion={reduceMotion} delay={0.62} />
        <PipelineCore reduceMotion={reduceMotion} />
        <PipelineLine reduceMotion={reduceMotion} delay={1.35} />
        <PipelineGroup items={outputSignals.map((label) => ({ label, icon: TrendingUp }))} accent="orange" reduceMotion={reduceMotion} delayBase={1.85} />
      </div>
    </section>
  );
}

function PipelineGroup({ items, accent = "cyan", reduceMotion = false, delayBase = 0 }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: delayBase + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a111e]/78 p-4 shadow-[0_0_36px_rgba(255,255,255,0.035)] backdrop-blur-sm transition duration-200 hover:border-cyan-100/24 hover:bg-white/[0.055] hover:shadow-[0_0_38px_rgba(34,211,238,0.09)]"
          >
            <span className={`grid size-10 place-items-center rounded-md border transition duration-200 ${accent === "cyan" ? "border-cyan-200/20 bg-cyan-300/10 text-cyan-100 group-hover:border-cyan-100/36" : "border-orange-200/20 bg-orange-300/10 text-orange-100 group-hover:border-orange-100/36"}`}>
              <Icon className="size-4" />
            </span>
            <span className="font-medium text-white">{item.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function PipelineCore({ reduceMotion }) {
  return (
    <div className="relative rounded-2xl border border-cyan-200/22 bg-[#09111f]/88 p-6 text-center shadow-[0_0_70px_rgba(34,211,238,0.13)] backdrop-blur-xl">
      <motion.div
        className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.28),transparent_44%),radial-gradient(circle_at_68%_62%,rgba(255,142,62,0.18),transparent_36%)] blur-2xl"
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.9, 0.5], scale: [0.96, 1.05, 0.98] }}
        transition={{ duration: 4.8, delay: 1.15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto grid size-16 place-items-center rounded-full border border-cyan-100/24 bg-cyan-200/[0.08] shadow-[0_0_46px_rgba(34,211,238,0.18)]">
        <motion.span
          className="absolute inset-2 rounded-full border border-orange-100/16"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <Cpu className="size-7 text-cyan-100" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">Electroscope</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">Agentic reasoning layer that keeps deal state alive.</p>
    </div>
  );
}

function PipelineLine({ reduceMotion, delay = 0 }) {
  return (
    <div className="relative h-12 lg:h-2">
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-cyan-200/10 via-cyan-200/80 to-orange-200/12 shadow-[0_0_18px_rgba(80,226,255,0.7)] lg:hidden"
        initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute left-0 top-1/2 hidden h-px w-full origin-left -translate-y-1/2 bg-gradient-to-r from-cyan-200/10 via-cyan-200/85 to-orange-200/12 shadow-[0_0_18px_rgba(80,226,255,0.7)] lg:block"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(34,211,238,1)] lg:hidden"
        animate={reduceMotion ? undefined : { y: [0, 42, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, delay: delay + 0.45, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute left-0 top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(34,211,238,1)] lg:block"
        animate={reduceMotion ? undefined : { x: [0, 140, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, delay: delay + 0.45, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ProductDemo({ reduceMotion }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const activeTab = productTabs[active];

  useEffect(() => {
    if (!playing || reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % productTabs.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion]);

  const move = (direction) => {
    setActive((current) => (current + direction + productTabs.length) % productTabs.length);
  };

  return (
    <section id="product" className="relative z-10 scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_18%,rgba(34,211,238,0.1),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(255,142,62,0.08),transparent_28%),linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:auto,auto,70px_70px,70px_70px]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div {...fadeUp()} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Product outputs</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Sales intelligence with zero data entry.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Electroscope turns scattered sales activity into living narratives, meeting prep, daily priorities, and onboarding context so teams can act without rebuilding the deal by hand.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.08)} className="mt-10 grid items-start gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0 lg:pt-1">
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {productTabs.map((tab, index) => {
                const Icon = tab.icon;
                const selected = active === index;
                return (
                  <button
                    key={tab.title}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`min-w-[220px] rounded-xl border p-3 text-left transition duration-200 lg:min-w-0 ${
                      selected
                        ? "border-cyan-100/45 bg-cyan-200/[0.085] shadow-[0_0_46px_rgba(34,211,238,0.2)]"
                        : "border-white/8 bg-[#060b14]/82 hover:border-white/16 hover:bg-white/[0.035]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`grid size-9 place-items-center rounded-md border ${selected ? "border-cyan-100/35 bg-cyan-200/12 text-cyan-100" : "border-white/10 bg-white/[0.035] text-slate-400"}`}>
                        <Icon className="size-4" />
                      </span>
                      <span className="font-semibold text-white">{tab.title}</span>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-slate-400">{tab.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="absolute -inset-4 rounded-[1.5rem] bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_56%),radial-gradient(circle_at_84%_18%,rgba(255,142,62,0.12),transparent_34%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-cyan-100/18 bg-[#050b14]/96 p-3 shadow-[0_0_90px_rgba(34,211,238,0.14)] backdrop-blur-xl before:absolute before:inset-y-5 before:left-0 before:w-px before:bg-cyan-200/50 before:shadow-[0_0_18px_rgba(34,211,238,0.85)] after:absolute after:inset-y-5 after:right-0 after:w-px after:bg-cyan-200/28 after:shadow-[0_0_18px_rgba(34,211,238,0.55)] sm:p-4">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:48px_48px]" />
              <div className="relative mb-3 flex items-center justify-between border-b border-white/8 pb-3">
                <div>
                  <p className="text-sm text-slate-400">Product output</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{activeTab.title}</h3>
                </div>
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] px-3 py-1 text-xs font-medium text-cyan-100">Live context</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.title}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductPreviewPanel active={activeTab.title} reduceMotion={reduceMotion} />
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-4 flex flex-col gap-4 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => move(-1)} className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-slate-200 transition hover:border-cyan-100/24 hover:text-cyan-100" aria-label="Previous product tab">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaying((value) => !value)}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-cyan-200/20 bg-cyan-200/[0.06] px-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-100/36 hover:bg-cyan-200/[0.1]"
                  >
                    {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button type="button" onClick={() => move(1)} className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-slate-200 transition hover:border-cyan-100/24 hover:text-cyan-100" aria-label="Next product tab">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">{activeTab.step}</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 6 }, (_, index) => (
                      <span key={index} className={`size-1.5 rounded-full ${index <= active ? "bg-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "bg-white/18"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductPreviewPanel({ active, reduceMotion }) {
  if (active === "Meeting Prep") return <MeetingPrepPanel reduceMotion={reduceMotion} />;
  if (active === "Plan My Day") return <PlanMyDayPanel reduceMotion={reduceMotion} />;
  if (active === "Auto-Onboard") return <AutoOnboardPanel reduceMotion={reduceMotion} />;
  return <LivingNarrativePanel reduceMotion={reduceMotion} />;
}

function RevealItem({ children, index = 0, reduceMotion = false, className = "" }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PanelBlock({ title, children, accent = "cyan", className = "" }) {
  const palette = {
    cyan: "border-cyan-200/14 bg-cyan-200/[0.04]",
    orange: "border-orange-200/16 bg-orange-200/[0.045]",
    red: "border-red-300/22 bg-red-400/[0.07]",
    green: "border-emerald-300/18 bg-emerald-300/[0.055]",
    blue: "border-blue-300/16 bg-blue-300/[0.05]",
  };
  return (
    <div className={`rounded-xl border p-4 ${palette[accent]} ${className}`}>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <div className="mt-3 text-sm leading-6 text-slate-300">{children}</div>
    </div>
  );
}

function StatusCard({ label, status, color, width }) {
  const colorMap = {
    green: "bg-emerald-300 text-emerald-100 border-emerald-300/20",
    red: "bg-red-300 text-red-100 border-red-300/20",
    orange: "bg-amber-300 text-amber-100 border-amber-300/20",
  };
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</span>
        <span className={`rounded-full border px-2 py-0.5 text-[0.68rem] font-semibold ${colorMap[color]}`}>{status}</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/8">
        <div className={`h-full rounded-full ${colorMap[color].split(" ")[0]}`} style={{ width }} />
      </div>
    </div>
  );
}

function LivingNarrativePanel({ reduceMotion }) {
  const timeline = ["Discovery call", "Call recorded", "Initiatives surfaced", "Challenge captured", "Technical deep-dive", "Tech environment mapped", "Deal created", "Tracking & risk"];
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        <RevealItem index={0} reduceMotion={reduceMotion}><StatusCard label="Objectives" status="On track" color="green" width="78%" /></RevealItem>
        <RevealItem index={1} reduceMotion={reduceMotion}><StatusCard label="Budget" status="At risk" color="red" width="44%" /></RevealItem>
        <RevealItem index={2} reduceMotion={reduceMotion}><StatusCard label="Timeline" status="Medium" color="orange" width="61%" /></RevealItem>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <PanelBlock title="Deal timeline">
          <div className="grid gap-2">
            {timeline.map((item, index) => (
              <RevealItem key={item} index={index + 2} reduceMotion={reduceMotion} className="relative border-l border-cyan-200/24 pl-4">
                <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                <div className="flex items-center justify-between gap-3">
                  <span>{item}</span>
                  <span className="text-xs text-slate-500">0{index + 1}</span>
                </div>
              </RevealItem>
            ))}
          </div>
        </PanelBlock>
        <div className="grid gap-4">
          <RevealItem index={4} reduceMotion={reduceMotion}>
            <PanelBlock title="Risk surfaced" accent="red">
              Budget not yet confirmed with CFO — may slip the close.
            </PanelBlock>
          </RevealItem>
          <RevealItem index={5} reduceMotion={reduceMotion}>
            <PanelBlock title="Electroscope" accent="cyan">
              CRM tracks deal stages. Electroscope handles deal nuance.
            </PanelBlock>
          </RevealItem>
        </div>
      </div>
    </div>
  );
}

function MeetingPrepPanel({ reduceMotion }) {
  const goals = ["Cover technical scenarios", "Get buy-in on architecture approach", "Confirm next step: Scoping Review"];
  return (
    <div className="grid gap-4">
      <RevealItem reduceMotion={reduceMotion}>
        <PanelBlock title="Bale Auto" accent="blue">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">Technical validation · 45 min</p>
              <p className="mt-2 text-slate-300">
                This meeting is a technical deep-dive. Last call covered 3 manufacturing areas configured differently, leaving challenges in operations and gaps in OT security.
              </p>
            </div>
            <span className="w-fit rounded-full border border-blue-200/20 bg-blue-300/[0.08] px-3 py-1 text-xs font-semibold text-blue-100">Today · 2:00 PM</span>
          </div>
        </PanelBlock>
      </RevealItem>
      <div className="grid gap-4 md:grid-cols-2">
        <RevealItem index={1} reduceMotion={reduceMotion}>
          <PanelBlock title="Goals checklist" accent="green">
            <div className="space-y-2">
              {goals.map((goal) => (
                <div key={goal} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-200" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </PanelBlock>
        </RevealItem>
        <RevealItem index={2} reduceMotion={reduceMotion}>
          <PanelBlock title="Important items" accent="red">
            <div className="space-y-2">
              <p>Is customer aware of Azure licensing costs?</p>
              <p>Validate customer budget and timeline</p>
              <p>Address lack of 802.1x support on OT switches</p>
            </div>
          </PanelBlock>
        </RevealItem>
      </div>
      <RevealItem index={3} reduceMotion={reduceMotion}>
        <PanelBlock title="Materials to bring" accent="orange">
          <div className="flex flex-wrap gap-2">
            {["Technical deck v3", "Draft SOW"].map((item) => (
              <span key={item} className="rounded-full border border-orange-200/20 bg-orange-200/[0.08] px-3 py-1 text-xs font-medium text-orange-100">{item}</span>
            ))}
          </div>
        </PanelBlock>
      </RevealItem>
    </div>
  );
}

function PlanMyDayPanel({ reduceMotion }) {
  const tasks = [
    ["Northstar Systems", "Risk rising", "Confirm CFO budget owner before commit call.", "red"],
    ["Helio Grid", "Follow-up due", "Send validation recap and technical deck v3.", "orange"],
    ["Kestrel Bank", "Stakeholder quiet", "Re-engage procurement and map legal owner.", "blue"],
    ["Aster Health", "Forecast watch", "Check if timeline shifted after security review.", "green"],
  ];
  const badgeColor = {
    red: "border-red-300/20 bg-red-400/[0.08] text-red-100",
    orange: "border-orange-200/20 bg-orange-200/[0.08] text-orange-100",
    blue: "border-blue-200/20 bg-blue-300/[0.08] text-blue-100",
    green: "border-emerald-200/20 bg-emerald-300/[0.08] text-emerald-100",
  };
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        {tasks.map(([deal, tag, action, color], index) => (
          <RevealItem key={deal} index={index} reduceMotion={reduceMotion}>
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{deal}</p>
                <p className="mt-1 text-sm text-slate-300">{action}</p>
              </div>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${badgeColor[color]}`}>{tag}</span>
            </div>
          </RevealItem>
        ))}
      </div>
      <RevealItem index={4} reduceMotion={reduceMotion}>
        <PanelBlock title="Recommended next action" accent="cyan">
          Start with Northstar. Budget risk is rising and the CFO has not confirmed the revised close plan.
        </PanelBlock>
      </RevealItem>
    </div>
  );
}

function AutoOnboardPanel({ reduceMotion }) {
  const chips = ["Maya · CFO sponsor", "Luis · Security", "Priya · RevOps"];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <RevealItem index={0} reduceMotion={reduceMotion}>
        <PanelBlock title="Stakeholders" accent="blue">
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="rounded-full border border-blue-200/20 bg-blue-300/[0.08] px-3 py-1 text-xs text-blue-100">{chip}</span>
            ))}
          </div>
        </PanelBlock>
      </RevealItem>
      <RevealItem index={1} reduceMotion={reduceMotion}>
        <PanelBlock title="Deal history">
          Expansion started from usage spike, moved into security review, and now depends on CFO proof.
        </PanelBlock>
      </RevealItem>
      <RevealItem index={2} reduceMotion={reduceMotion}>
        <PanelBlock title="Active risks" accent="red">
          Legal owner unclear. Procurement date moved up. CFO has not seen ROI model.
        </PanelBlock>
      </RevealItem>
      <RevealItem index={3} reduceMotion={reduceMotion}>
        <PanelBlock title="Open questions" accent="orange">
          Who owns Azure licensing? Is OT switch remediation in scope? What date anchors procurement?
        </PanelBlock>
      </RevealItem>
      <RevealItem index={4} reduceMotion={reduceMotion} className="md:col-span-2">
        <PanelBlock title="Next best actions" accent="green">
          Brief new AE, send ROI model, schedule legal closeout, update mutual action plan.
        </PanelBlock>
      </RevealItem>
    </div>
  );
}

function UseCases() {
  return (
    <section id="use-cases" className="relative z-10 scroll-mt-28 bg-white/[0.018] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div {...fadeUp()} className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Use cases</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Every revenue team sees the same living context.</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article key={card.title} {...fadeUp(index * 0.06)} className="rounded-2xl border border-white/10 bg-[#0a101c]/76 p-6 shadow-[0_0_46px_rgba(34,211,238,0.06)]">
                <Icon className="size-7 text-cyan-100" />
                <h3 className="mt-5 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{card.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section id="architecture-preview" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8">
      <motion.div {...fadeUp()} className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Architecture</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Capture, reason, and act across the whole deal surface.</h2>
      </motion.div>
      <div className="relative grid gap-5 lg:grid-cols-3">
        <motion.div
          className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-gradient-to-r from-cyan-200/10 via-cyan-200/70 to-orange-200/20 shadow-[0_0_18px_rgba(34,211,238,0.45)] lg:block"
          animate={{ opacity: [0.3, 0.9, 0.35] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {architecture.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article key={item.title} {...fadeUp(index * 0.08)} className="relative rounded-2xl border border-white/10 bg-[#0a111e]/78 p-7 shadow-[0_0_42px_rgba(34,211,238,0.05)]">
              <div className="flex items-center justify-between">
                <Icon className="size-8 text-orange-100" />
                <span className="text-sm text-slate-500">0{index + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
            </motion.article>
          );
        })}
      </div>
      <motion.div {...fadeUp(0.16)} className="mt-8">
        <Link to="/architecture" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-cyan-200/22 bg-cyan-200/[0.07] px-5 text-sm font-semibold text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,0.12)] transition hover:border-cyan-100/40 hover:bg-cyan-200/[0.11]">
          Explore architecture
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </section>
  );
}

function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative z-10 bg-white/[0.014] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.09),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(255,142,62,0.07),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div {...fadeUp()} className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Testimonials</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">What revenue teams are saying</h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              {...fadeUp(index * 0.06)}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              className={`relative overflow-hidden rounded-2xl border p-6 transition ${
                testimonial.featured
                  ? "border-cyan-200/28 bg-cyan-200/[0.065] shadow-[0_0_62px_rgba(34,211,238,0.14)]"
                  : "border-white/10 bg-[#08101d]/82 shadow-[0_0_42px_rgba(34,211,238,0.055)] hover:border-cyan-100/24 hover:bg-white/[0.045]"
              }`}
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                  <Quote className="size-4" />
                </span>
                {testimonial.featured ? (
                  <span className="rounded-full border border-orange-200/22 bg-orange-200/[0.08] px-3 py-1 text-xs font-semibold text-orange-100">Early signal</span>
                ) : null}
              </div>
              <p className="mt-7 text-base leading-8 text-slate-200">“{testimonial.quote}”</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="book" className="relative z-10 px-5 py-24 sm:px-8">
      <motion.div {...fadeUp()} className="mx-auto max-w-5xl rounded-3xl border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(255,142,62,0.08)_45%,rgba(255,255,255,0.035))] p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.12)] sm:p-14">
        <CheckCircle2 className="mx-auto size-10 text-cyan-100" />
        <h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">Stop rebuilding deal context by hand.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Give sales teams a living source of truth that moves as fast as the deal.
        </p>
        <Link to="/about#contact" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-orange-200 px-5 text-sm font-semibold text-[#160b05] shadow-[0_0_34px_rgba(255,142,62,0.22)] transition hover:bg-orange-100">
          Book intro call
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-white">
          <Radar className="size-5 text-cyan-100" />
          <span className="font-semibold">Electroscope</span>
        </div>
        <p>Agentic sales intelligence for enterprise revenue teams.</p>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
