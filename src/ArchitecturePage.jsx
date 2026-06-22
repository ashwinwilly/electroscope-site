import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  Calendar,
  CircleDotDashed,
  Database,
  Menu,
  MessageSquare,
  Radar,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/#product" },
  { label: "Architecture", href: "/architecture" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/about#contact" },
];

const stages = [
  {
    title: "Capture",
    icon: Radar,
    text: "Ingest calls, chats, emails, documents, calendar activity, and CRM changes across the full enterprise sales motion.",
    detail: "Connect to the places where work already happens and preserve deal evidence as it changes.",
  },
  {
    title: "Reason",
    icon: CircleDotDashed,
    text: "Turn scattered evidence into living deal narratives, risk models, stakeholder maps, and forecast-quality signals.",
    detail: "Resolve fragments into entities, relationships, intent, risk, and role-specific context.",
  },
  {
    title: "Act",
    icon: Workflow,
    text: "Recommend next moves, draft CRM updates, escalate risk, and keep teams aligned while opportunities are still changing.",
    detail: "Surface the next best action inside the workflows where revenue teams already operate.",
  },
];

const integrationGroups = [
  { title: "CRMs", icon: Database, items: [["Attio"], ["HubSpot", "Coming Soon"], ["Salesforce", "Coming Soon"], ["Monday.com", "Coming Soon"]] },
  { title: "Transcriptions", icon: MessageSquare, items: [["Krisp"], ["Gong.io", "Coming Soon"], ["Webex", "Coming Soon"], ["Zoom", "Coming Soon"]] },
  { title: "Calendaring", icon: Calendar, items: [["Microsoft 365"], ["Google", "Coming Soon"]] },
  { title: "External Data", icon: Blocks, items: [["LinkedIn"]] },
];

const dataSources = [
  {
    title: "Systems",
    text: "Opportunity state, activities, call intelligence, and revenue records.",
    badges: [
      { name: "Salesforce", mark: "SF", classes: "border-sky-300/35 bg-sky-400/12 text-sky-100" },
      { name: "Gong", mark: "G", classes: "border-violet-300/35 bg-violet-400/12 text-violet-100" },
    ],
  },
  {
    title: "Documents",
    text: "Decks, scopes, security packets, proposals, and collaboration files.",
    badges: [
      { name: "Microsoft Office", mark: "O", classes: "border-orange-300/35 bg-orange-400/12 text-orange-100" },
      { name: "Google Workspace", mark: "G", classes: "border-emerald-300/35 bg-emerald-400/12 text-emerald-100" },
    ],
  },
  {
    title: "Communication",
    text: "Meetings, stakeholder threads, internal alignment, and side-channel context.",
    badges: [
      { name: "Zoom", mark: "Z", classes: "border-blue-300/35 bg-blue-400/12 text-blue-100" },
      { name: "Slack", mark: "S", classes: "border-fuchsia-300/35 bg-fuchsia-400/12 text-fuchsia-100" },
    ],
  },
  {
    title: "Email",
    text: "Buyer replies, approval trails, pricing questions, and follow-up gaps.",
    badges: [
      { name: "Outlook", mark: "O", classes: "border-cyan-300/35 bg-cyan-400/12 text-cyan-100" },
      { name: "Gmail", mark: "M", classes: "border-red-300/35 bg-red-400/12 text-red-100" },
    ],
  },
];

const coreLayers = [
  { title: "Extraction pipeline", color: "bg-emerald-300", text: "Normalize activity into structured evidence." },
  { title: "Core entities", color: "bg-cyan-300", text: "Resolve accounts, people, events, and commitments." },
  { title: "Data stacking", color: "bg-blue-300", text: "Layer context across time and systems." },
  { title: "AI agent", color: "bg-orange-300", text: "Reason over deal state, risk, and next action." },
  { title: "Relationship graph", color: "bg-fuchsia-300", text: "Map stakeholders, influence, and dependencies." },
  { title: "Integrations", color: "bg-slate-200", text: "Sync answers back into revenue workflows." },
];

