"use client";

import React from "react";
import {
  resolveScheme,
  resolveGradientBackground,
  rgba,
} from "@/components/accentSchemes"; 

type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom";

type Props = {
  colorScheme?: ColorScheme;
  primaryColor?: string;
  secondaryColor?: string;
  action?: string;
  sourceTag?: string;
  titleText?: string;
  subtitleText?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  ctaText?: string;
  privacyNote?: string;
  privacyUrl?: string;
  successMsg?: string;
  errorMsg?: string;
  invalidEmailMsg?: string;
};

export default function LeadMagnetSection({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",

  action = "/api/lead-magnet",
  sourceTag = "tracking-guide-2025",

  titleText = "Gratis-Download: Die 7 größten Tracking-Fehler – und wie Sie sie 2025 vermeiden",
  subtitleText = "Kompakter Leitfaden inkl. Checkliste – praxisnah & sofort umsetzbar.",
  emailLabel = "E-Mail",
  emailPlaceholder = "ihre@email.de",
  ctaText = "Jetzt kostenlos herunterladen",
  privacyNote = `Mit Klick auf „Jetzt kostenlos herunterladen“ stimmen Sie der Verarbeitung Ihrer Daten zu. Mehr dazu in unserer`,
  privacyUrl = "/datenschutz",
  successMsg = "Bitte prüfen Sie Ihr Postfach – wir haben Ihnen den Guide zugesendet.",
  errorMsg = "Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.",
  invalidEmailMsg = "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const themedBg = resolveGradientBackground(colorScheme, scheme);

  const [email, setEmail] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [ok, setOk] = React.useState<null | "success" | "error">(null);
  const [msg, setMsg] = React.useState<string>("");
  const [honey, setHoney] = React.useState(""); // honeypot

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(null);
    setMsg("");
    if (honey) return;

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setOk("error");
      setMsg(invalidEmailMsg);
      return;
    }
    try {
      setBusy(true);
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: sourceTag }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setOk("success");
      setMsg(successMsg);
      setEmail("");
    } catch {
      setOk("error");
      setMsg(errorMsg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      className="lmWrap"
      aria-labelledby="lm-title"
      style={
        {
          background: themedBg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      <div className="container">
        <div
          className="lmCard"
          style={{
            borderColor: rgba(scheme.primary, 0.12),
            boxShadow: `0 10px 28px ${rgba(scheme.primary, 0.22)}`,
          }}
        >
          <div className="lmCopy">
            <h2 id="lm-title" className="lmTitle">
              {titleText}
            </h2>
            <p className="lmText">{subtitleText}</p>
          </div>

          <form className="lmForm" onSubmit={onSubmit} noValidate>
            {/* honeypot */}
            <label className="lmHp" aria-hidden="true">
              Firma
              <input
                tabIndex={-1}
                autoComplete="off"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                name="company"
              />
            </label>

            <div className="lmRow">
              <div className="lmField">
                <label htmlFor="lm-email" className="lmLabel">
                  {emailLabel}
                </label>
                <input
                  id="lm-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={ok === "error" ? true : undefined}
                  style={{
                    borderColor: rgba(scheme.primary, 0.18),
                  }}
                />
              </div>

              <button
                className="lmBtn"
                type="submit"
                disabled={busy}
                style={{
                  background: scheme.buttonGradient,
                  color: scheme.buttonTextColor,
                  borderColor: rgba(scheme.primary, 0.14),
                  boxShadow: `0 10px 26px ${rgba(scheme.primary, 0.28)}`,
                }}
              >
                {busy ? "Senden…" : ctaText}
              </button>
            </div>

            <div className="lmNote">
              {privacyNote} <a href={privacyUrl}>Datenschutzerklärung</a>.
            </div>

            <div className="lmStatus" aria-live="polite">
              {ok && <span className={ok}>{msg}</span>}
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .lmWrap {
          --y: clamp(64px, 8vw, 120px);
          width: 100%;
          overflow: hidden;
          padding: var(--y) 0;
          color: #fff;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          min-width: 0;
        }

        .lmCard {
          display: grid;
          gap: clamp(16px, 2.4vw, 24px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: clamp(18px, 3vw, 28px);
          backdrop-filter: saturate(140%) blur(6px);
        }

        .lmCopy {
          text-align: center;
        }

        .lmTitle {
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
          font-size: clamp(28px, 7vw, 32px);
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin: 0 0 8px;
          font-weight: 600;
          color: #fff;
        }

        .lmText {
          margin: 0;
          color: rgba(255, 255, 255, 0.85);
          font-size: clamp(18px, 2.4vw, 20px);
          line-height: 1.5;
          font-weight: 500;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }

        .lmForm {
          display: grid;
          gap: 12px;
        }

        .lmRow {
          display: grid;
          gap: 10px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) {
          .lmRow {
            grid-template-columns: 1fr auto;
            align-items: end;
          }
        }

        .lmField {
          display: grid;
          gap: 6px;
        }
        .lmLabel {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }

        .lmCard input[type="email"] {
          height: 48px;
          padding: 0 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(13, 16, 24, 0.6);
          color: #fff;
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease,
            background 0.18s ease;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }
        .lmCard input[type="email"]::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .lmCard input[type="email"]:focus {
          border-color: color-mix(in oklab, var(--primary), #fff 35%);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary), #fff 20%)
            inset;
          background: rgba(13, 16, 24, 0.75);
        }

        .lmBtn {
          height: 48px;
          padding: 0 clamp(14px, 2.6vw, 22px);
          border-radius: 12px;
          border: 1px solid transparent;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.14s ease, filter 0.14s ease,
            opacity 0.14s ease, box-shadow 0.14s ease;
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }
        .lmBtn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }
        .lmBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .lmNote {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }
        .lmNote a {
          color: #fff;
          text-decoration: underline;
        }

        .lmStatus {
          min-height: 20px;
        }
        .success {
          color: #7ce38b;
          font-size: 14px;
        }
        .error {
          color: #ff8b8b;
          font-size: 14px;
        }

        /* honeypot */
        .lmHp {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
