"use client";

import React, { useEffect, useState } from "react";
import { resolveScheme, resolveGradientBackground, rgba } from "@/components/accentSchemes";

/** ── Screens (no frames inside images) ─────────────────────────────────── */
const laptopScreens = [
  "https://cdn.pixabay.com/photo/2024/12/13/09/22/human-ai-collaboration-9264559_1280.jpg",
  "https://i.imgur.com/4pqIJ3Y.jpg",
];
const phoneScreens = [
  "https://i.pinimg.com/736x/01/58/a5/0158a5a29bd0cd89e6e0df5c36c72d58.jpg",
  "https://i.imgur.com/zw5xTTC.jpg",
];

/** Imgur fallback (try other extensions if the first fails) */
const IMGUR_FALLBACK_EXTS = [".jpg", ".png", ".jpeg", ".webp"];
function onImgurError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  const m = img.src.match(/\.[a-zA-Z0-9]+$/);
  const curExt = m ? m[0].toLowerCase() : ".jpg";
  const i = IMGUR_FALLBACK_EXTS.indexOf(curExt);
  if (i >= 0 && i < IMGUR_FALLBACK_EXTS.length - 1) {
    img.src = img.src.replace(/\.[a-zA-Z0-9]+$/, IMGUR_FALLBACK_EXTS[i + 1]);
  } else {
    img.onerror = null;
  }
}

/** ── Layout constants ──────────────────────────────────────────────────── */
const LAPTOP_MAX_DESKTOP = 820;
const LAPTOP_MAX_MOBILE = 680;
const PHONE_DESKTOP_CLAMP = "clamp(64px, 16vw, 120px)";
const PHONE_MOBILE_CLAMP = "clamp(44px, 14vw, 84px)";

/** ── Types ─────────────────────────────────────────────────────────────── */
type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

type Props = {
  /* Theme */
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;

  /* Timings (ms) */
  laptopInterval?: number;
  phoneInterval?: number;
  phoneStartDelay?: number;
};

/** ── Hooks ─────────────────────────────────────────────────────────────── */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    // @ts-ignore older Safari fallback
    m.addEventListener ? m.addEventListener("change", onChange) : m.addListener(onChange);
    return () => {
      // @ts-ignore older Safari fallback
      m.removeEventListener ? m.removeEventListener("change", onChange) : m.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

/** ── Component ─────────────────────────────────────────────────────────── */
export default function Laptop({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  laptopInterval = 5000,
  phoneInterval = 5000,
  phoneStartDelay = 2500,
}: Props) {
  const [laptopIndex, setLaptopIndex] = useState(0);
  const [phoneIndex, setPhoneIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const li = setInterval(
      () => setLaptopIndex((p) => (p + 1) % laptopScreens.length),
      Math.max(1000, laptopInterval)
    );
    let pi: ReturnType<typeof setInterval> | undefined;
    const ps = setTimeout(() => {
      setPhoneIndex((p) => (p + 1) % phoneScreens.length);
      pi = setInterval(
        () => setPhoneIndex((p) => (p + 1) % phoneScreens.length),
        Math.max(1000, phoneInterval)
      );
    }, Math.max(0, phoneStartDelay));
    return () => {
      clearInterval(li);
      clearTimeout(ps);
      if (pi) clearInterval(pi);
    };
  }, [laptopInterval, phoneInterval, phoneStartDelay]);

  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const bg = resolveGradientBackground(colorScheme, scheme);

  const phoneWidth = isMobile ? PHONE_MOBILE_CLAMP : PHONE_DESKTOP_CLAMP;
  const phoneRight = isMobile ? "4%" : "8%";
  const paddingX = isMobile ? 12 : 16;
  const laptopMax = isMobile ? LAPTOP_MAX_MOBILE : LAPTOP_MAX_DESKTOP;

  return (
    <section
      className="lpWrap"
      style={
        {
          background: bg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="inner" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
        <div className="stage">
          {/* ===== Laptop (static frame + changing screen) ===== */}
          <div className="lap" style={{ maxWidth: `${laptopMax}px` }}>
            <div className="lid">
              <div className="bezel">
                <span className="camera" />
                <div className="screen">
                  {laptopScreens.map((src, i) => (
                    <img
                      key={`ls-${i}`}
                      src={src}
                      alt={`Laptop screen ${i + 1}`}
                      onError={onImgurError}
                      style={{ opacity: laptopIndex === i ? 1 : 0 }}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="base" />
          </div>

          {/* ===== Phone (static frame + changing screen) ===== */}
          <div className="phone" style={{ width: phoneWidth, right: phoneRight }}>
            <div className="pb">
              <div className="pBezel">
                <div className="notch" />
                <div className="pScreen">
                  {phoneScreens.map((src, i) => (
                    <img
                      key={`ps-${i}`}
                      src={src}
                      alt={`Phone screen ${i + 1}`}
                      onError={onImgurError}
                      style={{ opacity: phoneIndex === i ? 1 : 0 }}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lpWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .stage {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          min-height: clamp(320px, 44vw, 560px);
        }

        /* ===== Laptop frame ===== */
        .lap {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: visible;
          flex-shrink: 1;
          box-shadow: 0 24px 64px ${rgba(scheme.primary, 0.22)};
          filter: drop-shadow(0 16px 40px rgba(0, 0, 0, 0.35));
        }
        .lid {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 20px;
          background: linear-gradient(180deg, #15171c, #0f1116);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }
        .bezel {
          position: absolute;
          inset: 14px 14px 70px 14px;
          border-radius: 16px;
          background: #0b0b0d;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
        }
        .camera {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.38);
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.35);
        }
        .screen {
          position: absolute;
          inset: 12px;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
        }
        .screen img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.4s ease;
        }
        .base {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -18px;
          width: 86%;
          height: 56px;
          border-radius: 0 0 18px 18px;
          background: linear-gradient(180deg, #15171c, #0f1116);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 18px 36px rgba(0, 0, 0, 0.35);
        }

        /* ===== Phone frame ===== */
        .phone {
          position: absolute;
          bottom: 0;
          z-index: 3;
          filter: drop-shadow(0 10px 32px rgba(0, 0, 0, 0.4));
        }
        .pb {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 19.5;
          border-radius: 22px;
          background: linear-gradient(180deg, #15171c, #0f1116);
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }
        .pBezel {
          position: absolute;
          inset: 6px;
          border-radius: 18px;
          background: #0b0b0d;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
        }
        .notch {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 38%;
          height: 14px;
          border-radius: 10px;
          background: #0b0b0d;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
        }
        .pScreen {
          position: absolute;
          inset: 16px 8px 10px 8px;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
        }
        .pScreen img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.4s ease;
        }

        @media (max-width: 640px) {
          .lid {
            border-radius: 18px;
          }
          .bezel {
            inset: 10px 10px 60px 10px;
            border-radius: 14px;
          }
          .screen {
            inset: 10px;
            border-radius: 10px;
          }
          .base {
            height: 50px;
            bottom: -16px;
          }
          .pb {
            border-radius: 20px;
          }
          .pBezel {
            inset: 6px;
            border-radius: 16px;
          }
          .pScreen {
            inset: 14px 8px 10px 8px;
          }
        }
      `}</style>
    </section>
  );
}
