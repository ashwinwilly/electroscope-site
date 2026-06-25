import React from "react";
import { CalendarDays, Database, FileText, Headphones, Inbox } from "lucide-react";

const iconPaths = {
  HubSpot:
    "M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z",
  Webex:
    "M21.78 7.376c.512 1.181.032 2.644-1.11 3.106-2.157.888-3-1.295-3-1.295-.236-.55-.727-1.496-1.335-1.496-.204 0-.503 0-.94.844-.229.443-.434 1.185-.616 1.84l-.09.32c-.373-1.587-.821-3.454-1.536-4.816-.195-.38-.42-.74-.673-1.08a5.135 5.135 0 011.743-1.337 4.891 4.891 0 012.112-.463c1.045 0 2.765.338 4.227 2.227.167.206.317.424.448.654.278.441.52.904.726 1.383l.043.113zM.02 8.4C-.15 7.105.8 5.845 1.953 5.755c1.794-.157 2.36 1.385 2.455 1.89l.022.137c.07.44.29 1.838.48 2.744.078.4.244 1.013.353 1.416l.032.114c.11.4.232.799.362 1.193.185.548.399 1.085.641 1.61.47.955.93 1.45 1.367 1.45.203 0 .512 0 .96-.878.283-.59.512-1.208.684-1.845.373 1.598.811 3.128 1.495 4.456.205.406.444.794.715 1.16a5.124 5.124 0 01-1.742 1.338 4.88 4.88 0 01-2.112.461c-1.548 0-3.727-.698-5.339-4.005a22.407 22.407 0 01-1.078-2.824 26.848 26.848 0 01-.693-2.656A48.56 48.56 0 01.02 8.4zm22.047-2.645-.254-.022c.222.392.421.797.597 1.215l.053.113c.322.76.346 1.614.068 2.391a3.079 3.079 0 01-1.552 1.749 2.93 2.93 0 01-1.228.28 3.115 3.115 0 01-.854-.135c-.299 1.182-.768 2.634-1.195 3.511-.427.877-.93 1.451-1.378 1.451-.192 0-.501 0-.95-.877a10.746 10.746 0 01-.683-1.845 38.722 38.722 0 01-.532-2.183c-.406-1.778-.865-3.645-1.655-5.142A8.263 8.263 0 0011.52 4.8a5.136 5.136 0 00-1.748-1.34A4.892 4.892 0 007.654 3c-1.036 0-2.754.338-4.217 2.228.466.223.867.562 1.164.984.305.433.499.933.565 1.458.076.563.256 1.654.47 2.688.021.117.042.228.073.349.126-.34.25-.642.38-.955l.24-.564c.235-.55.726-1.496 1.324-1.496.213 0 .513 0 .95.844.296.606.532 1.239.706 1.89.138.507.276 1.047.394 1.587.04.148.07.296.107.472.427 1.879.875 3.69 1.644 5.187.159.317.34.622.545.911.15.215.31.422.48.62 1.27 1.45 2.733 1.8 3.843 1.8 1.548 0 3.738-.698 5.35-4.006.822-1.7 1.515-4.208 1.772-5.48.256-1.27.449-2.419.534-3.115.04-.307.023-.618-.051-.918-.075-.299-.205-.579-.382-.825a2.247 2.247 0 00-.653-.607 2.143 2.143 0 00-.826-.296z",
  Zoom:
    "M5.033 14.649H.743a.74.74 0 01-.526-1.266L3.19 10.41H1.06A1.06 1.06 0 010 9.35h3.957a.74.74 0 01.525 1.266L1.51 13.59h2.464c.585 0 1.06.475 1.06 1.06zM24 11.338c0-1.14-.927-2.066-2.066-2.066-.61 0-1.158.265-1.537.686a2.061 2.061 0 00-1.536-.686c-1.14 0-2.066.926-2.066 2.066v3.311a1.06 1.06 0 001.06-1.06v-2.251a1.004 1.004 0 012.013 0v2.251c0 .586.474 1.06 1.06 1.06v-3.311a1.004 1.004 0 012.012 0v2.251c0 .586.475 1.06 1.06 1.06zM16.265 12a2.728 2.728 0 11-5.457 0 2.728 2.728 0 015.457 0zm-1.06 0a1.669 1.669 0 10-3.338 0 1.669 1.669 0 003.338 0zm-4.82 0a2.728 2.728 0 11-5.458 0 2.728 2.728 0 015.457 0zm-1.06 0a1.669 1.669 0 10-3.338 0 1.669 1.669 0 003.338 0z",
  Google:
    "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  Gmail:
    "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
};

