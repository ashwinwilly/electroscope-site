import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  CheckCircle2,
  DatabaseZap,
  Headphones,
  Menu,
  Radar,
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

const personas = [
  {
    title: "Account Executives",
    icon: BriefcaseBusiness,
    headline: "Know what changed before the next customer touchpoint.",
    accent: "cyan",
    benefits: [
      "Track stakeholder movement",
      "Surface pricing, budget, and procurement risk",
      "Prepare follow-ups with source-backed context",
      "Understand the next best move",
    ],
    snippet: ["Budget owner unconfirmed", "Champion re-engaged", "Next move drafted"],
  },
  {
    title: "Sales Engineers",
    icon: Blocks,
    headline: "Walk into technical validation with the full story.",
    accent: "blue",
    benefits: [
      "Carry forward prior technical context",
      "Track success criteria and blockers",
      "Know what materials to bring",
      "Align technical proof with business outcomes",
    ],
    snippet: ["OT security blocker", "Success criteria mapped", "Deck v3 recommended"],
  },
  {
    title: "RevOps & Forecasting",
    icon: DatabaseZap,
    headline: "Improve forecast visibility without chasing CRM hygiene.",
    accent: "orange",
    benefits: [
      "Detect risk before the stage changes",
      "See confidence shifts across opportunities",
      "Understand why deals moved",
      "Reduce dependence on manual updates",
    ],
    snippet: ["Forecast risk +18%", "Procurement slipped", "Confidence medium"],
  },
  {
    title: "Customer Success / Handoffs",
    icon: Headphones,
    headline: "Keep account context alive after the sale.",
    accent: "green",
    benefits: [
      "Preserve customer history",
      "Transfer stakeholder context",
      "Track open risks and promises",
      "Support onboarding and expansion",
    ],
    snippet: ["Open promises captured", "Stakeholders preserved", "Onboarding context ready"],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function SignalBackground({ reduceMotion }) {
  const dots = Array.from({ length: 22 }, (_, index) => ({
    id: index,
    left: `${(index * 31) % 100}%`,
    top: `${(index * 47) % 100}%`,
    delay: (index % 6) * 0.45,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_9%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_82%_24%,rgba(255,142,62,0.1),transparent_30%),linear-gradient(180deg,#07101f_0%,#05070d_48%,#030407_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute size-1 rounded-full bg-cyan-200/50 shadow-[0_0_12px_rgba(92,225,255,0.8)]"
          style={{ left: dot.left, top: dot.top }}
          animate={reduceMotion ? undefined : { opacity: [0.12, 0.55, 0.18], scale: [0.8, 1.35, 0.9] }}
          transition={{ duration: 5.2, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#05070d]/74 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Electroscope home">
          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_30px_rgba(36,221,255,0.18)]">
            <Radar className="size-5 text-cyan-200" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-white min-[390px]:text-base">Electroscope</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="transition hover:text-cyan-100">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/about#contact"
            className="group inline-flex h-10 items-center gap-1.5 rounded-md border border-orange-300/35 bg-orange-300/10 px-2.5 text-xs font-medium text-orange-100 shadow-[0_0_28px_rgba(255,144,69,0.14)] transition hover:border-orange-200/70 hover:bg-orange-300/16 sm:px-4 sm:text-sm"
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
      {menuOpen ? (
        <div className="border-t border-white/8 bg-[#05070d]/96 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden">
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
        </div>
      ) : null}
    </header>
  );
}

function PersonaCard({ persona, index, reduceMotion }) {
  const Icon = persona.icon;
  const tone = {
    cyan: "border-cyan-200/18 bg-cyan-200/[0.045] text-cyan-100",
    blue: "border-blue-300/18 bg-blue-300/[0.045] text-blue-100",
    orange: "border-orange-200/18 bg-orange-200/[0.05] text-orange-100",
    green: "border-emerald-300/18 bg-emerald-300/[0.045] text-emerald-100",
  }[persona.accent];

  return (
    <motion.article
      {...fadeUp(index * 0.06)}
      className="grid gap-5 rounded-2xl border border-white/10 bg-[#08101d]/82 p-5 shadow-[0_0_46px_rgba(34,211,238,0.055)] lg:grid-cols-[0.95fr_1.05fr]"
    >
      <div>
        <span className={`inline-grid size-11 place-items-center rounded-md border ${tone}`}>
          <Icon className="size-5" />
        </span>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{persona.title}</p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">{persona.headline}</h2>
        <div className="mt-5 grid gap-2">
          {persona.benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-cyan-100" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#050b14]/82 p-4">
        <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-3">
          <p className="text-sm font-semibold text-white">Live deal context</p>
          <span className="rounded-full border border-cyan-200/18 bg-cyan-200/[0.06] px-2.5 py-1 text-xs text-cyan-100">Source-backed</span>
        </div>
        <div className="grid gap-2">
          {persona.snippet.map((item, snippetIndex) => (
            <motion.div
              key={item}
              initial={reduceMotion ? false : { opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: snippetIndex * 0.06 }}
              className="rounded-xl border border-white/8 bg-white/[0.035] p-3"
            >
              <p className="text-sm font-medium text-slate-100">{item}</p>
              <p className="mt-1 text-xs text-slate-500">Updated from calls, docs, CRM, and account activity</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#05070d] px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-white">
          <Radar className="size-5 text-cyan-100" />
          <span className="font-semibold">Electroscope</span>
        </div>
        <p>Agentic sales intelligence for enterprise revenue teams.</p>
      </div>
    </footer>
  );
}

export default function UseCasesPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <SignalBackground reduceMotion={reduceMotion} />
      <Navbar />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:pt-36">
        <motion.div {...fadeUp()} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Use cases</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">Deal intelligence for every team in the revenue motion.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Electroscope gives sellers, solutions teams, operators, and leaders the context they need to act before deal signals go stale.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 py-10 sm:px-8">
        {personas.map((persona, index) => (
          <PersonaCard key={persona.title} persona={persona} index={index} reduceMotion={reduceMotion} />
        ))}
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <motion.div {...fadeUp()} className="rounded-3xl border border-cyan-100/16 bg-[#06101d]/78 p-6 shadow-[0_0_70px_rgba(34,211,238,0.1)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Shared context layer</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">One narrative follows the deal across teams.</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
            {["AE", "SE", "RevOps", "CS"].map((role, index) => (
              <React.Fragment key={role}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
                  <p className="text-lg font-semibold text-white">{role}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Acts from the same source-backed deal context.</p>
                </div>
                {index < 3 ? (
                  <motion.div
                    className="hidden h-px w-12 bg-gradient-to-r from-cyan-200/30 to-orange-200/50 shadow-[0_0_14px_rgba(34,211,238,0.45)] md:block"
                    animate={reduceMotion ? undefined : { opacity: [0.35, 0.9, 0.35] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-cyan-200/18 bg-cyan-200/[0.055] p-5">
            <div className="flex items-center gap-3">
              <Workflow className="size-6 text-cyan-100" />
              <p className="font-semibold text-white">Electroscope keeps the account story current as ownership changes.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-5 py-20 sm:px-8">
        <motion.div {...fadeUp()} className="mx-auto max-w-5xl rounded-3xl border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),rgba(255,142,62,0.07)_45%,rgba(255,255,255,0.032))] p-8 text-center shadow-[0_0_70px_rgba(34,211,238,0.1)] sm:p-12">
          <h2 className="text-3xl font-semibold text-white sm:text-5xl">Give every revenue team the same deal truth.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            See how Electroscope turns scattered sales activity into source-backed context your team can act on.
          </p>
          <Link to="/about#contact" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-orange-200 px-5 text-sm font-semibold text-[#160b05] shadow-[0_0_30px_rgba(255,142,62,0.2)] transition hover:bg-orange-100">
            Book intro call
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