const answers = [
  {
    role: "Account Manager",
    prompt: "Prep me for tomorrow’s CIO meeting.",
    label: "Meeting prep",
    detail: "Last conversation, stakeholder priorities, open risks, and next move.",
    tone: "cyan",
  },
  {
    role: "Engineer",
    prompt: "What success criteria did the customer confirm?",
    label: "Technical context",
    detail: "Requirements, blockers, architecture notes, and validation criteria.",
    tone: "green",
  },
  {
    role: "Sales Ops",
    prompt: "What changed since the last forecast commit?",
    label: "Forecast signal",
    detail: "Budget movement, procurement risk, stakeholder changes, and confidence shifts.",
    tone: "orange",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
}

function CursorGlow({ reduceMotion }) {
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return undefined;
    const update = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="cursor-glow"
      animate={{ x: position.x - 220, y: position.y - 220 }}
      transition={{ type: "spring", stiffness: 55, damping: 24, mass: 0.4 }}
      aria-hidden="true"
    />
  );
}

function SignalBackground({ reduceMotion }) {
  const dots = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    left: `${(index * 31) % 100}%`,
    top: `${(index * 43) % 100}%`,
    delay: (index % 7) * 0.42,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(255,142,62,0.12),transparent_30%),linear-gradient(180deg,#07101f_0%,#05070d_48%,#030407_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute size-1 rounded-full bg-cyan-200/60 shadow-[0_0_14px_rgba(92,225,255,0.9)]"
          style={{ left: dot.left, top: dot.top }}
          animate={reduceMotion ? undefined : { opacity: [0.12, 0.5, 0.18], scale: [0.8, 1.35, 0.9] }}
          transition={{ duration: 5.2, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const location = useLocation();

  const isActive = (item) => {
    if (item.href === "/") return location.pathname === "/" && !location.hash;
    if (item.href.startsWith("/#")) return location.pathname === "/" && location.hash === item.href.slice(1);
    return location.pathname === item.href.split("#")[0];
  };

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition duration-300 ${
        scrolled
          ? "border-cyan-100/14 bg-[#05070d]/86 shadow-[0_14px_52px_rgba(0,0,0,0.34),0_0_34px_rgba(34,211,238,0.07)]"
          : "border-white/8 bg-[#05070d]/74"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Electroscope home">
          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_30px_rgba(36,221,255,0.18)]">
            <Radar className="size-5 text-cyan-200" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-white min-[390px]:text-base">Electroscope</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className={`relative transition hover:text-cyan-100 ${isActive(item) ? "text-cyan-100" : ""}`}>
              {item.label}
              {isActive(item) ? <motion.span layoutId="architecture-nav-active" className="absolute -bottom-2 left-1/2 h-px w-5 -translate-x-1/2 bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.9)]" /> : null}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/about#contact"
            className="group inline-flex h-10 items-center gap-1.5 rounded-md border border-orange-300/35 bg-orange-300/10 px-2.5 text-xs font-medium text-orange-100 shadow-[0_0_28px_rgba(255,144,69,0.14)] transition hover:border-orange-200/70 hover:bg-orange-300/16 hover:shadow-[0_0_34px_rgba(255,144,69,0.22)] sm:px-4 sm:text-sm"
          >
            Book intro call
            <ArrowRight className="hidden size-4 transition group-hover:translate-x-0.5 sm:block" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-slate-100 transition hover:border-cyan-100/28 hover:text-cyan-100 md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/8 bg-[#05070d]/96 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.045] hover:text-cyan-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
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

export default function ArchitecturePage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <SignalBackground reduceMotion={reduceMotion} />
      <CursorGlow reduceMotion={reduceMotion} />
      <Navbar />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-32 max-lg:pb-10 max-lg:pt-24 sm:px-8 lg:pt-36">
        <motion.div {...fadeUp()} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Architecture</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white max-lg:mt-4 max-lg:text-3xl sm:text-6xl md:max-lg:text-5xl">Capture, reason, and act across the whole deal surface.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 max-lg:mt-4 max-lg:text-base max-lg:leading-7 sm:text-xl">
            Electroscope connects to the tools where enterprise sales work already happens, extracts the signals that matter, and turns them into living deal intelligence your team can act on.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 max-lg:py-10 sm:px-8">
        <div className="grid gap-5 max-lg:gap-3 lg:grid-cols-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.article
                key={stage.title}
                {...fadeUp(index * 0.08)}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-[#09111f]/82 p-7 shadow-[0_0_52px_rgba(34,211,238,0.07)] transition hover:border-cyan-100/28 hover:shadow-[0_0_64px_rgba(34,211,238,0.14)] max-lg:p-4"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-8 text-orange-100 max-lg:size-6" />
                  <span className="text-sm text-slate-500">0{index + 1}</span>
                </div>
                <h2 className="mt-8 text-2xl font-semibold text-white max-lg:mt-4 max-lg:text-xl">{stage.title}</h2>
                <p className="mt-4 leading-7 text-slate-300 max-lg:mt-2 max-lg:text-sm max-lg:leading-6">{stage.text}</p>
                <p className="mt-5 rounded-xl border border-cyan-200/14 bg-cyan-200/[0.04] p-4 text-sm leading-6 text-slate-300 max-lg:mt-3 max-lg:p-3">{stage.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 max-lg:py-12 sm:px-8">
        <motion.div {...fadeUp()} className="mb-10 max-w-4xl max-lg:mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Integrations</p>
          <h2 className="mt-4 text-3xl font-semibold text-white max-lg:text-2xl sm:text-5xl md:max-lg:text-4xl">Connect the systems your revenue team already uses.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 max-lg:mt-4 max-lg:text-base max-lg:leading-7">
            Electroscope uses native APIs and MCP-style connectors to access sales activity across your work ecosystem, then enriches deal context without forcing reps into another system.
          </p>
        </motion.div>
        <div className="grid gap-5 max-lg:gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {integrationGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.article key={group.title} {...fadeUp(index * 0.06)} whileHover={reduceMotion ? undefined : { y: -3 }} className="integration-shimmer rounded-2xl border border-white/10 bg-[#08101d]/86 p-5 shadow-[0_0_48px_rgba(255,142,62,0.05)] transition hover:border-cyan-100/28 hover:bg-white/[0.045] hover:shadow-[0_0_42px_rgba(34,211,238,0.09)] max-lg:p-4">
                <Icon className="size-7 text-cyan-100 max-lg:size-6" />
                <h3 className="mt-4 text-xl font-semibold text-white max-lg:mt-3 max-lg:text-lg">{group.title}</h3>
                <div className="mt-5 grid gap-3 max-lg:mt-3 max-lg:gap-2">
                  {group.items.map(([name, status]) => (
                    <div key={name} className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2 transition hover:border-cyan-100/22 hover:bg-cyan-200/[0.045] max-lg:gap-2 max-lg:px-2.5 max-lg:py-2">
                      <span className="text-sm font-medium text-slate-100 transition group-hover:text-white">{name}</span>
                      {status ? <span className="rounded-full border border-orange-200/20 bg-orange-200/[0.08] px-2 py-0.5 text-xs text-orange-100">{status}</span> : null}
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 max-lg:py-12 sm:px-8">
        <motion.div {...fadeUp()} className="mb-10 max-w-4xl max-lg:mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">System diagram</p>
          <h2 className="mt-4 text-3xl font-semibold text-white max-lg:text-2xl sm:text-5xl md:max-lg:text-4xl">From scattered systems to role-specific answers.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 max-lg:mt-4 max-lg:text-base max-lg:leading-7">
            Electroscope captures signals from systems, documents, communication, and email, then reasons over the account graph so each team member gets the context they need.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.08)}
          className="relative hidden overflow-hidden rounded-3xl border border-cyan-100/16 bg-[#06101d]/72 p-4 shadow-[0_0_90px_rgba(34,211,238,0.12)] sm:p-6 lg:block"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_86%_30%,rgba(255,142,62,0.1),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.7)]" />

          <div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.18fr_1fr] lg:items-stretch">
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              {[23, 38, 53, 68].map((top, index) => (
                <FlowBeam key={`in-${top}`} top={`${top}%`} left="28.5%" width="11.5%" delay={index * 0.16} reduceMotion={reduceMotion} />
              ))}
              {[30, 50, 70].map((top, index) => (
                <FlowBeam key={`out-${top}`} top={`${top}%`} left="61.5%" width="10.5%" delay={0.56 + index * 0.18} tone={index === 2 ? "orange" : "cyan"} reduceMotion={reduceMotion} />
              ))}
            </div>

            <DataSourceColumn />
            <MobileFlowLabel label="Signals normalized" reduceMotion={reduceMotion} />
            <EngineCore reduceMotion={reduceMotion} />
            <MobileFlowLabel label="Answers generated" tone="orange" reduceMotion={reduceMotion} />
            <RoleAnswers />
          </div>
        </motion.div>

        <MobileSystemDiagram reduceMotion={reduceMotion} />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 max-lg:py-10 sm:px-8">
        <motion.div {...fadeUp()} className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 max-lg:p-5">
          <ShieldCheck className="size-8 text-cyan-100 max-lg:size-7" />
          <h2 className="mt-5 text-2xl font-semibold text-white max-lg:mt-4 max-lg:text-xl">Built for existing sales workflows.</h2>
          <p className="mt-4 max-w-4xl leading-7 text-slate-300 max-lg:text-sm max-lg:leading-6">
            Electroscope is designed to enrich the systems teams already trust, not replace them. Signals are organized, weighted, and surfaced back into the workflows where sellers, leaders, and operators make decisions.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 px-5 py-24 max-lg:py-12 sm:px-8">
        <motion.div {...fadeUp()} className="mx-auto max-w-5xl rounded-3xl border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(255,142,62,0.08)_45%,rgba(255,255,255,0.035))] p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.12)] max-lg:p-6 sm:p-14">
          <h2 className="text-3xl font-semibold text-white max-lg:text-2xl sm:text-5xl">See how Electroscope fits your revenue stack.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300 max-lg:mt-4 max-lg:text-base max-lg:leading-7">
            Book an intro call to explore how Electroscope can connect to your sales tools and surface deal intelligence without manual CRM work.
          </p>
          <Link to="/about#contact" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-orange-200 px-5 text-sm font-semibold text-[#160b05] shadow-[0_0_34px_rgba(255,142,62,0.22)] transition hover:bg-orange-100">
            Book intro call
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

function MobileSystemDiagram({ reduceMotion }) {
  return (
    <motion.div
      {...fadeUp(0.08)}
      className="relative overflow-hidden rounded-2xl border border-cyan-100/16 bg-[#06101d]/72 p-4 shadow-[0_0_58px_rgba(34,211,238,0.1)] lg:hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_72%_80%,rgba(255,142,62,0.1),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-45" />

      <div className="relative grid gap-4">
        <section className="rounded-2xl border border-white/10 bg-[#07101d]/86 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Data sources</h3>
            <span className="rounded-full border border-emerald-200/20 bg-emerald-200/[0.08] px-2.5 py-1 text-[11px] font-semibold text-emerald-100">Live</span>
          </div>
          <div className="grid gap-2 min-[430px]:grid-cols-2">
            {dataSources.map((source, index) => (
              <motion.article
                key={source.title}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.42, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-cyan-50">{source.title}</p>
                  <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{source.text}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {source.badges.map((badge) => (
                    <span key={badge.name} className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-semibold ${badge.classes}`}>
                      <span className="grid size-4 place-items-center rounded-full bg-white/10 text-[9px]">{badge.mark}</span>
                      {badge.name}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <MobileDiagramConnector label="Signals normalized" reduceMotion={reduceMotion} />

        <section className="relative rounded-2xl border border-cyan-100/24 bg-cyan-200/[0.06] p-4 text-center shadow-[0_0_58px_rgba(34,211,238,0.14)]">
          <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
          <motion.span
            className="mx-auto grid size-12 place-items-center rounded-full border border-cyan-200/35 bg-cyan-200/[0.1] text-sm font-semibold text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.28)]"
            animate={reduceMotion ? undefined : { boxShadow: ["0 0 18px rgba(34,211,238,0.18)", "0 0 40px rgba(255,142,62,0.22)", "0 0 18px rgba(34,211,238,0.18)"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ES
          </motion.span>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Reasoning core</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Electroscope</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-300">Extracts entities, stacks context, maps relationships, and reasons over risk.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {coreLayers.map((item, index) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.38, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#07101d]/78 px-2.5 py-2 text-left"
              >
                <span className={`size-2 rounded-full ${item.color} shadow-[0_0_12px_currentColor]`} />
                <span className="text-xs font-semibold leading-4 text-slate-100">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <MobileDiagramConnector label="Answers generated" tone="orange" reduceMotion={reduceMotion} />

        <section className="rounded-2xl border border-white/10 bg-[#07101d]/86 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Role-specific answers</h3>
            <span className="rounded-full border border-orange-200/22 bg-orange-200/[0.08] px-2.5 py-1 text-[11px] font-semibold text-orange-100">Action ready</span>
          </div>
          <div className="grid gap-2">
            {answers.map((answer, index) => (
              <motion.article
                key={answer.role}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{answer.role}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">“{answer.prompt}”</p>
                  </div>
                  <span
                    className={
                      answer.tone === "orange"
                        ? "shrink-0 rounded-full border border-orange-200/24 bg-orange-200/[0.07] px-2 py-1 text-[11px] font-semibold text-orange-100"
                        : answer.tone === "green"
                          ? "shrink-0 rounded-full border border-emerald-200/22 bg-emerald-200/[0.055] px-2 py-1 text-[11px] font-semibold text-emerald-100"
                          : "shrink-0 rounded-full border border-cyan-200/22 bg-cyan-200/[0.055] px-2 py-1 text-[11px] font-semibold text-cyan-100"
                    }
                  >
                    {answer.label}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-400">{answer.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function MobileDiagramConnector({ label, tone = "cyan", reduceMotion }) {
  const lineClass =
    tone === "orange"
      ? "bg-gradient-to-b from-orange-200/20 via-orange-200/80 to-cyan-200/20 shadow-[0_0_16px_rgba(255,142,62,0.55)]"
      : "bg-gradient-to-b from-cyan-200/20 via-cyan-200/80 to-cyan-200/20 shadow-[0_0_16px_rgba(34,211,238,0.6)]";
  const dotClass = tone === "orange" ? "bg-orange-200 shadow-[0_0_14px_rgba(255,142,62,0.9)]" : "bg-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.9)]";

  return (
    <div className="relative grid place-items-center py-0.5">
      <motion.div
        className={`relative h-10 w-px ${lineClass}`}
        initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {!reduceMotion ? (
          <motion.span
            className={`absolute -left-1 top-0 size-2 rounded-full ${dotClass}`}
            animate={{ y: [0, 32], opacity: [0, 1, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </motion.div>
      <span className="mt-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{label}</span>
    </div>
  );
}

function FlowBeam({ top, left, width, delay = 0, tone = "cyan", reduceMotion }) {
  const beamClass =
    tone === "orange"
      ? "from-orange-200/0 via-orange-200/80 to-cyan-200/10 shadow-[0_0_18px_rgba(255,142,62,0.65)]"
      : "from-cyan-200/0 via-cyan-200/85 to-cyan-200/10 shadow-[0_0_18px_rgba(34,211,238,0.68)]";
  const particleClass = tone === "orange" ? "bg-orange-200 shadow-[0_0_16px_rgba(255,142,62,0.9)]" : "bg-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.9)]";

  return (
    <motion.div
      className={`absolute h-px origin-left bg-gradient-to-r ${beamClass}`}
      style={{ top, left, width }}
      initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {!reduceMotion ? (
        <motion.span
          className={`absolute -top-1 size-2 rounded-full ${particleClass}`}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 2.6, delay: delay + 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </motion.div>
  );
}

function MobileFlowLabel({ label, tone = "cyan", reduceMotion }) {
  return (
    <div className="relative grid place-items-center py-1 lg:hidden">
      <motion.div
        className={
          tone === "orange"
            ? "h-12 w-px bg-gradient-to-b from-orange-200/20 via-orange-200/75 to-cyan-200/20 shadow-[0_0_16px_rgba(255,142,62,0.55)]"
            : "h-12 w-px bg-gradient-to-b from-cyan-200/20 via-cyan-200/80 to-cyan-200/20 shadow-[0_0_16px_rgba(34,211,238,0.6)]"
        }
        initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="mt-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{label}</span>
    </div>
  );
}

function DataSourceColumn() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#07101d]/86 p-5 shadow-[0_0_44px_rgba(34,211,238,0.06)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">Data sources</h3>
        <span className="rounded-full border border-emerald-200/20 bg-emerald-200/[0.08] px-3 py-1 text-xs font-semibold text-emerald-100">Live capture</span>
      </div>
      <div className="grid gap-3">
        {dataSources.map((source, index) => (
          <motion.article
            key={source.title}
            {...fadeUp(index * 0.06)}
            whileHover={{ y: -3 }}
            className="integration-shimmer rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-100/28 hover:bg-white/[0.06] hover:shadow-[0_0_34px_rgba(34,211,238,0.12)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-cyan-50">{source.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{source.text}</p>
              </div>
              <span className="mt-1 size-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {source.badges.map((badge) => (
                <span key={badge.name} className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition hover:brightness-125 ${badge.classes}`}>
                  <span className="grid size-5 place-items-center rounded-full bg-white/10 text-[10px]">{badge.mark}</span>
                  {badge.name}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function EngineCore({ reduceMotion }) {
  return (
    <div className="relative rounded-3xl border border-cyan-100/24 bg-cyan-200/[0.06] p-5 shadow-[0_0_88px_rgba(34,211,238,0.16)] lg:scale-[1.03]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),rgba(255,142,62,0.09)_38%,transparent_65%)] blur-2xl" />
      {!reduceMotion ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-14 h-32 w-32 -translate-x-1/2 rounded-full border border-cyan-200/18"
          animate={{ rotate: 360, opacity: [0.38, 0.7, 0.38] }}
          transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        />
      ) : null}
      <div className="relative flex items-center justify-between gap-4 rounded-2xl border border-cyan-100/18 bg-[#07111f]/88 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Reasoning core</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Electroscope</h3>
        </div>
        <motion.span
          className="grid size-12 place-items-center rounded-full border border-cyan-200/35 bg-cyan-200/[0.1] text-sm font-semibold text-cyan-50 shadow-[0_0_34px_rgba(34,211,238,0.3)]"
          animate={reduceMotion ? undefined : { boxShadow: ["0 0 20px rgba(34,211,238,0.2)", "0 0 46px rgba(255,142,62,0.24)", "0 0 20px rgba(34,211,238,0.2)"] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ES
        </motion.span>
      </div>
      <div className="relative mt-5 grid gap-3">
        {coreLayers.map((item, index) => (
          <motion.div
            key={item.title}
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group rounded-2xl border border-white/10 bg-[#07101d]/86 px-4 py-3 transition hover:border-cyan-100/32 hover:bg-cyan-200/[0.06] hover:shadow-[0_0_32px_rgba(34,211,238,0.13)]"
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1 size-2.5 rounded-full ${item.color} shadow-[0_0_14px_currentColor]`} />
              <div>
                <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RoleAnswers() {
  const toneClasses = {
    cyan: "border-cyan-200/22 bg-cyan-200/[0.055] text-cyan-100",
    green: "border-emerald-200/22 bg-emerald-200/[0.055] text-emerald-100",
    orange: "border-orange-200/24 bg-orange-200/[0.07] text-orange-100",
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#07101d]/86 p-5 shadow-[0_0_44px_rgba(255,142,62,0.06)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">Role-specific answers</h3>
        <span className="rounded-full border border-orange-200/22 bg-orange-200/[0.08] px-3 py-1 text-xs font-semibold text-orange-100">Action ready</span>
      </div>
      <div className="grid gap-3">
        {answers.map((answer, index) => (
          <motion.article
            key={answer.role}
            {...fadeUp(index * 0.07)}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-orange-100/28 hover:bg-white/[0.06] hover:shadow-[0_0_34px_rgba(255,142,62,0.12)]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold text-white">{answer.role}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">“{answer.prompt}”</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[answer.tone]}`}>{answer.label}</span>
            </div>
            <p className="mt-4 rounded-xl border border-white/8 bg-[#050b14]/72 p-3 text-sm leading-6 text-slate-400">{answer.detail}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
