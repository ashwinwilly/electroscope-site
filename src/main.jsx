import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Blocks, BriefcaseBusiness, CalendarCheck, CheckCircle2, CircleDotDashed, DatabaseZap, FileText, Headphones, Inbox, MessagesSquare, Quote, Radar, UserPlus, Workflow } from "lucide-react";
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
  ["Account Executives", BriefcaseBusiness, "Walk into every interaction with current deal truth, open risks, stakeholder shifts, and the best next action."],
  ["Sales Engineers", Blocks, "See technical blockers, proof points, security asks, and mutual action plan gaps without hunting through threads."],
  ["RevOps", DatabaseZap, "Replace brittle CRM hygiene with source-backed updates, forecast signals, and consistent opportunity narratives."],
  ["Customer Success", Headphones, "Carry forward every promise, risk, champion, and implementation cue as deals move from close to expansion."],
];

const architecture = [
  ["Capture", Radar, "Ingest calls, chats, emails, documents, calendar activity, and CRM changes across the full enterprise sales motion."],
  ["Reason", CircleDotDashed, "Turn scattered evidence into living deal narratives, risk models, stakeholder maps, and forecast-quality signals."],
  ["Act", Workflow, "Recommend next moves, draft CRM updates, escalate risk, and keep teams aligned while opportunities are still changing."],
];

const productTabs = [
  ["Living Narrative", FileText, "A timeline of what happened, what changed, and what the deal now depends on."],
  ["Meeting Prep", CalendarCheck, "Every call briefed with goals, prior context, risks, stakeholders, and materials to bring."],
  ["Plan My Day", CheckCircle2, "A prioritized view of the deals, follow-ups, and risks that need attention now."],
  ["Auto-Onboard", UserPlus, "A fast handoff for new team members, managers, or post-sales teams joining the account."],
];

const testimonials = [
  ["Electroscope helped me stop rebuilding deal context from scratch before every meeting. I walk in knowing what changed, what matters, and what to do next.", "N.W.", "Technical Sales Lead"],
  ["The biggest value is that it surfaces risk while the deal is still moving, not two weeks later when someone finally updates the CRM.", "A.E.", "Revenue Operations Leader"],
  ["Meeting prep used to live in scattered notes and memory. Electroscope turned that into a repeatable workflow.", "S.P.", "Solutions Engineer"],
  ["It gives our team a living deal narrative instead of static CRM snapshots.", "M.R.", "Account Executive"],
];

function fadeUp(delay = 0) {
  return { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } };
}

function HashScroll() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return window.scrollTo({ top: 0, behavior: "auto" });
    window.requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [location.pathname, location.hash]);
  return null;
}

function SignalBackground({ reduceMotion }) {
  return <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.17),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(255,142,62,0.12),transparent_30%),linear-gradient(180deg,#07101f_0%,#05070d_48%,#030407_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />{Array.from({ length: 34 }, (_, i) => <motion.span key={i} className="absolute size-1 rounded-full bg-cyan-200/60 shadow-[0_0_14px_rgba(92,225,255,0.9)]" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 29) % 100}%` }} animate={reduceMotion ? undefined : { opacity: [0.16, 0.75, 0.22], scale: [0.8, 1.5, 0.9] }} transition={{ duration: 4.8, delay: (i % 7) * 0.42, repeat: Infinity, ease: "easeInOut" }} />)}</div>;
}

function Navbar() {
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#05070d]/74 backdrop-blur-xl"><nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"><Link to="/" className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_30px_rgba(36,221,255,0.18)]"><Radar className="size-5 text-cyan-200" /></span><span className="font-semibold tracking-wide text-white">Electroscope</span></Link><div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">{navItems.map((item) => <Link key={item.label} to={item.href} className="transition hover:text-cyan-100">{item.label}</Link>)}</div><Link to="/about#contact" className="inline-flex h-10 items-center gap-2 rounded-md border border-orange-300/35 bg-orange-300/10 px-4 text-sm font-medium text-orange-100">Book intro call<ArrowRight className="size-4" /></Link></nav></header>;
}

function App() {
  return <><HashScroll /><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/architecture" element={<ArchitecturePage />} /></Routes></>;
}

function HomePage() {
  const reduceMotion = useReducedMotion();
  return <main className="min-h-screen overflow-hidden bg-[#05070d] text-slate-100"><SignalBackground reduceMotion={reduceMotion} /><Navbar /><Hero /><Problem /><Pipeline /><ProductDemo /><UseCases /><ArchitecturePreview /><Testimonials /><FinalCta /><Footer /></main>;
}

