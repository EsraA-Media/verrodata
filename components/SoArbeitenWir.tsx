"use client";

import * as React from "react";
import "./soArbeiten.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { resolveScheme, resolveGradientBackground } from "@/components/accentSchemes" 

type Step = {
  label: string;
  icon: "search" | "wrench" | "trending-up";
  desc?: string;
};

const DEFAULT_STEPS: Step[] = [
  {
    label: "Analyse",
    icon: "search",
    desc: "Wir prüfen Ihr aktuelles Tracking, Ihre Datenflüsse und Kampagnen-Setups – und zeigen exakt, wo Potenziale verschenkt werden.",
  },
  {
    label: "Umsetzung",
    icon: "wrench",
    desc: "Wir bauen eine saubere Tracking- und Datenstruktur, die sofort einsatzbereit ist und alle Kanäle verbindet.",
  },
  {
    label: "Optimierung",
    icon: "trending-up",
    desc: "Wir steigern Ihre Conversions und Effizienz durch laufende Tests, klare Reports und datenbasierte Entscheidungen.",
  },
];

function Icon({
  name,
  size = 26,
  strokeWidth = 1.9,
}: {
  name: Step["icon"];
  size?: number;
  strokeWidth?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "search")
    return (
      <svg {...common} aria-hidden>
        <circle cx="11" cy="11" r="6" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  if (name === "wrench")
    return (
      <svg {...common} aria-hidden>
        <path d="M14 7a5 5 0 1 1-7 7L3 18l3-4a5 5 0 0 1 8-7Z" />
        <circle cx="14.5" cy="5.5" r="1" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden>
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="21 7 21 13 15 13" />
    </svg>
  );
}

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  titleText?: string;
  step1Label?: string;
  step1Desc?: string;
  step2Label?: string;
  step2Desc?: string;
  step3Label?: string;
  step3Desc?: string;
};

