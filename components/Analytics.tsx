"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { resolveScheme, resolveGradientBackground } from "@/components/accentSchemes";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

type StepData = {
  image: string;
  title: string;
  highlight: string;
  kicker: string;
  subtitle: string;
};

const OVERLAYS = [
  `radial-gradient(58% 50% at 12% 56%, color-mix(in srgb, var(--primary), transparent 80%) 0%, transparent 60%)`,
  `radial-gradient(58% 50% at 80% 44%, color-mix(in srgb, var(--secondary), transparent 82%) 0%, transparent 62%)`,
  `radial-gradient(58% 50% at 30% 60%, color-mix(in srgb, var(--primary), transparent 84%) 0%, transparent 64%)`,
  `radial-gradient(58% 50% at 70% 40%, color-mix(in srgb, var(--secondary), transparent 84%) 0%, transparent 64%)`,
];

function Step({ data, isVisible }: { data: StepData; isVisible: boolean }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 6vw",
        gap: "clamp(16px, 3vw, 32px)",
        textAlign: "center",
      }}
    >
      <div style={{ flex: "1 1 300px", minWidth: 0 }}>
        <h3
          className="title t-h2"
          style={{
            fontFamily: "Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            color: "#fff",
            marginBottom: 8,
            textAlign: isMobile ? "center" : "left",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            fontSize: "clamp(24px, 5.5vw, 36px)",
            lineHeight: 1.2,
          }}
        >
          {data.title} <span className="text-grad">{data.highlight}</span>
        </h3>

        <p
          className="t-emphasis-lg"
          style={{
            margin: "0 0 6px 0",
            color: "rgba(255,255,255,0.85)",
            textAlign: isMobile ? "center" : "left",
            fontStyle: "italic",
            fontFamily: "Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            fontSize: "clamp(16px, 3vw, 20px)",
            lineHeight: 1.6,
          }}
        >
          {data.kicker}
        </p>

        <p
          className="t-body"
          style={{
            color: "#cbd5e1",
            margin: 0,
            textAlign: isMobile ? "center" : "left",
            fontFamily: "Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            fontSize: "clamp(16px, 2.2vw, 18px)",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {data.subtitle}
        </p>
      </div>

      <motion.img
        loading="eager"
        src={data.image}
        alt="step"
        style={{
          width: "100%",
          maxWidth: "450px",
          height: "auto",
          borderRadius: "16px",
          objectFit: "cover",
          flexShrink: 0,
          marginTop: isMobile ? "16px" : 0,
          boxShadow: "0 18px 44px rgba(0,0,0,.35)",
        }}
      />

      <style jsx>{`
        .text-grad {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </motion.div>
  );
}

function ObservedStep({
  index,
  data,
  threshold,
  onVisible,
}: {
  index: number;
  data: StepData;
  threshold: number;
  onVisible: (i: number) => void;
}) {
  const { ref, inView } = useInView({ threshold, triggerOnce: false });
  useEffect(() => {
    if (inView) onVisible(index);
  }, [inView, index, onVisible]);
  return (
    <div ref={ref} className="slot">
      <Step data={data} isVisible={inView} />
    </div>
  );
}

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  subline?: string;
  step1Title?: string;
  step1Highlight?: string;
  step1Kicker?: string;
  step1Subtitle?: string;
  step1Image?: string;
  step2Title?: string;
  step2Highlight?: string;
  step2Kicker?: string;
  step2Subtitle?: string;
  step2Image?: string;
  step3Title?: string;
  step3Highlight?: string;
  step3Kicker?: string;
  step3Subtitle?: string;
  step3Image?: string;
  step4Title?: string;
  step4Highlight?: string;
  step4Kicker?: string;
  step4Subtitle?: string;
  step4Image?: string;
  stepThreshold?: number;
};

export default function Analytics({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  title = "Was Wachstum heute braucht.",
  subline = "Vier Stellschrauben, mit denen wir aus Daten echten Umsatz machen.",
  step1Title = "Saubere Daten.",
  step1Highlight = "Volle Kontrolle.",
  step1Kicker = "DSGVO-konform, zuverlässig, lückenlos.",
  step1Subtitle = "Wir schaffen die Grundlage für alle weiteren Wachstumshebel – mit einer skalierbaren Tracking-Struktur.",
  step1Image = "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  step2Title = "Tests, die",
  step2Highlight = "Conversions steigern.",
  step2Kicker = "Wir finden heraus, was wirklich wirkt.",
  step2Subtitle = "Mit klaren Hypothesen und strukturierten A/B-Tests – für höhere Conversion-Rates und bessere User Experience.",
  step2Image = "https://images.unsplash.com/photo-1629904853716-f0bc54eea481",
  step3Title = "Kampagnen, die",
  step3Highlight = "ROI bringen.",
  step3Kicker = "Transparente Bewertung & klare Priorisierung.",
  step3Subtitle = "Wir bewerten Ihre Marketing-Kanäle transparent und priorisieren, was wirklich Umsatz bringt. So steigern Sie Ihren Return on Investment nachhaltig.",
  step3Image = "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  step4Title = "Wachstum, das",
  step4Highlight = "skaliert.",
  step4Kicker = "Alle Learnings. Eine Strategie.",
  step4Subtitle = "Wir verbinden Tracking, Analyse und Testing zu einem lernenden System, das kontinuierlich besser wird.",
  step4Image = "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
  stepThreshold = 0.5,
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const themedBg = resolveGradientBackground(colorScheme, scheme);

  const steps: StepData[] = [
    { image: step1Image, title: step1Title, highlight: step1Highlight, kicker: step1Kicker, subtitle: step1Subtitle },
    { image: step2Image, title: step2Title, highlight: step2Highlight, kicker: step2Kicker, subtitle: step2Subtitle },
    { image: step3Image, title: step3Title, highlight: step3Highlight, kicker: step3Kicker, subtitle: step3Subtitle },
    { image: step4Image, title: step4Title, highlight: step4Highlight, kicker: step4Kicker, subtitle: step4Subtitle },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const overlay = OVERLAYS[activeIndex % OVERLAYS.length];

  return (
    <section
      className="solWrap"
      style={
        {
          background: `${overlay}, ${themedBg}`,
          transition: "background 0.6s ease-in-out",
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="container">
        <h2 className="title t-h2">{title}</h2>
        <p className="subline t-emphasis-lg">{subline}</p>

        {steps.map((step, i) => (
          <ObservedStep key={i} index={i} data={step} threshold={stepThreshold} onVisible={setActiveIndex} />
        ))}
      </div>

      <style jsx>{`
        :root {
          --section-y: clamp(56px, 7vw, 88px);
          --slot-min: clamp(420px, 48vh, 560px);
        }
        .solWrap {
          width: 100%;
          padding: var(--section-y) 0;
        }
        .title {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(24px, 5.5vw, 36px);
          text-align: center;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
          font-weight: 600;
        }
        .subline {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 16px;
          font-size: clamp(16px, 3vw, 20px);
          line-height: 1.6;
        }
        .slot {
          min-height: var(--slot-min);
          display: flex;
          align-items: center;
          padding: clamp(12px, 2.5vw, 24px) 0;
        }
        @media (max-width: 768px) {
          .slot {
            min-height: auto;
          }
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
      `}</style>
    </section>
  );
}
