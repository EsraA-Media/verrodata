"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { resolveScheme, resolveGradientBackground, rgba } from "@/components/accentSchemes";

/* ==== Types ==== */
type KPI = { label: string; value: string; trend?: "up" | "down" | "neutral" };

type UseCase = {
  id: string;
  industry: "E-Commerce" | "SaaS" | "Finanzdienstleistungen" | "Versicherungen" | "Reisebuchung";
  headline: string;
  client: string;
  problem: string;
  solution: string;
  kpis: KPI[];
};

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  subline?: string;
  initialFilter?: (typeof INDUSTRY_FILTERS)[number];
};

/* ==== Hooks ==== */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    // @ts-ignore older Safari
    m.addEventListener ? m.addEventListener("change", onChange) : m.addListener(onChange);
    return () => {
      // @ts-ignore older Safari
      m.removeEventListener ? m.removeEventListener("change", onChange) : m.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

/* ==== Data ==== */
const DATA: UseCase[] = [
  {
    id: "uc1",
    industry: "E-Commerce",
    headline: "E-Commerce: ROAS um 285 % gesteigert",
    client: "Kunde: Online-Modehandel, € 8 Mio. Jahresumsatz",
    problem: "Hohe Werbeausgaben – aber 60 % wirkungslos.",
    solution: "Kampagnen-Setup & Budgetsteuerung optimiert, Attribution korrigiert.",
    kpis: [
      { label: "ROAS", value: "+285 %", trend: "up" },
      { label: "CPA", value: "−67 %", trend: "down" },
      { label: "Conversion-Rate", value: "1,4 % → 3,8 %", trend: "up" },
      { label: "Budget-Effizienz", value: "+73 %", trend: "up" },
    ],
  },
  {
    id: "uc2",
    industry: "SaaS",
    headline: "SaaS: Marketing-Performance +156 %",
    client: "Kunde: B2B-SaaS-Plattform, 15.000 Nutzer",
    problem: "Unklar, welche Kanäle wirklich Umsatz bringen.",
    solution: "Transparente Attribution & Kanalbewertung; Fokus auf performante Kanäle.",
    kpis: [
      { label: "Performance", value: "+156 %", trend: "up" },
      { label: "Monatliche Einsparung", value: "€ 12.000", trend: "up" },
      { label: "Qualifizierte Leads", value: "+89 %", trend: "up" },
      { label: "CAC", value: "−43 %", trend: "down" },
      { label: "ROI", value: "3,2:1 → 8,7:1", trend: "up" },
    ],
  },
  {
    id: "uc3",
    industry: "Finanzdienstleistungen",
    headline: "Finanzdienstleistungen: Conversion +312 %",
    client: "Kunde: Online-Bank, 280.000 Kunden",
    problem: "Generische E-Mails blieben wirkungslos.",
    solution: "Personalisierte Journeys, Segmentierung & Trigger-basierte Kommunikation.",
    kpis: [
      { label: "E-Mail-Conversion-Rate", value: "0,8 % → 3,3 % (+312 %)", trend: "up" },
      { label: "Produktabschlüsse", value: "+247 %", trend: "up" },
      { label: "CLV", value: "+€ 1.840 pro Kunde", trend: "up" },
      { label: "ROI", value: "1,9:1 → 7,4:1", trend: "up" },
      { label: "Unsubscribe-Rate", value: "−54 %", trend: "down" },
    ],
  },
  {
    id: "uc4",
    industry: "Versicherungen",
    headline: "Versicherungen: Sales-Zyklus −68 %",
    client: "Kunde: Lebensversicherung, € 120 Mio. Jahresprämien",
    problem: "Zu viele unqualifizierte Leads.",
    solution: "Lead Scoring & Qualifizierung; priorisierte Übergabe an Sales.",
    kpis: [
      { label: "Sales-Zyklus", value: "28 → 9 Tage (−68 %)", trend: "down" },
      { label: "Conversion-Rate", value: "12 % → 31 %", trend: "up" },
      { label: "Produktivität", value: "+189 %", trend: "up" },
      { label: "Kosten pro Abschluss", value: "−€ 420", trend: "down" },
      { label: "Umsatz pro Mitarbeiter", value: "+134 %", trend: "up" },
    ],
  },
  {
    id: "uc5",
    industry: "Reisebuchung",
    headline: "Reisebuchung: Buchungsrate +78 %",
    client: "Kunde: Online-Reiseportal, 3,2 Mio. Besucher/Monat",
    problem: "94 % der Besucher buchten nicht.",
    solution: "Gezieltes Retargeting entlang der Journey & Angebots-Personalisierung.",
    kpis: [
      { label: "Retargeting-CR", value: "2,1 % → 3,7 % (+78 %)", trend: "up" },
      { label: "Ø Buchungswert", value: "+€ 89", trend: "up" },
      { label: "ROAS", value: "+156 %", trend: "up" },
      { label: "Rückkehrrate", value: "+43 %", trend: "up" },
      { label: "Buchungsvolumen", value: "+24 %", trend: "up" },
    ],
  },
];

// const INDUSTRY_FILTERS: Array<UseCase["industry"] | "Alle"> = [
//   "Alle",
//   "E-Commerce",
//   "SaaS",
//   "Finanzdienstleistungen",
//   "Versicherungen",
//   "Reisebuchung",
// ];

const MAX_VISIBLE_KPIS = 3;
const GOOD_WHEN_DOWN = new Set<string>([
  "CPA",
  "CAC",
  "Unsubscribe-Rate",
  "Sales-Zyklus",
  "Kosten pro Abschluss",
  "Churn",
  "Bounce Rate",
  "Refund Rate",
  "Return Rate",
  "Abbruchrate",
  "Time to Close",
]);

/* ==== UI Bits ==== */
function KPITag({ k }: { k: KPI }) {
  const visualClass = k.trend === "down" && GOOD_WHEN_DOWN.has(k.label) ? "goodDown" : (k.trend ?? "neutral");
  return (
    <div className="kpi">
      <div className={`val ${visualClass}`}>{k.value}</div>
      <div className="lab">{k.label}</div>

      <style jsx>{`
        .kpi {
          width: 100%;
          min-width: 0;
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 76px;
          box-sizing: border-box;
        }
        .val {
          font-size: clamp(14px, 2.2vw, 18px);
          font-weight: 700;
          letter-spacing: 0.2px;
          margin-bottom: 4px;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: center;
          line-height: 1.15;
        }
        .val.up { color: #7ce38b; }
        .val.down { color: #ff8b8b; }
        .val.goodDown { color: var(--primary); }
        .val.neutral { color: #e5e7eb; }
        .lab {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.25;
          max-width: 100%;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
      `}</style>
    </div>
  );
}

function FillerCard() {
  return (
    <div className="filler vd-card">
      <span>Weitere Case demnächst…</span>
      <style jsx>{`
        .filler {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          padding: 16px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.65);
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

function UseCaseCard({ uc, tintPrimary }: { uc: UseCase; tintPrimary: string }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? uc.kpis : uc.kpis.slice(0, MAX_VISIBLE_KPIS);
  const canToggle = uc.kpis.length > MAX_VISIBLE_KPIS;

  return (
    <article
      className="card"
      tabIndex={0}
      style={{
        borderColor: rgba(tintPrimary, 0.12),
        boxShadow: `0 10px 28px ${rgba(tintPrimary, 0.22)}`,
      }}
    >
      <div className="pill">{uc.industry}</div>
      <h3 className="headline">{uc.headline}</h3>
      <p className="client">
        <em>{uc.client}</em>
      </p>

      <div className="ps">
        <div className="row">
          <span className="tag">Problem</span>
          <p className="text">{uc.problem}</p>
        </div>
        <div className="row">
          <span className="tag">Lösung</span>
          <p className="text">{uc.solution}</p>
        </div>
      </div>

      <div className="kpis">{visible.map((k, i) => <KPITag key={i} k={k} />)}</div>

      {canToggle && (
        <button className="more" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
        </button>
      )}

      <style jsx>{`
        .card {
          height: 100%;
          display: grid;
          grid-template-rows: auto auto auto 1fr auto auto;
          row-gap: 10px;
          padding: clamp(16px, 2vw, 20px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          color: #fff;
          backdrop-filter: saturate(140%) blur(6px);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .card:focus { outline: 2px solid rgba(255,255,255,.35); outline-offset: 2px; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,.34); }

        .pill {
          align-self: flex-start;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 999px;
          color: #111;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
        }

        .headline {
          color: #fff; /* ← მკაფიოდ თეთრი */
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(20px, 4vw, 28px);
          font-weight: 500;
          line-height: 1.25;
          margin: 0;
        }

        .client {
          margin: 0;
          color: rgba(255,255,255,.85);
          font-size: clamp(16px, 2.2vw, 18px);
          line-height: 1.6;
          font-weight: 400;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .ps { display: grid; gap: 8px; }
        .row { display: grid; grid-template-columns: auto 1fr; align-items: start; column-gap: 10px; }
        .tag {
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          color: rgba(255,255,255,.9);
          border: 1px solid rgba(255,255,255,.12);
          width: max-content;
          white-space: nowrap;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }
        .text {
          margin: 0;
          font-size: clamp(16px, 2.2vw, 18px);
          line-height: 1.6;
          font-weight: 400;
          color: #d1d5db;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .kpis { display: grid; gap: 10px; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; }
        @media (max-width: 1279px) { .kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 420px) { .kpis { grid-template-columns: 1fr; } }

        .more {
          justify-self: start;
          margin-top: 2px;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid color-mix(in oklab, var(--primary), #000 10%);
          background: rgba(255,255,255,.06);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: filter .15s ease, transform .1s ease;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }
        .more:hover { filter: brightness(1.08); transform: translateY(-1px); }
      `}</style>
    </article>
  );
}

/* ==== helper to duplicate cards to fill the last row ==== */
function fillToFullRows<T extends { id: string }>(items: T[], cols: number): T[] {
  if (cols <= 0 || items.length === 0) return items;
  const remainder = items.length % cols;
  if (remainder === 0) return items;
  const need = cols - remainder;
  const clones: T[] = [];
  for (let i = 0; i < need; i++) {
    const src = items[i % items.length];
    clones.push({ ...(src as any), id: `${src.id}__dup${i + 1}` });
  }
  return items.concat(clones);
}

/* ==== Main component ==== */
const INDUSTRY_FILTERS: Array<UseCase["industry"] | "Alle"> = [
  "Alle",
  "E-Commerce",
  "SaaS",
  "Finanzdienstleistungen",
  "Versicherungen",
  "Reisebuchung",
];

export default function UseCases({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  title = "Use Cases",
  subline = "Digitales Marketing – Branchenspezifische Erfolgsgeschichten",
  initialFilter = "Alle",
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const themedBg = resolveGradientBackground(colorScheme, scheme);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1279px)");
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [filter, setFilter] = useState<(typeof INDUSTRY_FILTERS)[number]>(initialFilter);

  const filtered = useMemo(() => (filter === "Alle" ? DATA : DATA.filter((d) => d.industry === filter)), [filter]);
  const cols = isMobile ? 1 : isTablet ? 2 : 3;
  const gridItems = useMemo(() => fillToFullRows(filtered, cols), [filtered, cols]);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isMobile || !rowRef.current) return;
    const el = rowRef.current;
    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / (w * 0.88));
      setActiveSlide(Math.max(0, Math.min(i, filtered.length - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isMobile, filtered.length]);

  useEffect(() => {
    if (!isMobile || paused || prefersReduced || filtered.length <= 1) return;
    const el = rowRef.current;
    if (!el) return;
    const id = window.setInterval(() => {
      const next = (activeSlide + 1) % filtered.length;
      setActiveSlide(next);
      const cardW = el.clientWidth * 0.88;
      el.scrollTo({ left: next * cardW, behavior: "smooth" });
    }, 6000);
    return () => window.clearInterval(id);
  }, [isMobile, paused, prefersReduced, activeSlide, filtered.length]);

  return (
    <section
      className="ucWrap"
      aria-label="Use Cases"
      style={
        {
          background: themedBg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="ucInner container">
        <h2 className="title t-h1">{title}</h2>
        <p className="subline t-emphasis-lg">{subline}</p>

        <div className="filters" role="tablist" aria-label="Industrien">
          {INDUSTRY_FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`filter ${filter === f ? "on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {!isMobile && (
          <div className="grid" aria-live="polite">
            {gridItems.map((uc) => (
              <UseCaseCard key={uc.id} uc={uc} tintPrimary={scheme.primary} />
            ))}
          </div>
        )}

        {isMobile && (
          <>
            <div
              className="row"
              ref={rowRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Use Cases Karussell"
              aria-live="polite"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              {filtered.map((uc) => (
                <div key={uc.id} className="slide">
                  <UseCaseCard uc={uc} tintPrimary={scheme.primary} />
                </div>
              ))}
            </div>
            {filtered.length > 1 && (
              <div className="dots" aria-hidden="true">
                {filtered.map((_, i) => (
                  <span key={i} className={`dot ${i === activeSlide ? "on" : ""}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .ucWrap { --y: clamp(80px, 10vw, 140px); width: 100%; overflow: hidden; padding: calc(var(--y) + 28px) 0 var(--y); color: #fff; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
        .ucInner { min-width: 0; }

        .title {
          text-align: center;
          margin: 0 0 12px;
          letter-spacing: -0.01em;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-weight: 700;
        }
        .subline {
          text-align: center;
          margin: 0 0 20px;
          color: rgba(255, 255, 255, 0.85);
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(16px, 2vw, 24px); align-items: stretch; }
        @media (max-width: 1279px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 767px) { .grid { grid-template-columns: 1fr; } }

        .row { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding: 4px 16px; scroll-padding-inline: 16px; }
        .row::-webkit-scrollbar { display: none; }
        .slide { flex: 0 0 88%; scroll-snap-align: start; }

        .filters { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 18px; }
        .filter {
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,.35);
          background: transparent;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          transition: all .18s ease;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }
        .filter:hover { border-color: #fff; transform: translateY(-1px); }
        .filter.on { background: linear-gradient(135deg, var(--primary), var(--secondary)); border-color: transparent; color: #111; }

        .dots { display: flex; justify-content: center; gap: 6px; margin-top: 12px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.35); }
        .dot.on { background: #fff; }
      `}</style>
    </section>
  );
}
