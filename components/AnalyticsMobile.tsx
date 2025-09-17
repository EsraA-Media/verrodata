"use client";

import React from "react";
import { resolveScheme, resolveGradientBackground } from "@/components/accentSchemes";
import "./analyticsMobile.css"

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

type Step = {
  image: string;
  title: string;
  highlight: string;
  kicker: string;
  subtitle: string;
};

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  titleAccent?: string;
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
};

export default function AnalyticsMobile({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  title = "Was Wachstum",
  titleAccent = "heute braucht.",
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
  step3Kicker = "Transparente Bewertung. Klare Priorisierung.",
  step3Subtitle = "Wir bewerten Ihre Marketing-Kanäle transparent und priorisieren, was wirklich Umsatz bringt. So steigern Sie Ihren Return on Investment nachhaltig.",
  step3Image = "https://images.unsplash.com/photo-1551836022-d5d88e9218df",

  step4Title = "Skalierbares Wachstum.",
  step4Highlight = "Dauerhaft.",
  step4Kicker = "Learnings skalieren.",
  step4Subtitle = "Tracking, Analyse und Testing zu einem System verbinden, das kontinuierlich besser wird.",
  step4Image = "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const themedBg = resolveGradientBackground(colorScheme, scheme);

  const steps: Step[] = [
    { image: step1Image, title: step1Title, highlight: step1Highlight, kicker: step1Kicker, subtitle: step1Subtitle },
    { image: step2Image, title: step2Title, highlight: step2Highlight, kicker: step2Kicker, subtitle: step2Subtitle },
    { image: step3Image, title: step3Title, highlight: step3Highlight, kicker: step3Kicker, subtitle: step3Subtitle },
    { image: step4Image, title: step4Title, highlight: step4Highlight, kicker: step4Kicker, subtitle: step4Subtitle },
  ];

  return (
    <section
      className="sol"
      aria-labelledby="sol-title"
      style={
        {
          background: themedBg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="inner container">
        <h2 id="sol-title" className="wps-title t-h2">
          {title} <span className="wps-titleGrad">{titleAccent}</span>
        </h2>

        <p className="subline t-emphasis-lg">{subline}</p>

        {steps.map((step, i) => (
          <div key={i} className={`block ${i % 2 === 1 ? "alt" : ""}`}>
            <div className="copy">
              <h3 className="h t-h2">
                {step.title}&nbsp;<span className="hi">{step.highlight}</span>
              </h3>

              <p className="kicker t-emphasis-lg">
                <em>{step.kicker}</em>
              </p>

              <p className="p t-body">{step.subtitle}</p>
            </div>

            <img className="img" src={step.image} alt={`${step.title}${step.highlight}`} />
          </div>
        ))}
      </div>

      <style jsx>{`
        :root {
          --y: clamp(24px, 5.5vw, 40px);
          --gap: clamp(10px, 3.5vw, 18px);
          --padX: clamp(16px, 4vw, 28px);
        }
        .sol {
          width: 100%;
          padding: var(--y) 0;
          color: #fff;
        }
        .inner {
          padding: 0 var(--padX);
        }

        .wps-title {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          text-align: center;
          color: rgba(255, 255, 255, 0.96);
          margin: 0 0 12px;
          letter-spacing: -0.01em;
          word-break: break-word;
          font-weight: 700;
        }
        .wps-titleGrad {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subline {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          text-align: center;
          margin: 0 0 var(--y);
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
        }

        .hi {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .block {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          margin-bottom: var(--y);
        }
        .block:last-of-type {
          margin-bottom: 0;
        }

        .copy {
          display: grid;
          gap: 6px;
        }
        .h {
          margin: 0;
          font-weight: 600;
          text-align: center;
          color: #fff;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .kicker {
          margin: 0;
          color: rgba(255, 255, 255, 0.85);
          text-align: left;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .p {
          color: #cbd5e1;
          line-height: 1.65;
          margin: 0;
          text-align: left;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: 16px;
        }

        .img {
          width: 100%;
          height: clamp(160px, 48vw, 320px);
          object-fit: cover;
          border-radius: 16px;
        }

        @media (min-width: 768px) {
          .block {
            display: grid;
            grid-template-columns: 1.05fr 1fr;
            align-items: center;
            gap: clamp(16px, 3vw, 28px);
          }
          .img {
            height: clamp(220px, 24vw, 360px);
            border-radius: 18px;
          }
          .block.alt .copy {
            order: 2;
          }
          .block.alt .img {
            order: 1;
          }

          .kicker {
            font-size: 20px;
            line-height: 1.5;
          }
          .p {
            font-size: 18px;
          }
        }

        @media (min-width: 1100px) {
          .img {
            height: clamp(260px, 24vw, 420px);
            border-radius: 20px;
          }
        }
      `}</style>
    </section>
  );
}