const pathColors = {
  HubSpot: "#ff7a59",
  Webex: "#30d5c8",
  Zoom: "#2d8cff",
  Google: "#4285f4",
  Gmail: "#ea4335",
};

const genericIcons = {
  CRM: Database,
  Calls: Headphones,
  Inbox,
  Documents: FileText,
  Calendar: CalendarDays,
};

const wordmarks = {
  Attio: { label: "attio", color: "#f4f7fb" },
  Salesforce: { label: "salesforce", color: "#32a8e0", cloud: true },
  "Monday.com": { label: "monday", color: "#f4f7fb", monday: true },
  Krisp: { label: "krisp", color: "#9bffb1" },
  "Gong.io": { label: "GONG", color: "#bda7ff" },
  Gong: { label: "GONG", color: "#bda7ff" },
  LinkedIn: { label: "in", color: "#0a66c2", boxed: true },
  "Microsoft 365": { label: "Microsoft", color: "#f4f7fb", microsoft: true },
  "Microsoft Office": { label: "Office", color: "#f25022", microsoft: true },
  Outlook: { label: "O", color: "#1473e6", boxed: true },
  Slack: { label: "Slack", color: "#f4f7fb", slack: true },
  "Google Workspace": { label: "Workspace", color: "#f4f7fb", google: true },
};

function MicrosoftMark() {
  return (
    <span className="grid size-4 shrink-0 grid-cols-2 gap-[1px]" aria-hidden="true">
      <span className="bg-[#f25022]" />
      <span className="bg-[#7fba00]" />
      <span className="bg-[#00a4ef]" />
      <span className="bg-[#ffb900]" />
    </span>
  );
}

function SlackMark() {
  return (
    <span className="relative size-4 shrink-0" aria-hidden="true">
      <span className="absolute left-[1px] top-[6px] h-[4px] w-[9px] rounded-full bg-[#36c5f0]" />
      <span className="absolute right-[1px] top-[1px] h-[9px] w-[4px] rounded-full bg-[#2eb67d]" />
      <span className="absolute bottom-[1px] right-[1px] h-[4px] w-[9px] rounded-full bg-[#ecb22e]" />
      <span className="absolute bottom-[1px] left-[1px] h-[9px] w-[4px] rounded-full bg-[#e01e5a]" />
    </span>
  );
}

