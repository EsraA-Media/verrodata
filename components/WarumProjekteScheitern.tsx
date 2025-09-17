"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { resolveScheme, resolveGradientBackground, rgba } from "@/components/accentSchemes";

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";
type Block = { title: string; text: string };

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  titleAccent?: string;
  subline?: string;
  block1Title?: string;
  block1Text?: string;
  block2Title?: string;
  block2Text?: string;
  block3Title?: string;
  block3Text?: string;
  threshold?: number;
  triggerOnce?: boolean;
};

function AnimatedSection({
  title,
  text,
  borderColor,
  shadowColor,
  threshold,
  triggerOnce,
}: Block & {
  borderColor: string;
  shadowColor: string;
  threshold: number;
  triggerOnce: boolean;
}) {
  const [ref, inView] = useInView({ threshold, triggerOnce });

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="wps-card"
      style={{ borderColor, boxShadow: `0 10px 28px ${shadowColor}` }}
    >
      <h3 className="wps-cardTitle">{title}</h3>
      <p className="wps-cardText">{text}</p>

      <style jsx>{`
        .wps-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: clamp(16px, 2.4vw, 24px) clamp(24px, 3vw, 40px);
          color: #fff;
          text-align: center;
        }
        .wps-cardTitle {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(16px, 2.6vw, 20px);
          font-weight: 600;
          margin: 0 0 8px;
          color: #fff;
          line-height: 1.2;
        }
        .wps-cardText {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(13px, 2.2vw, 14px);
          line-height: 1.7;
          font-weight: 300;
          color: #d1d5db;
          margin: 0;
          max-width: 1000px;
          margin-inline: auto;
        }
      `}</style>
    </motion.div>
  );
}

export default function VieleDaten({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  title = "Viele Daten. Viele Tools.",
  titleAccent = "Und trotzdem kein Fortschritt.",
  subline = "Kommt Ihnen das bekannt vor?",
  block1Title = "Daten überall – doch niemand blickt durch.",
  block1Text = "Entscheidungen nach Bauchgefühl statt auf Fakten.",
  block2Title = "Zehn Tools, drei Teams – aber null Verbindung.",
  block2Text = "Was fehlt: ein klares Setup, das alle Daten nutzbar macht.",
  block3Title = "Meetings ohne Ende. Viele Pläne, wenig Umsetzung.",
  block3Text = "Gute Ideen versanden.",
  threshold = 0.3,
  triggerOnce = true,
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const bg = resolveGradientBackground(colorScheme, scheme);

  const blocks: Block[] = [
    { title: block1Title, text: block1Text },
    { title: block2Title, text: block2Text },
    { title: block3Title, text: block3Text },
  ];

  const borderTint = rgba(scheme.primary, 0.12);
  const shadowTint = rgba(scheme.primary, 0.22);

  return (
    <section
      className="wps"
      style={
        {
          background: bg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="wps-wrap">
        <h2 className="wps-title">
          {title} <span className="wps-titleAccent">{titleAccent}</span>
        </h2>
        <p className="wps-subline">{subline}</p>

        <div className="wps-stack">
          {blocks.map((b, i) => (
            <AnimatedSection
              key={i}
              title={b.title}
              text={b.text}
              borderColor={borderTint}
              shadowColor={shadowTint}
              threshold={threshold}
              triggerOnce={triggerOnce}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .wps {
          --wps-section-y: clamp(72px, 9vw, 120px);
          width: 100%;
          padding: var(--wps-section-y) 0 var(--wps-section-y);
          overflow: hidden;
        }
        .wps-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .wps-title {
          text-align: center;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(24px, 5.5vw, 36px);
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.96);
          margin: 0 0 12px;
          word-break: break-word;
        }
        .wps-titleAccent {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .wps-subline {
          text-align: center;
          padding-top: 5px;
          padding-bottom: 50px;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(16px, 3vw, 20px);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.72);
          margin: 0 0 28px;
        }
        .wps-stack {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1200px;
          margin-inline: auto;
        }
        @media (min-width: 900px) {
          .wps-stack {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
