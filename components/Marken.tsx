"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { resolveScheme, resolveGradientBackground } from "@/components/accentSchemes";

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

type Props = {
  /* Theme */
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;

  /* Copy */
  bgBigText?: string;
  line1?: string;
  line2?: string;
  line3?: string;
};

export default function Marken({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  bgBigText = "15M",
  line1 = "Über 123 Marken",
  line2 = "vertrauen auf Verrodata",
  line3 = "und skalieren schneller",
}: Props) {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // framer-motion scroll progress (client-only thanks to "use client")
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    mass: 1.1,
  });

  useEffect(() => {
    const unsub = smooth.on("change", (v) => {
      let line = 1;
      if (v >= 0.63) line = 3;
      else if (v >= 0.28) line = 2;
      else line = 1;
      setActiveLine(line);
    });
    return () => unsub();
  }, [smooth]);

  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const bg = resolveGradientBackground(colorScheme, scheme);

  return (
    <section ref={sectionRef as any} className="impact-section">
      <div
        className="impact-viewport"
        style={
          {
            background: bg,
            ["--primary" as any]: scheme.primary,
            ["--secondary" as any]: scheme.secondary,
          } as React.CSSProperties
        }
      >
        <div className="background-text">{bgBigText}</div>

        <motion.div
          className="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <p className={`subtitle ${activeLine === 1 ? "gradient-line" : ""}`}>{line1}</p>

          <h2 className={`headline marken ${activeLine === 2 ? "gradient-line" : ""}`}>{line2}</h2>

          {/* line3 იგივე ზომით, რაც line1 (subtitle) */}
          <h2 className={`subtitle ${activeLine === 3 ? "gradient-line" : ""}`} style={{ margin: 0 }}>
            {line3}
          </h2>
        </motion.div>
      </div>

      <style jsx>{`
        .impact-section {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .impact-viewport {
          position: relative;
          width: 100%;
          aspect-ratio: 1728/815;
          min-height: clamp(420px, 50vh, 700px);
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .background-text {
          position: absolute;
          inset: 50% auto auto 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(160px, 30vw, 520px);
          font-weight: 800;
          color: rgba(255, 255, 255, 0.03);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.03);
          z-index: 0;
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
        }

        .content {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin-inline: auto;
          padding: 0 16px;
        }

        .subtitle {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(28px, 5vw, 38px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 0.5rem;
          line-height: 1.2;
        }

        .headline {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.2;
        }

        .headline.marken {
          font-size: clamp(36px, 6.6vw, 64px);
          font-weight: 700;
        }

        .gradient-line {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 480px) {
          .impact-viewport {
            min-height: clamp(380px, 48vh, 560px);
          }
        }
      `}</style>
    </section>
  );
}
