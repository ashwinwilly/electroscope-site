import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileCheck2, Fingerprint, Menu, Network, Radar, Scale, ShieldCheck, X } from "lucide-react";
import SiteFooter from "./SiteFooter.jsx";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/#product" },
  { label: "Architecture", href: "/architecture" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/about#contact" },
];

const securityCards = [
  ["Workflow-aware access", "Deal intelligence should respect team, account, and role boundaries.", Fingerprint],
  ["Source-backed outputs", "Insights and recommendations are designed to trace back to the calls, documents, CRM changes, or account activity that informed them.", FileCheck2],
  ["Built for existing systems", "Electroscope enriches the tools revenue teams already use instead of forcing teams into another system.", Network],
  ["Enterprise data mindset", "The product is designed around sensitive sales context, account history, and customer conversations.", ShieldCheck],
];

const privacyItems = [
  ["Business contact information", "Information submitted by prospective customers, users, and account contacts."],
  ["Connected workflow data", "Authorized data from calls, documents, CRM activity, and other connected business systems."],
  ["Product usage information", "Operational information used to support, secure, and improve the product experience."],
  ["Customer-controlled systems", "Customers decide which authorized systems and workflows they connect to Electroscope."],
];

const termsItems = [
  ["Acceptance and scope", "By accessing this website, you agree to these Terms of Use. These terms apply to the public Electroscope website and related materials. Any paid product access, pilot, or customer deployment will be governed by a separate written agreement."],
  ["Permitted use", "You may use this website to learn about Electroscope, evaluate our services, contact our team, and engage with us for legitimate business purposes. You must comply with applicable laws and respect the rights of others."],
  ["Prohibited conduct", "You may not interfere with the website, attempt unauthorized access, introduce malicious code, scrape the site in a way that disrupts its operation, misrepresent your identity, or use the website to violate another person’s rights."],
  ["Product and AI-assisted information", "Website materials, demonstrations, recommendations, and AI-assisted outputs are provided for informational and evaluation purposes. They may be incomplete or contain errors and should be reviewed by qualified people before being used for material business, forecasting, legal, financial, or operational decisions."],
  ["Connected data and third-party services", "You are responsible for ensuring that you have the rights and permissions needed to submit information or connect business systems. Third-party products and services are governed by their own terms, availability, and privacy practices."],
  ["Intellectual property", "The Electroscope name, product, software, visual design, and website content are owned by Electroscope or its licensors and are protected by applicable intellectual property laws. These terms do not grant permission to copy, modify, distribute, or commercially exploit them except as expressly authorized in writing."],
  ["Feedback", "If you share product feedback or suggestions, you permit Electroscope to use them to evaluate and improve its products and services without creating an obligation to compensate you or adopt the suggestion."],
  ["Availability and changes", "We may update, suspend, or discontinue parts of the website and may revise these terms as the product and company evolve. Updated terms will be posted here with a revised effective date."],
  ["Disclaimers and liability", "The website is provided on an “as available” basis without guarantees that it will always be uninterrupted, secure, or error-free. To the fullest extent permitted by law, Electroscope is not responsible for indirect, incidental, special, consequential, or punitive damages arising from use of this public website."],
  ["Contact", "Questions about these Terms of Use can be submitted through the Electroscope contact form. We welcome the opportunity to clarify how these website terms relate to a prospective customer agreement or deployment."],
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 18, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function TrustNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isActive = (item) => {
    if (item.href === "/") return location.pathname === "/" && !location.hash;
    if (item.href.startsWith("/#")) return location.pathname === "/" && location.hash === item.href.slice(1);
    return location.pathname === item.href.split("#")[0];
  };

  return (
    <motion.header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition duration-300 ${scrolled ? "border-cyan-100/14 bg-[#05070d]/86 shadow-[0_14px_52px_rgba(0,0,0,0.34)]" : "border-white/8 bg-[#05070d]/74"}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Electroscope home">
          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_30px_rgba(36,221,255,0.18)]"><Radar className="size-5 text-cyan-200" /></span>
          <span className="text-sm font-semibold tracking-wide text-white min-[390px]:text-base">Electroscope</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className={`relative transition hover:text-cyan-100 ${isActive(item) ? "text-cyan-100" : ""}`}>
              {item.label}
              {isActive(item) ? <span className="absolute -bottom-2 left-1/2 h-px w-5 -translate-x-1/2 bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.9)]" /> : null}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/about#contact" className="group inline-flex h-10 items-center gap-1.5 rounded-md border border-orange-300/35 bg-orange-300/10 px-2.5 text-xs font-medium text-orange-100 transition hover:border-orange-200/70 hover:bg-orange-300/16 sm:px-4 sm:text-sm">
            Book intro call <ArrowRight className="hidden size-4 sm:block" />
          </Link>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-slate-100 md:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-white/8 bg-[#05070d]/96 px-4 py-3 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/[0.045] hover:text-cyan-100">{item.label}</Link>)}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function TrustBackground({ reduceMotion }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_84%_22%,rgba(255,142,62,0.07),transparent_28%),linear-gradient(180deg,#07101b_0%,#05070d_52%,#030407_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
      {Array.from({ length: 14 }, (_, index) => (
        <motion.span key={index} className="absolute size-1 rounded-full bg-cyan-200/45" style={{ left: `${(index * 37) % 100}%`, top: `${(index * 47) % 100}%` }} animate={reduceMotion ? undefined : { opacity: [0.12, 0.42, 0.14] }} transition={{ duration: 5.8, delay: (index % 6) * 0.55, repeat: Infinity }} />
      ))}
    </div>
  );
}