function Hero() {
  return <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]"><motion.div {...fadeUp()}><p className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/[0.06] px-4 py-2 text-sm font-semibold text-cyan-100">Agentic sales intelligence for enterprise revenue teams.</p><h1 className="mt-7 text-4xl font-semibold leading-tight text-white sm:text-6xl">Know where every deal stands before your CRM catches up.</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">Electroscope is an agentic sales engine that analyzes calls, chats, emails, and CRM activity to surface risks, uncover insights, and eliminate manual data entry while deals are still forming.</p><div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link to="/about#contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-200 px-5 text-sm font-semibold text-[#051019]">Book intro call<ArrowRight className="size-4" /></Link><a href="#product" className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-slate-200">See how it works</a></div></motion.div><motion.div {...fadeUp(0.12)} className="rounded-3xl border border-cyan-100/18 bg-[#08111f]/88 p-6 shadow-[0_0_80px_rgba(34,211,238,0.12)]"><div className="flex items-center justify-between"><p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Opportunity narrative</p><span className="rounded-full border border-orange-200/28 bg-orange-200/[0.09] px-3 py-1 text-xs text-orange-100">Risk rising</span></div><h2 className="mt-5 text-2xl font-semibold text-white">Northstar Systems expansion</h2>{["Economic buyer absent from last 3 interactions", "Security review accelerated after new doc upload", "Champion sentiment softened on pricing thread"].map((item, i) => <motion.div key={item} {...fadeUp(i * 0.08)} className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">{item}</motion.div>)}<div className="mt-5 rounded-2xl border border-cyan-200/18 bg-cyan-200/[0.06] p-4"><p className="text-sm font-semibold text-cyan-100">Recommended next move</p><p className="mt-2 text-sm leading-6 text-slate-300">Confirm CFO priority and send ROI model before procurement review.</p></div></motion.div></section>;
}

function Problem() {
  return <section className="relative z-10 py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><motion.div {...fadeUp()} className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">The problem</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Deals are not linear, but CRMs treat them like they are.</h2><p className="mt-6 text-lg leading-8 text-slate-300">Enterprise opportunities unfold across meetings, side threads, security reviews, pricing debates, and quiet stakeholder changes. By the time that context reaches the CRM, the signal has already gone stale.</p></motion.div><motion.div {...fadeUp(0.1)} className="mt-12 rounded-3xl border border-cyan-100/16 bg-[#06101d]/70 p-6 shadow-[0_0_80px_rgba(34,211,238,0.1)]"><h3 className="text-xl font-semibold text-white">Deal signals scatter before they reach the CRM.</h3><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["Problem", "Discovery", "Champion", "Outcome", "Impact", "Solution", "Buyer", "Decision", "Procurement", "Budget", "Close"].map((node, i) => <span key={node} className={`rounded-full border px-4 py-3 text-sm ${i % 3 === 0 ? "border-orange-200/28 bg-orange-200/[0.08] text-orange-100" : "border-cyan-200/22 bg-cyan-200/[0.06] text-cyan-100"}`}>{node}</span>)}</div><p className="mt-8 text-sm text-slate-400">Your CRM only sees what someone remembers to enter. Electroscope sees the deal as it is forming.</p></motion.div></div></section>;
}

function Pipeline() {
  return <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8"><motion.div {...fadeUp()} className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Signal pipeline</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">From scattered activity to actionable deal intelligence.</h2><p className="mt-6 text-lg leading-8 text-slate-300">Electroscope ingests the scattered work around a deal, reasons over the context, and surfaces the risks, insights, and next moves your team needs before the CRM catches up.</p></motion.div><div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.9fr_1fr]"><CardGrid items={["Calls", "Chats", "Inbox", "Documents", "CRM"]} /><div className="rounded-3xl border border-cyan-100/24 bg-cyan-200/[0.06] p-6 text-center shadow-[0_0_88px_rgba(34,211,238,0.16)]"><p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Core</p><h3 className="mt-3 text-2xl font-semibold text-white">Electroscope</h3><p className="mt-4 text-sm leading-6 text-slate-300">Agentic reasoning layer that keeps deal state alive.</p></div><CardGrid items={["Risks", "Insights", "Next Moves", "Forecast Signals"]} accent="orange" /></div></section>;
}

function CardGrid({ items, accent = "cyan" }) {
  return <div className="grid gap-3">{items.map((item, i) => <motion.div key={item} {...fadeUp(i * 0.05)} whileHover={{ y: -3 }} className={`rounded-2xl border bg-white/[0.04] p-4 font-semibold ${accent === "orange" ? "border-orange-200/18 text-orange-100" : "border-cyan-200/18 text-cyan-100"}`}>{item}</motion.div>)}</div>;
}

