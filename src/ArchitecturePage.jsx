import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Blocks, Calendar, CircleDotDashed, Database, MessageSquare, Radar, ShieldCheck, Workflow } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/#product" },
  { label: "Architecture", href: "/architecture" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/about#contact" },
];

const stages = [
  ["Capture", Radar, "Ingest calls, chats, emails, documents, calendar activity, and CRM changes across the full enterprise sales motion.", "Connect to the places where work already happens and preserve deal evidence as it changes."],
  ["Reason", CircleDotDashed, "Turn scattered evidence into living deal narratives, risk models, stakeholder maps, and forecast-quality signals.", "Resolve fragments into entities, relationships, intent, risk, and role-specific context."],
  ["Act", Workflow, "Recommend next moves, draft CRM updates, escalate risk, and keep teams aligned while opportunities are still changing.", "Surface the next best action inside the workflows where revenue teams already operate."],
];

const integrations = [
  ["CRMs", Database, ["Attio", "HubSpot · Coming Soon", "Salesforce · Coming Soon", "Monday.com · Coming Soon"]],
  ["Transcriptions", MessageSquare, ["Krisp", "Gong.io · Coming Soon", "Webex · Coming Soon", "Zoom · Coming Soon"]],
  ["Calendaring", Calendar, ["Microsoft 365", "Google · Coming Soon"]],
  ["External Data", Blocks, ["LinkedIn"]],
];

const sources = [
  ["Systems", "Opportunity state, activities, call intelligence, and revenue records.", [["SF", "Salesforce", "sky"], ["G", "Gong", "violet"]]],
  ["Documents", "Decks, scopes, security packets, proposals, and collaboration files.", [["O", "Microsoft Office", "orange"], ["G", "Google Workspace", "emerald"]]],
  ["Communication", "Meetings, stakeholder threads, internal alignment, and side-channel context.", [["Z", "Zoom", "blue"], ["S", "Slack", "fuchsia"]]],
  ["Email", "Buyer replies, approval trails, pricing questions, and follow-up gaps.", [["O", "Outlook", "cyan"], ["M", "Gmail", "red"]]],
];

const modules = ["Extraction pipeline", "Core entities", "Data stacking", "AI agent", "Relationship graph", "Integrations"];
const answers = [
  ["Account Manager", "Prep me for tomorrow’s CIO meeting.", "Meeting prep", "Last conversation, stakeholder priorities, open risks, and next move."],
  ["Engineer", "What success criteria did the customer confirm?", "Technical context", "Requirements, blockers, architecture notes, and validation criteria."],
  ["Sales Ops", "What changed since the last forecast commit?", "Forecast signal", "Budget movement, procurement risk, stakeholder changes, and confidence shifts."],
];

function fadeUp(delay = 0) {
  return { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } };
}

function SignalBackground({ reduceMotion }) {
  return <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(255,142,62,0.12),transparent_30%),linear-gradient(180deg,#07101f_0%,#05070d_48%,#030407_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />{Array.from({ length: 30 }, (_, i) => <motion.span key={i} className="absolute size-1 rounded-full bg-cyan-200/60 shadow-[0_0_14px_rgba(92,225,255,0.9)]" style={{ left: `${(i * 31) % 100}%`, top: `${(i * 43) % 100}%` }} animate={reduceMotion ? undefined : { opacity: [0.16, 0.75, 0.22], scale: [0.8, 1.5, 0.9] }} transition={{ duration: 4.8, delay: (i % 7) * 0.42, repeat: Infinity, ease: "easeInOut" }} />)}</div>;
}

function Navbar() {
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#05070d]/74 backdrop-blur-xl"><nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"><Link to="/" className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_30px_rgba(36,221,255,0.18)]"><Radar className="size-5 text-cyan-200" /></span><span className="font-semibold tracking-wide text-white">Electroscope</span></Link><div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">{navItems.map((item) => <Link key={item.label} to={item.href} className="transition hover:text-cyan-100">{item.label}</Link>)}</div><Link to="/about#contact" className="inline-flex h-10 items-center gap-2 rounded-md border border-orange-300/35 bg-orange-300/10 px-4 text-sm font-medium text-orange-100">Book intro call<ArrowRight className="size-4" /></Link></nav></header>;
}

function Footer() {
  return <footer className="relative z-10 border-t border-white/8 px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3 text-white"><Radar className="size-5 text-cyan-100" /><span className="font-semibold">Electroscope</span></div><p>Agentic sales intelligence for enterprise revenue teams.</p></div></footer>;
}

function Badge({ mark, name }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/[0.045] px-2.5 py-1.5 text-xs font-semibold text-slate-100"><span className="grid size-5 place-items-center rounded-full bg-cyan-200/10 text-[10px] text-cyan-100">{mark}</span>{name}</span>;
}