export default function TrustPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <TrustBackground reduceMotion={reduceMotion} />
      <TrustNavbar />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 lg:pt-36">
        <motion.div {...fadeUp()} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Trust</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">Trust, security, and responsible data handling.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">Electroscope is designed for revenue teams working with sensitive customer context. Our goal is to make deal intelligence useful, source-backed, and aligned with the workflows teams already trust.</p>
        </motion.div>
      </section>

      <section id="security" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8">
        <motion.div {...fadeUp()} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">Security</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Security</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">Electroscope is being built with careful access, traceability, and enterprise data handling in mind. Security practices will continue to mature alongside the product and customer requirements.</p>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {securityCards.map(([title, text, Icon], index) => (
            <motion.article key={title} {...fadeUp(index * 0.06)} className="rounded-2xl border border-white/10 bg-[#08101d]/82 p-6 shadow-[0_0_42px_rgba(34,211,238,0.05)]">
              <Icon className="size-7 text-cyan-100" /><h3 className="mt-5 text-xl font-semibold text-white">{title}</h3><p className="mt-3 leading-7 text-slate-300">{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="privacy" className="relative z-10 scroll-mt-28 border-y border-white/8 bg-white/[0.018] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp()} className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Privacy</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Privacy</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">Electroscope uses submitted business information to provide and improve its services, respond to inquiries, support customer workflows, and communicate with prospective customers. We do not sell personal information to advertisers. Customers should only connect systems and data they are authorized to use.</p>
          </motion.div>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {privacyItems.map(([title, text], index) => (
              <motion.article key={title} {...fadeUp(index * 0.05)} className="flex gap-4 rounded-xl border border-white/10 bg-[#07101d]/76 p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cyan-100" /><div><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="terms" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8">
        <motion.div {...fadeUp()} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">Terms</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Terms of Use</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">These Terms of Use govern access to the public Electroscope website and its materials. Product subscriptions, pilots, integrations, data processing, service levels, and customer deployments are governed by the applicable written agreement between Electroscope and the customer.</p>
          <p className="mt-4 text-sm font-medium text-slate-500">Effective June 25, 2026</p>
        </motion.div>
        <motion.div {...fadeUp(0.08)} className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#08101d]/82">
          {termsItems.map(([title, text], index) => <div key={title} className={`grid gap-2 p-5 sm:grid-cols-[0.34fr_1fr] sm:gap-8 sm:p-6 ${index ? "border-t border-white/8" : ""}`}><h3 className="font-semibold text-white">{title}</h3><p className="text-sm leading-7 text-slate-400">{text}</p></div>)}
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="mt-8 flex gap-3 rounded-xl border border-orange-200/16 bg-orange-200/[0.045] p-5 text-sm leading-7 text-slate-300">
          <Scale className="mt-1 size-5 shrink-0 text-orange-100" /><p>These terms may be updated as Electroscope’s website, products, policies, and business practices evolve. Material updates will be reflected on this page with a revised effective date.</p>
        </motion.div>
      </section>

      <section className="relative z-10 px-5 py-24 sm:px-8">
        <motion.div {...fadeUp()} className="mx-auto max-w-5xl rounded-3xl border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.09),rgba(255,142,62,0.06)_48%,rgba(255,255,255,0.025))] p-8 text-center shadow-[0_0_70px_rgba(34,211,238,0.09)] sm:p-14">
          <h2 className="text-3xl font-semibold text-white sm:text-5xl">Have questions about trust or deployment?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Book an intro call to discuss how Electroscope fits into your team’s revenue workflow.</p>
          <Link to="/about#contact" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-orange-200 px-5 text-sm font-semibold text-[#160b05] transition hover:bg-orange-100">Book intro call <ArrowRight className="size-4" /></Link>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
