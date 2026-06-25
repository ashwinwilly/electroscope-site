import React from "react";
import { Link } from "react-router-dom";
import { Radar } from "lucide-react";

const columns = [
  { title: "Product", links: [["Product", "/#product"], ["Use Cases", "/use-cases"], ["Architecture", "/architecture"], ["Integrations", "/architecture#integrations"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/about#contact"], ["LinkedIn", "https://www.linkedin.com/company/electroscopeai/"]] },
  { title: "Trust", links: [["Security", "/trust#security"], ["Privacy", "/trust#privacy"], ["Terms", "/trust#terms"]] },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#05070d] px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <Link to="/" className="flex w-fit items-center gap-3 text-white" aria-label="Electroscope home">
            <span className="grid size-9 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10">
              <Radar className="size-5 text-cyan-100" />
            </span>
            <span className="font-semibold">Electroscope</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">Agentic sales intelligence for enterprise revenue teams that need living deal context without manual CRM work.</p>
          <p className="mt-6 text-xs text-slate-600">© 2026 Electroscope. All rights reserved.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{column.title}</h3>
              <div className="mt-4 grid gap-3">
                {column.links.map(([label, href]) =>
                  href.startsWith("http") ? (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-fit text-sm text-slate-500 transition hover:text-cyan-100">{label}</a>
                  ) : (
                    <Link key={label} to={href} className="w-fit text-sm text-slate-500 transition hover:text-cyan-100">{label}</Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