export default function ArchitecturePage() {
  const reduceMotion = useReducedMotion();
  return <main className="min-h-screen overflow-hidden bg-[#05070d] text-slate-100"><SignalBackground reduceMotion={reduceMotion} /><Navbar />
    <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 lg:pt-36"><motion.div {...fadeUp()} className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Architecture</p><h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">Capture, reason, and act across the whole deal surface.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">Electroscope connects to the tools where enterprise sales work already happens, extracts the signals that matter, and turns them into living deal intelligence your team can act on.</p></motion.div></section>
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="grid gap-5 lg:grid-cols-3">{stages.map(([title, Icon, text, detail], i) => <motion.article key={title} {...fadeUp(i * 0.08)} whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-[#09111f]/82 p-7 shadow-[0_0_52px_rgba(34,211,238,0.07)]"><Icon className="size-8 text-orange-100" /><h2 className="mt-8 text-2xl font-semibold text-white">{title}</h2><p className="mt-4 leading-7 text-slate-300">{text}</p><p className="mt-5 rounded-xl border border-cyan-200/14 bg-cyan-200/[0.04] p-4 text-sm leading-6 text-slate-300">{detail}</p></motion.article>)}</div></section>
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8"><motion.div {...fadeUp()} className="mb-10 max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Integrations</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Connect the systems your revenue team already uses.</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Electroscope uses native APIs and MCP-style connectors to access sales activity across your work ecosystem, then enriches deal context without forcing reps into another system.</p></motion.div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{integrations.map(([title, Icon, items], i) => <motion.article key={title} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/10 bg-[#08101d]/86 p-5"><Icon className="size-7 text-cyan-100" /><h3 className="mt-4 text-xl font-semibold text-white">{title}</h3><div className="mt-5 grid gap-3">{items.map((item) => <div key={item} className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2 text-slate-100">{item}</div>)}</div></motion.article>)}</div></section>
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8"><motion.div {...fadeUp()} className="mb-10 max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">System diagram</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">From scattered systems to role-specific answers.</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Electroscope captures signals from systems, documents, communication, and email, then reasons over the account graph so each team member gets the context they need.</p></motion.div><motion.div {...fadeUp(0.08)} className="relative overflow-hidden rounded-3xl border border-cyan-100/16 bg-[#06101d]/72 p-4 shadow-[0_0_90px_rgba(34,211,238,0.12)] sm:p-6"><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50" /><div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.18fr_1fr]"><div className="rounded-2xl border border-white/10 bg-[#07101d]/86 p-5"><h3 className="text-xl font-semibold text-white">Data sources</h3><div className="mt-5 grid gap-3">{sources.map(([title, text, badges]) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="font-semibold text-cyan-50">{title}</p><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p><div className="mt-4 flex flex-wrap gap-2">{badges.map(([mark, name]) => <Badge key={name} mark={mark} name={name} />)}</div></article>)}</div></div><div className="relative rounded-3xl border border-cyan-100/24 bg-cyan-200/[0.06] p-5 shadow-[0_0_88px_rgba(34,211,238,0.16)]"><div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),rgba(255,142,62,0.09)_38%,transparent_65%)] blur-2xl" /><div className="rounded-2xl border border-cyan-100/18 bg-[#07111f]/88 p-4"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Reasoning core</p><h3 className="mt-2 text-2xl font-semibold text-white">Electroscope</h3></div><div className="mt-5 grid gap-3">{modules.map((item, i) => <motion.div key={item} initial={reduceMotion ? false : { opacity: 0, x: -12 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-white/10 bg-[#07101d]/86 px-4 py-3 text-sm font-semibold text-slate-100 hover:border-cyan-100/32">{item}</motion.div>)}</div></div><div className="rounded-2xl border border-white/10 bg-[#07101d]/86 p-5"><h3 className="text-xl font-semibold text-white">Role-specific answers</h3><div className="mt-5 grid gap-3">{answers.map(([role, prompt, label, detail]) => <article key={role} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="font-semibold text-white">{role}</p><p className="mt-2 text-sm leading-6 text-slate-300">“{prompt}”</p><span className="mt-3 inline-flex rounded-full border border-orange-200/24 bg-orange-200/[0.07] px-2.5 py-1 text-xs font-semibold text-orange-100">{label}</span><p className="mt-4 rounded-xl border border-white/8 bg-[#050b14]/72 p-3 text-sm leading-6 text-slate-400">{detail}</p></article>)}</div></div></div></motion.div></section>
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8"><motion.div {...fadeUp()} className="rounded-2xl border border-white/10 bg-white/[0.035] p-7"><ShieldCheck className="size-8 text-cyan-100" /><h2 className="mt-5 text-2xl font-semibold text-white">Built for existing sales workflows.</h2><p className="mt-4 max-w-4xl leading-7 text-slate-300">Electroscope is designed to enrich the systems teams already trust, not replace them. Signals are organized, weighted, and surfaced back into the workflows where sellers, leaders, and operators make decisions.</p></motion.div></section>
    <section className="relative z-10 px-5 py-24 sm:px-8"><motion.div {...fadeUp()} className="mx-auto max-w-5xl rounded-3xl border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(255,142,62,0.08)_45%,rgba(255,255,255,0.035))] p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.12)] sm:p-14"><h2 className="text-3xl font-semibold text-white sm:text-5xl">See how Electroscope fits your revenue stack.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Book an intro call to explore how Electroscope can connect to your sales tools and surface deal intelligence without manual CRM work.</p><Link to="/about#contact" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-orange-200 px-5 text-sm font-semibold text-[#160b05]">Book intro call<ArrowRight className="size-4" /></Link></motion.div></section><Footer /></main>;
}
