"use client";
import "./header.css";
import * as React from "react";
import { resolveScheme, rgba } from "./accentSchemes";

const SECTIONS = ["leistungen", "prozess", "cases", "kontakt"] as const;
type SectionId = (typeof SECTIONS)[number];

type ColorScheme =
  | "purple"
  | "cyan"
  | "cyanClassic"
  | "lime"
  | "holographic"
  | "green"
  | "custom";

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  logoImgUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  sticky?: boolean;
};

export default function Header({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",
  logoImgUrl = "https://framerusercontent.com/images/3nlBFsBI370XMnzXFiLN8lRhzM.png?scale-down-to=512",
  ctaText = "Termin buchen",
  ctaHref = "#kontakt",
  sticky = true,
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);

  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<SectionId | null>(null);
  const [compact, setCompact] = React.useState(false);

  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const brandRef = React.useRef<HTMLAnchorElement | null>(null);
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const actionsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = open ? "hidden" : prev || "";
    return () => {
      el.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      if (window.innerWidth >= 1200) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    )
      return;
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }),
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapRef.current;
    if (!el) return;
    const calc = () => {
      const cw = el.clientWidth;
      const bw = brandRef.current?.offsetWidth ?? 0;
      const aw = actionsRef.current?.offsetWidth ?? 0;
      const nw = navRef.current?.scrollWidth ?? 0;
      const guard = 32;
      const fits = cw - (bw + aw + guard) >= nw;
      setCompact(!fits);
    };
    calc();
    const raf = requestAnimationFrame(calc);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => calc());
      ro.observe(el);
    } else {
      window.addEventListener("resize", calc);
    }
    const onLoad = () => calc();
    window.addEventListener("load", onLoad);
    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", calc);
      window.removeEventListener("load", onLoad);
    };
  }, [open]);

  const headerStyle: React.CSSProperties & {
    ["--primary"]?: string;
    ["--secondary"]?: string;
  } = {
    position: sticky ? ("sticky" as const) : ("relative" as const),
    top: 0,
    ["--primary"]: scheme.primary,
    ["--secondary"]: scheme.secondary,
  };

  return (
    <header
      className={`vh ${scrolled ? "scrolled" : ""} ${compact ? "compact" : ""}`}
      style={headerStyle}
    >
      <div className="vwrap container" ref={wrapRef}>
        <a
          className="brand"
          href="/"
          aria-label="Verrodata"
          ref={brandRef as any}
        >
          <img src={logoImgUrl} alt="verrodata logo" />
        </a>

        <div className="nav" aria-label="Primary" ref={navRef as any}>
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
            >
              {id === "leistungen" && "Leistungen"}
              {id === "prozess" && "Prozess"}
              {id === "cases" && "Referenzen"}
              {id === "kontakt" && "Kontakt"}
            </a>
          ))}
        </div>

        <div className="actions" ref={actionsRef as any}>
          <div className="social">
            <a
              href="https://de.linkedin.com/company/verrodata"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon"
              style={{
                border: `1px solid ${rgba(scheme.primary, 0.14)}`,
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2c-1.1 0-2 .9-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="5" r="2" />
              </svg>
            </a>
            <a
              href="https://www.xing.com/pages/verrodata-gmbh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xing"
              className="icon"
              style={{
                border: `1px solid ${rgba(scheme.primary, 0.14)}`,
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <img
                src="https://cdn.simpleicons.org/xing/FFFFFF"
                alt="Xing"
                width={20}
                height={20}
              />
            </a>
          </div>

          <a
            href={ctaHref}
            className="cta"
            style={{
              background: scheme.buttonGradient,
              color: scheme.buttonTextColor,
              border: `1px solid ${rgba(scheme.primary, 0.12)}`,
              boxShadow: `0 8px 20px ${rgba(scheme.primary, 0.28)}`,
            }}
          >
            {ctaText}
          </a>

          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label="Menü öffnen"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            style={{
              border: `1px solid ${rgba(scheme.primary, 0.16)}`,
              background: "rgba(0,0,0,0.9)",
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* overlay + panel */}
      <div className={`scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <div
        id="mobile-nav"
        className={`panel ${open ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        style={{ borderTop: `1px solid ${rgba(scheme.primary, 0.12)}` }}
      >
        <button
          className="panelClose"
          aria-label="Menü schließen"
          onClick={() => setOpen(false)}
          style={{
            border: `1px solid ${rgba(scheme.primary, 0.12)}`,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          ×
        </button>
        <nav aria-label="Mobile" className="panelNav">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              style={{
                border: `1px solid ${rgba(scheme.primary, 0.1)}`,
              }}
            >
              {id === "leistungen" && "Leistungen"}
              {id === "prozess" && "Prozess"}
              {id === "cases" && "Referenzen"}
              {id === "kontakt" && "Kontakt"}
            </a>
          ))}
        </nav>
        <div className="panelDivider" />
        <div className="panelSocials">
          <a
            href="https://de.linkedin.com/company/verrodata"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
            style={{
              border: `1px solid ${rgba(scheme.primary, 0.14)}`,
              borderRadius: 12,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2c-1.1 0-2 .9-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="5" r="2" />
            </svg>
          </a>
          <a
            href="https://www.xing.com/pages/verrodata-gmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
            style={{
              border: `1px solid ${rgba(scheme.primary, 0.14)}`,
              borderRadius: 12,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <img
              src="https://cdn.simpleicons.org/xing/FFFFFF"
              alt="Xing"
              width={20}
              height={20}
            />
          </a>
        </div>
        <a
          href={ctaHref}
          className="cta ctaMobile"
          onClick={() => setOpen(false)}
          style={{
            background: scheme.buttonGradient,
            color: scheme.buttonTextColor,
            border: `1px solid ${rgba(scheme.primary, 0.12)}`,
            boxShadow: `0 8px 20px ${rgba(scheme.primary, 0.28)}`,
          }}
        >
          {ctaText}
        </a>
      </div>


      <style jsx global>{`
        :root{ --container-max: 1200px; --header-h: 73px; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        body { overflow-x: hidden; }
      `}</style>
    </header>
  );
}
