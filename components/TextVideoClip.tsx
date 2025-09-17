"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { resolveScheme, resolveGradientBackground, rgba } from "./accentSchemes";

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

export type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  titleText?: string;
  quoteText?: string;
  authorText?: string;
  videoEmbedUrl?: string;
  threshold?: number;
  triggerOnce?: boolean;
};

export default function TextVideoClip({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  titleText = "Warum unsere Kunden Verrodata wählen",
  quoteText = `“Dank Verrodata haben wir innerhalb weniger Wochen komplette Klarheit über unsere Prozesse bekommen. Die Umsetzung war schnell, effektiv – und messbar.”`,
  authorText = "– Tobias Klein, Head of Ops @ Greenhouse",
  videoEmbedUrl = "https://player.vimeo.com/video/175865720?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&badge=0&background=1",
  threshold = 0.3,
  triggerOnce = true,
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const bg = resolveGradientBackground(colorScheme, scheme);
  const [ref, inView] = useInView({ threshold, triggerOnce });

  const sectionStyle: React.CSSProperties & { ["--primary"]?: string; ["--secondary"]?: string } = {
    background: bg,
    ["--primary"]: scheme.primary,
    ["--secondary"]: scheme.secondary,
  };

  return (
    <section ref={ref} className="twv" style={sectionStyle}>
      <div className="twv-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="twv-card"
          style={{
            borderColor: rgba(scheme.primary, 0.12),
            boxShadow: `0 12px 28px ${rgba(scheme.primary, 0.18)}`,
          }}
        >
          <h2 className="twv-title t-h2">{titleText}</h2>
          <p className="twv-quote t-emphasis-lg">
            {quoteText}
            <br />
            <br />
            {authorText}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="twv-video"
          style={{
            boxShadow: `0 18px 40px ${rgba(scheme.primary, 0.22)}`,
            borderColor: rgba(scheme.primary, 0.14),
          }}
        >
          <iframe
            src={videoEmbedUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder={0}
            title="Customer Story"
            loading="lazy"
          />
        </motion.div>
      </div>

      <style jsx>{`
        .twv {
          width: 100%;
          padding: clamp(48px, 6vw, 80px) 0;
          overflow: hidden;
        }
        .twv-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .twv-wrap {
            grid-template-columns: 1fr 1fr;
            align-items: stretch;
            gap: 32px;
          }
          .twv-card,
          .twv-video {
            height: 100%;
          }
        }
        .twv-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px 28px;
          color: #fff;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .twv-title {
          margin: 0 0 12px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .twv-quote {
          margin: 0;
          max-width: 720px;
          margin-inline: auto;
          color: #d1d5db;
        }
        .twv-video {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          border: 1px solid transparent;
        }
        .twv-video iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
    </section>
  );
}