function CompactWordmark({ name, wordmark }) {
  if (wordmark.microsoft) return <MicrosoftMark />;
  if (wordmark.slack) return <SlackMark />;
  if (wordmark.google) {
    return (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill={pathColors.Google} aria-hidden="true">
        <path d={iconPaths.Google} />
      </svg>
    );
  }
  if (wordmark.monday) {
    return (
      <span className="flex shrink-0 items-center gap-[2px]" aria-hidden="true">
        <span className="h-2 w-1.5 -rotate-[28deg] rounded-full bg-[#f62b54]" />
        <span className="h-2 w-1.5 -rotate-[28deg] rounded-full bg-[#ffcb00]" />
        <span className="h-2 w-1.5 -rotate-[28deg] rounded-full bg-[#00c875]" />
      </span>
    );
  }
  if (wordmark.cloud) {
    return (
      <svg viewBox="0 0 24 18" className="h-4 w-5 shrink-0 fill-[#32a8e0]" aria-hidden="true">
        <path d="M7.1 16.2C3.2 16.2 0 13.6 0 10.4 0 7.7 2.2 5.3 5.3 4.7 6.7 1.9 9.8.2 13.2.2c4.3 0 7.9 2.8 8.3 6.5 1.6.9 2.5 2.4 2.5 4.1 0 3-2.8 5.4-6.3 5.4H7.1z" />
      </svg>
    );
  }
  if (wordmark.boxed) {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-[4px] text-[0.68rem] font-bold text-white" style={{ backgroundColor: wordmark.color }}>
        {wordmark.label}
      </span>
    );
  }
  return (
    <span className="max-w-7 truncate text-[0.52rem] font-bold uppercase" style={{ color: wordmark.color }}>
      {name === "Gong" || name === "Gong.io" ? "gong" : wordmark.label}
    </span>
  );
}

export default function BrandLogo({ name, compact = false, className = "" }) {
  const normalized = name === "Gong.io" ? "Gong.io" : name;
  const pathName = normalized === "Google Workspace" ? "Google" : normalized;
  const GenericIcon = genericIcons[normalized];
  const wordmark = wordmarks[normalized];

  if (GenericIcon) {
    return (
      <span className={`inline-flex min-w-0 items-center gap-2 text-cyan-100 ${className}`}>
        <GenericIcon className="size-4 shrink-0" aria-hidden="true" />
        {!compact ? <span className="truncate text-[0.7rem] font-semibold">{name}</span> : null}
      </span>
    );
  }

  if (iconPaths[pathName]) {
    return (
      <span className={`inline-flex min-w-0 items-center gap-2 ${className}`}>
        <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill={pathColors[pathName]} aria-hidden="true">
          <path d={iconPaths[pathName]} />
        </svg>
        {!compact ? <span className="truncate text-[0.7rem] font-semibold text-slate-100">{name}</span> : null}
      </span>
    );
  }

  if (wordmark) {
    if (compact) {
      return (
        <span className={`inline-flex items-center justify-center ${className}`}>
          <CompactWordmark name={normalized} wordmark={wordmark} />
        </span>
      );
    }
    return (
      <span className={`inline-flex min-w-0 items-center gap-1.5 ${className}`}>
        {wordmark.microsoft ? <MicrosoftMark /> : null}
        {wordmark.slack ? <SlackMark /> : null}
        {wordmark.google ? (
          <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill={pathColors.Google} aria-hidden="true">
            <path d={iconPaths.Google} />
          </svg>
        ) : null}
        {wordmark.monday ? (
          <span className="flex shrink-0 items-center gap-[2px]" aria-hidden="true">
            <span className="h-2 w-1.5 -rotate-[28deg] rounded-full bg-[#f62b54]" />
            <span className="h-2 w-1.5 -rotate-[28deg] rounded-full bg-[#ffcb00]" />
            <span className="h-2 w-1.5 -rotate-[28deg] rounded-full bg-[#00c875]" />
          </span>
        ) : null}
        {wordmark.cloud ? (
          <span className="rounded-full bg-[#32a8e0]/16 px-1.5 py-0.5 text-[0.56rem] font-bold text-[#68c9ee]" aria-hidden="true">
            cloud
          </span>
        ) : null}
        <span
          className={
            wordmark.boxed
              ? "grid size-5 shrink-0 place-items-center rounded-[4px] text-[0.68rem] font-bold text-white"
              : "truncate text-[0.68rem] font-bold"
          }
          style={{ color: wordmark.boxed ? "#fff" : wordmark.color, backgroundColor: wordmark.boxed ? wordmark.color : undefined }}
        >
          {wordmark.label}
        </span>
      </span>
    );
  }

  return <span className={`truncate text-[0.7rem] font-semibold text-slate-100 ${className}`}>{name}</span>;
}