function ProductDemo() {
  return <section id="product" className="relative z-10 bg-white/[0.018] py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><motion.div {...fadeUp()} className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Product outputs</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Sales intelligence with zero data entry.</h2><p className="mt-6 text-lg leading-8 text-slate-300">Electroscope turns scattered sales activity into living narratives, meeting prep, daily priorities, and onboarding context so teams can act without rebuilding the deal by hand.</p></motion.div><div className="mt-12 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]"><div className="grid gap-3">{productTabs.map(([title, Icon, desc], i) => <motion.article key={title} {...fadeUp(i * 0.05)} className="rounded-2xl border border-white/10 bg-[#08101d]/82 p-4"><Icon className="size-5 text-cyan-100" /><h3 className="mt-3 font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p></motion.article>)}</div><div className="rounded-3xl border border-cyan-100/18 bg-[#07101d]/88 p-6 shadow-[0_0_80px_rgba(34,211,238,0.12)]"><div className="grid gap-4 md:grid-cols-3">{["Objectives · On track", "Budget · At risk", "Timeline · Medium"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200">{item}<div className="mt-3 h-2 rounded-full bg-cyan-200/30" /></div>)}</div><div className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-red-300/20 bg-red-300/[0.06] p-4 text-sm text-red-100">Risk surfaced: Budget not yet confirmed with CFO.</div><div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/[0.06] p-4 text-sm text-cyan-100">Electroscope insight: CRM tracks stages. Electroscope handles nuance.</div></div></div></div></div></section>;
}

function UseCases() {
  return <section id="use-cases" className="relative z-10 py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><motion.div {...fadeUp()} className="mb-12 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Use cases</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Every revenue team sees the same living context.</h2></motion.div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{useCases.map(([title, Icon, text], i) => <motion.article key={title} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/10 bg-[#0a101c]/76 p-6"><Icon className="size-7 text-cyan-100" /><h3 className="mt-5 text-xl font-semibold text-white">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-300">{text}</p></motion.article>)}</div></div></section>;
}

function ArchitecturePreview() {
  return <section id="architecture-preview" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8"><motion.div {...fadeUp()} className="mb-12 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Architecture</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Capture, reason, and act across the whole deal surface.</h2></motion.div><div className="grid gap-5 lg:grid-cols-3">{architecture.map(([title, Icon, text], i) => <motion.article key={title} {...fadeUp(i * 0.08)} className="rounded-2xl border border-white/10 bg-[#0a111e]/78 p-7"><Icon className="size-8 text-orange-100" /><h3 className="mt-8 text-2xl font-semibold text-white">{title}</h3><p className="mt-4 leading-7 text-slate-300">{text}</p></motion.article>)}</div><Link to="/architecture" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-cyan-200/22 bg-cyan-200/[0.07] px-5 text-sm font-semibold text-cyan-100">Explore architecture<ArrowRight className="size-4" /></Link></section>;
}

function Testimonials() {
  return <section className="relative z-10 bg-white/[0.014] py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><motion.div {...fadeUp()} className="mb-12 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Testimonials</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">What revenue teams are saying</h2></motion.div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{testimonials.map(([quote, name, role], i) => <motion.article key={name} {...fadeUp(i * 0.06)} whileHover={{ y: -5 }} className="rounded-2xl border border-white/10 bg-[#08101d]/82 p-6 shadow-[0_0_42px_rgba(34,211,238,0.055)]"><span className="grid size-10 place-items-center rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-100"><Quote className="size-4" /></span><p className="mt-7 text-base leading-8 text-slate-200">“{quote}”</p><div className="mt-8 border-t border-white/10 pt-5"><p className="font-semibold text-white">{name}</p><p className="mt-1 text-sm text-slate-400">{role}</p></div></motion.article>)}</div></div></section>;
}

function FinalCta() {
  return <section className="relative z-10 px-5 py-24 sm:px-8"><motion.div {...fadeUp()} className="mx-auto max-w-5xl rounded-3xl border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(255,142,62,0.08)_45%,rgba(255,255,255,0.035))] p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.12)] sm:p-14"><CheckCircle2 className="mx-auto size-10 text-cyan-100" /><h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">Stop rebuilding deal context by hand.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Give sales teams a living source of truth that moves as fast as the deal.</p><Link to="/about#contact" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-orange-200 px-5 text-sm font-semibold text-[#160b05]">Book intro call<ArrowRight className="size-4" /></Link></motion.div></section>;
}

function Footer() {
  return <footer className="relative z-10 border-t border-white/8 px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3 text-white"><Radar className="size-5 text-cyan-100" /><span className="font-semibold">Electroscope</span></div><p>Agentic sales intelligence for enterprise revenue teams.</p></div></footer>;
}

createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
