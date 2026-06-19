import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Mail, Radar, Send } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/#product" },
  { label: "Architecture", href: "/architecture" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/about#contact" },
];

const values = [
  {
    title: "Less manual entry",
    text: "Context captured from existing work.",
  },
  {
    title: "Earlier risk detection",
    text: "Signals surfaced while deals are still forming.",
  },
  {
    title: "Living deal context",
    text: "Narratives update as conversations evolve.",
  },
];

const founders = [
  {
    name: "Anoj Willy",
    role: "Founder, CEO",
    initials: "AW",
    linkedin: "https://www.linkedin.com/in/anoj-willy-0a068b61/",
  },
  {
    name: "Michael Amster",
    role: "Founder, CTO",
    initials: "MA",
    linkedin: "https://www.linkedin.com/in/mamster/",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function SignalBackground({ reduceMotion }) {
  const dots = Array.from({ length: 28 }, (_, index) => ({
    id: index,
    left: `${(index * 29) % 100}%`,
    top: `${(index * 41) % 100}%`,
    delay: (index % 7) * 0.42,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_82%_24%,rgba(255,142,62,0.12),transparent_30%),linear-gradient(180deg,#07101f_0%,#05070d_48%,#030407_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute size-1 rounded-full bg-cyan-200/60 shadow-[0_0_14px_rgba(92,225,255,0.9)]"
          style={{ left: dot.left, top: dot.top }}
          animate={reduceMotion ? undefined : { opacity: [0.16, 0.75, 0.22], scale: [0.8, 1.5, 0.9] }}
          transition={{ duration: 4.8, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AboutNavbar() {
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

function FounderCard({ founder, index }) {
  return (
    <motion.article
      {...fadeUp(index * 0.08)}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_42px_rgba(34,211,238,0.06)] transition hover:border-cyan-100/24 hover:bg-white/[0.052]"
    >
      <div className="flex items-center gap-4">
        <div className="grid size-14 place-items-center rounded-full border border-cyan-100/28 bg-cyan-200/[0.09] text-lg font-semibold text-cyan-50 shadow-[0_0_34px_rgba(34,211,238,0.16)]">
          {founder.initials}
        </div>
        <div>
          <h3 className="font-semibold text-white">{founder.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{founder.role}</p>
        </div>
      </div>
      <a
        href={founder.linkedin}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-100/28 hover:text-cyan-100"
      >
        <ExternalLink className="size-4" />
        LinkedIn
      </a>
    </motion.article>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Electroscope intro call request");
    const body = encodeURIComponent(
      [
        `Name: ${form.get("name") || ""}`,
        `Work email: ${form.get("email") || ""}`,
        `Company: ${form.get("company") || ""}`,
        `Role: ${form.get("role") || ""}`,
        "",
        form.get("message") || "",
      ].join("\n"),
    );
    window.location.href = `mailto:intro@electroscope.ai?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <SignalBackground reduceMotion={reduceMotion} />
      <AboutNavbar />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 lg:pt-36">
        <motion.div {...fadeUp()} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">About Electroscope</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Building the intelligence layer for enterprise sales.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Electroscope helps revenue teams understand what is happening inside complex deals before that context reaches the CRM. We turn calls, emails, chats, documents, and CRM activity into living deal narratives that surface risks, uncover insights, and help teams decide what to do next.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              {...fadeUp(index * 0.08)}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-cyan-100/14 bg-[#09111f]/82 p-6 shadow-[0_0_52px_rgba(34,211,238,0.07)] transition hover:border-cyan-100/30 hover:shadow-[0_0_60px_rgba(34,211,238,0.13)]"
            >
              <div className="mb-5 h-px w-16 bg-gradient-to-r from-cyan-200 to-orange-200 shadow-[0_0_16px_rgba(34,211,238,0.65)]" />
              <h2 className="text-xl font-semibold text-white">{value.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{value.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.article {...fadeUp()} className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 shadow-[0_0_54px_rgba(255,142,62,0.05)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Company mission</p>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Electroscope exists to make revenue teams more effective by pulling signal out of scattered sales activity. Instead of forcing sellers to rebuild context after every interaction, Electroscope organizes what happened, what changed, and what matters next.
          </p>
        </motion.article>

        <div className="rounded-2xl border border-cyan-100/14 bg-[#07101d]/82 p-7 shadow-[0_0_64px_rgba(34,211,238,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Leadership</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {founders.map((founder, index) => (
              <FounderCard key={founder.name} founder={founder} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-8">
        <motion.div
          {...fadeUp()}
          className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-cyan-100/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(255,142,62,0.08)_44%,rgba(255,255,255,0.035))] p-6 shadow-[0_0_90px_rgba(34,211,238,0.13)] sm:p-8 lg:grid-cols-[0.82fr_1fr]"
        >
          <div>
            <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-orange-200/28 bg-orange-200/[0.08] text-orange-100 shadow-[0_0_30px_rgba(255,142,62,0.13)]">
              <Mail className="size-5" />
            </div>
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">Ready to see your deal narrative come alive?</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Tell us a little about your team and we’ll show how Electroscope can help surface risks, prepare meetings, and keep CRM context current without manual data entry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-300">
                Name
                <input name="name" required className="h-12 rounded-md border border-white/10 bg-[#050b14]/82 px-4 text-white outline-none transition focus:border-cyan-100/40" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-300">
                Work email
                <input name="email" type="email" required className="h-12 rounded-md border border-white/10 bg-[#050b14]/82 px-4 text-white outline-none transition focus:border-cyan-100/40" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-300">
                Company
                <input name="company" required className="h-12 rounded-md border border-white/10 bg-[#050b14]/82 px-4 text-white outline-none transition focus:border-cyan-100/40" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-300">
                Role, optional
                <input name="role" className="h-12 rounded-md border border-white/10 bg-[#050b14]/82 px-4 text-white outline-none transition focus:border-cyan-100/40" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-slate-300">
              Message, optional
              <textarea name="message" rows="4" className="rounded-md border border-white/10 bg-[#050b14]/82 px-4 py-3 text-white outline-none transition focus:border-cyan-100/40" />
            </label>
            <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-cyan-200 px-5 text-sm font-semibold text-[#051019] shadow-[0_0_34px_rgba(80,226,255,0.24)] transition hover:bg-cyan-100 sm:w-fit">
              Request intro call
              <Send className="size-4" />
            </button>
          </form>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/8 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-white">
            <Radar className="size-5 text-cyan-100" />
            <span className="font-semibold">Electroscope</span>
          </div>
          <p>Agentic sales intelligence for enterprise revenue teams.</p>
        </div>
      </footer>
    </main>
  );
}