export default function SoArbeitenWir({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  titleText = "So arbeiten wir",
  step1Label,
  step1Desc,
  step2Label,
  step2Desc,
  step3Label,
  step3Desc,
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const themedBg = resolveGradientBackground(colorScheme, scheme);

  const steps: Step[] = [
    {
      ...DEFAULT_STEPS[0],
      label: step1Label ?? DEFAULT_STEPS[0].label,
      desc: step1Desc ?? DEFAULT_STEPS[0].desc,
    },
    {
      ...DEFAULT_STEPS[1],
      label: step2Label ?? DEFAULT_STEPS[1].label,
      desc: step2Desc ?? DEFAULT_STEPS[1].desc,
    },
    {
      ...DEFAULT_STEPS[2],
      label: step3Label ?? DEFAULT_STEPS[2].label,
      desc: step3Desc ?? DEFAULT_STEPS[2].desc,
    },
  ];

  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top >= vh * 0.9) return setProgress(0);
      if (r.bottom <= vh * 0.1) return setProgress(1);
      const start = Math.min(vh, Math.max(0, vh - r.top));
      const total = r.height + vh * 0.25;
      setProgress(Math.max(0, Math.min(start / total, 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const isActive = (i: number) => progress >= (i + 1) / steps.length - 0.001;

  return (
    <section
      className="wrap"
      style={
        {
          background: themedBg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="bgGlow" aria-hidden />
      <div className="inner" ref={ref}>
        <h2 className="title t-h2">{titleText}</h2>

        {/* Desktop rail */}
        <div className="railH" aria-hidden>
          <div className="railBase" />
          <motion.div
            className="railFill"
            style={{ width: `${progress * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Desktop steps — ALWAYS VISIBLE DESCRIPTIONS */}
        <ul className="stepsH">
          {steps.map((s, i) => (
            <li key={s.label} className="itemH">
              <div className="head">
                <div className={`chip ${isActive(i) ? "on" : ""}`}>
                  <Icon name={s.icon} />
                </div>
                <div className={`lbl ${isActive(i) ? "on" : ""}`}>{s.label}</div>
              </div>

              {s.desc && (
                <div className="dropdown open">
                  <div className="dropInner t-body">{s.desc}</div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile rail */}
        <div className="railV" aria-hidden>
          <div className="railBaseV" />
          <motion.div
            className="railFillV"
            style={{ height: `${progress * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Mobile steps — ALWAYS VISIBLE DESCRIPTIONS */}
        <ul className="stepsV">
          {steps.map((s, i) => (
            <li key={`m-${s.label}`} className="itemV">
              <div className="headV">
                <div className={`chip ${isActive(i) ? "on" : ""}`}>
                  <Icon name={s.icon} />
                </div>
                <div className={`lbl ${isActive(i) ? "on" : ""}`}>{s.label}</div>
              </div>

              {s.desc && (
                <div className="dropdownV open">
                  <div className="dropInner t-body">{s.desc}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
          margin-top: -1px;
        }
        .bgGlow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(
              42% 40% at 85% 30%,
              color-mix(in oklab, var(--secondary), transparent 88%) 0%,
              transparent 60%
            ),
            radial-gradient(
              36% 34% at 15% 70%,
              color-mix(in oklab, var(--primary), transparent 88%) 0%,
              transparent 60%
            );
        }
        .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 20px 84px;
          position: relative;
          z-index: 1;
        }
        .title {
          color: #fff;
          text-align: center;
          margin: 0 0 40px;
        }

        /* Rail Desktop */
        .railH {
          position: relative;
          height: 2px;
          width: 100%;
          margin: 44px 0 22px;
          display: none;
        }
        .railBase {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.12);
        }
        .railFill {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 0%;
          opacity: 0.98;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
        }

        .stepsH {
          list-style: none;
          padding: 0;
          margin: 0;
          display: none;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          align-items: start;
        }
        .itemH {
          display: grid;
          justify-items: center;
          text-align: center;
          gap: 12px;
          position: relative;
        }
        .head {
          display: grid;
          place-items: center;
          gap: 12px;
        }

        .itemH .chip,
        .itemV .chip {
          position: relative;
          overflow: visible;
          transition: box-shadow 0.18s ease, background 0.18s ease,
            border-color 0.18s ease;
        }
        .itemH .chip {
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          color: #f5f3ff;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .itemH .chip.on {
          background: linear-gradient(
            135deg,
            color-mix(in oklab, var(--primary), transparent 78%),
            color-mix(in oklab, var(--secondary), transparent 80%)
          );
          border-color: color-mix(in oklab, var(--secondary), white 20%);
        }

        /* Label */
        .lbl {
          font-size: clamp(14px, 2.2vw, 16px);
          line-height: 1.5;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.86);
          transition: color 0.15s ease;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }
        .lbl.on {
          color: #fff;
        }

        /* Description bubbles */
        .dropdown {
          width: 100%;
        }
        .dropInner {
          margin-top: 8px;
          max-width: 360px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* Mobile rail */
        .railV {
          position: absolute;
          left: 30px;
          top: 140px;
          bottom: 84px;
          width: 2px;
          display: block;
        }
        .railBaseV {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.12);
        }
        .railFillV {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 0%;
          opacity: 0.98;
          background: linear-gradient(180deg, var(--primary), var(--secondary));
        }

        .stepsV {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 18px;
        }
        .itemV {
          position: relative;
        }
        .headV {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 14px;
          align-items: center;
          width: 100%;
        }

        .itemV .chip {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          color: #f5f3ff;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .itemV .chip.on {
          background: linear-gradient(
            135deg,
            color-mix(in oklab, var(--primary), transparent 78%),
            color-mix(in oklab, var(--secondary), transparent 80%)
          );
          border-color: color-mix(in oklab, var(--secondary), white 20%);
        }

        .dropdownV {
          grid-column: 2 / -1;
        }
        .dropdownV .dropInner {
          margin-top: 8px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* Breakpoints */
        @media (min-width: 760px) {
          .railH,
          .stepsH {
            display: grid;
          }
          .railV,
          .stepsV {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
