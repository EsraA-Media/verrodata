"use client";

import React from "react";
import {
  resolveScheme,
  resolveGradientBackground,
  rgba,
} from "@/components/accentSchemes";

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";
type Logo = { name: string; url: string };

const BASE_LOGOS: Logo[] = [
  { name: "DB", url: "https://i.imgur.com/TcdLCGp.png" },
  { name: "ALDI", url: "https://i.imgur.com/3klSyj4.png" },
  { name: "Audi", url: "https://i.imgur.com/PMUju4y.png" },
  { name: "Deutsche Post", url: "https://i.imgur.com/zEV10Sq.png" },
  { name: "DOUGLAS", url: "https://i.imgur.com/drFt0wj.png" },
  { name: "Boehringer", url: "https://i.imgur.com/Dy3yNgh.png" },
  { name: "RTL", url: "https://i.imgur.com/85Fpdrf.png" },
  { name: "American Express", url: "https://i.imgur.com/X0AAxhj.png" },
];

function toNine(list: Logo[]) {
  const out = [...list];
  while (out.length < 9) out.push(out[out.length % list.length]);
  return out.slice(0, 9);
}
const LOGOS = toNine(BASE_LOGOS);

const SIZE_OVERRIDES_PX: Record<string, number> = {
  DOUGLAS: 25,
};

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;

  showHeader?: boolean;
  title?: string;
  subtitle?: string;

  useSectionBackground?: boolean;
};

export default function ClientLogosWall({
  colorScheme = "purple",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",

  showHeader = false,
  title = "Über 123 Marken vertrauen auf Verrodata – und skalieren schneller.",
  subtitle = "",

  useSectionBackground = true,
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const sectionBg = useSectionBackground
    ? resolveGradientBackground(colorScheme, scheme)
    : "transparent";

  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='36' viewBox='0 0 160 36'>
        <rect width='160' height='36' rx='8' fill='rgba(255,255,255,0.06)'/>
        <text x='80' y='23' text-anchor='middle' font-family='Sora, system-ui' font-size='14' fill='#9CA3AF'>LOGO</text>
      </svg>`
    );

  return (
    <section
      className="logosSec"
      style={
        {
          background: sectionBg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="container">
        {showHeader && (
          <header className="hdr">
            <h2 className="ttl">{title}</h2>
            {subtitle ? <p className="sub">{subtitle}</p> : null}
          </header>
        )}

        <div
          className="frame"
          style={{
            borderColor: rgba(scheme.primary, 0.08),
            boxShadow: `0 16px 40px ${rgba(scheme.primary, 0.18)}`,
          }}
        >
          <ul className="grid no-grid-in-logos" aria-label="Client logos">
            {LOGOS.map((l, i) => {
              const customHeight = SIZE_OVERRIDES_PX[l.name];
              return (
                <li key={`${l.name}-${i}`} className="cell">
                  <img
                    src={l.url}
                    alt={l.name}
                    loading="lazy"
                    style={customHeight ? { height: customHeight } : undefined}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.src !== fallback) img.src = fallback;
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .logosSec {
          width: 100%;
          padding: clamp(48px, 7vw, 96px) 0;
          color: #e5e7eb;
          position: relative;
        }
        .container {
          width: min(1200px, 96%);
          margin: 0 auto;
        }

        /* (ჰედერი default-ად არ ჩანს) */
        .hdr {
          text-align: center;
          margin-bottom: clamp(18px, 3vw, 28px);
        }
        .ttl {
          margin: 0;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.25;
          font-size: clamp(20px, 3vw, 26px);
          color: #e5e7eb;
        }
        .sub {
          margin: 8px 0 0 0;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(13px, 2vw, 16px);
          color: #9ca3af;
        }

        .frame {
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
          background: #0a0d12;
        }

        /* ✅ Desktop: 3×3 */
        .grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .no-grid-in-logos {
          gap: 0 !important;
        }

        .cell {
          display: grid;
          place-items: center;
          padding: 14px 12px;
          min-height: 120px;
          background: rgba(255, 255, 255, 0.02);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        /* პირველი რიგი (3 ცალი) */
        .cell:nth-child(-n + 3) {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        /* პირველი სვეტი (ყოველ მესამე + 1) */
        .cell:nth-child(3n + 1) {
          border-left: 1px solid rgba(255, 255, 255, 0.06);
        }

        .cell img {
          max-width: clamp(120px, 13vw, 220px);
          max-height: 45px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(1) contrast(0.95) brightness(0.9);
          opacity: 0.9;
          transform: none;
          transition: none !important;
          pointer-events: none;
        }
        .cell:hover img {
          opacity: 0.9 !important;
          transform: none !important;
          filter: grayscale(1) contrast(0.95) brightness(0.9) !important;
        }

        @media (max-width: 1024px) {
          .cell { min-height: 110px; }
        }
        @media (max-width: 760px) {
          /* მაინც 3 სვეტი, რომ 3×3 პროპორცია შენარჩუნდეს */
          .grid { grid-template-columns: repeat(3, 1fr); }
          .cell { min-height: 96px; }
          .cell img { max-height: 40px; }
          .cell:nth-child(-n + 3) { border-top: 1px solid rgba(255, 255, 255, 0.06); }
          .cell:nth-child(3n + 1) { border-left: 1px solid rgba(255, 255, 255, 0.06); }
        }
        @media (max-width: 520px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
          .cell { min-height: 88px; }
          .cell img { max-height: 36px; }
          .cell:nth-child(-n + 2) { border-top: 1px solid rgba(255, 255, 255, 0.06); }
          .cell:nth-child(2n + 1) { border-left: 1px solid rgba(255, 255, 255, 0.06); }
        }
      `}</style>
    </section>
  );
}
