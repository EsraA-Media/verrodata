import * as React from "react"
import { resolveScheme, resolveGradientBackground, rgba } from "@/components/accentSchemes"


type ColorScheme = "purple" | "cyan" | "lime" | "holographic" | "green" | "custom"

type Props = {
  colorScheme?: ColorScheme
  primaryColor?: string
  secondaryColor?: string
  badgeText?: string
  headlineText?: string
  leadText?: string
  subtitleText?: string
  buttonText?: string
  showBadgeIcon?: boolean
  badgeIconUrl?: string
  ctaHref?: string
  minHeight?: number
}

function RocketIcon() {
  return (<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden focusable="false">
    <path d="M4 13a3 3 0 0 0-2.12.88C.7 15.06 0 20 0 20s4.94-.7 6.12-1.88A3 3 0 0 0 7 16c0-1.66-1.34-3-3-3Zm.71 3.71c-.28.28-2.17.76-2.17.76s.47-1.89.76-2.17c.19-.19.44-.3.71-.3A1 1 0 0 1 5 16c0 .27-.11.52-.29.71ZM15.42 11.65C21.78 5.29 19.66.34 19.66.34S14.71-1.78 8.35 4.58l-2.49-.5a2 2 0 0 0-1.81.55L0 8.69l5 2.14 4.17 4.17L11.31 20l4.05-4.05a2 2 0 0 0 .06-1.36ZM5.41 8.83 3.5 8.01l1.97-1.97 1.44.29c-.57.83-1.08 1.7-1.5 2.5ZM11.99 16.5l-.82-1.91c.8-.42 1.67-.92 2.49-1.46l.29 1.44L12 16.5ZM14 10.24c-1.32 1.32-3.38 2.4-4.04 2.73L7.03 10.04c.32-.65 1.4-2.71 2.73-4.04C14.44 1.32 18 2.01 18 2.01s.68 3.55-4 8.23ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor"/></svg>)
}

export default function GradientHeroSection(props: Props){
  const {
    colorScheme = "purple",
    primaryColor = "#8B5CF6",
    secondaryColor = "#A78BFA",
    badgeText,
    headlineText,
    leadText,
    subtitleText,
    buttonText,
    showBadgeIcon = true,
    badgeIconUrl,
    ctaHref = "#kontakt",
    minHeight = 640
  } = props

  const copy = {
    badge: (badgeText ?? "").trim() || "Zu viele Tools? Zu wenig Wirkung?",
    headline: (headlineText ?? "").trim() || "Saubere Daten. Klare Strukturen. Mehr Umsatz.",
    lead: (leadText ?? "").trim() || "Wir denken mit, setzen um – und bringen Ihre Datenprojekte endlich ins Rollen.",
    subtitle: (subtitleText ?? "").trim() || "Mit technischer Expertise, ehrlichem Feedback und einem festen Ansprechpartner.",
    button: (buttonText ?? "").trim() || "Jetzt Kontakt aufnehmen!",
  }

  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor)
  const bg = resolveGradientBackground(colorScheme, scheme)
  const titleHasGradient = colorScheme === "purple" || colorScheme === "cyan" || colorScheme === "lime" || colorScheme === "holographic"

  const PT = "clamp(24px, 4.5vw, 40px)"
  const PB = "clamp(48px, 7.5vw, 84px)"
  const SP = { badgeMb:"clamp(24px, 3.6vw, 40px)", h1Mb:"clamp(10px, 1.8vw, 18px)", leadMb:"clamp(22px, 3.4vw, 36px)", subMb:"clamp(18px, 3vw, 30px)", ctaMt:"clamp(20px, 3.4vw, 36px)" }

  return (
    <section
  className="gh"
  style={
    {
      width: "100%",
      display: "grid",
      placeItems: "center",
      padding: `${PT} 16px ${PB}`,
      boxSizing: "border-box",
      background: bg,
      ["--hero-min" as any]: `${minHeight}px`,
    } as React.CSSProperties
  }>
      <div style={{ width: "min(1200px, 96%)", textAlign: "center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"8px 14px", borderRadius:999, background: scheme.badgeBg, border:`1px solid ${scheme.badgeBorder}`, boxShadow:"0 6px 18px rgba(0,0,0,0.28)", margin:`0 auto ${SP.badgeMb}` }}>
          {showBadgeIcon && (
            <span className="badgeIcon" aria-hidden style={{ color: scheme.secondary }}>
              {badgeIconUrl ? <img src={badgeIconUrl} alt="" /> : <RocketIcon />}
            </span>
          )}
          <span style={{ fontSize:14, fontWeight:600, letterSpacing:".02em", color: scheme.badgeText, whiteSpace:"nowrap" }}>{copy.badge}</span>
        </div>

        <h1 className="balance" style={{ margin:`0 0 ${SP.h1Mb}`, fontFamily:"Sora, system-ui, -apple-system, Segoe UI, Roboto", fontSize:"clamp(28px, 7.2vw, 48px)", fontWeight:600, lineHeight:1.2, letterSpacing:"-0.01em", ...(titleHasGradient ? { background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.secondary})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" } : { color:"var(--text-on-dark, #FFFFFF)" })}}>
          {copy.headline}
        </h1>

        <p className="balance" style={{ margin:`0 auto ${SP.leadMb}`, maxWidth:1100, fontSize:"clamp(18px, 2.4vw, 20px)", fontWeight:500, lineHeight:1.5, color:"var(--text-on-dark, #FFFFFF)" }}>{copy.lead}</p>
        <p className="balance" style={{ margin:`0 auto ${SP.subMb}`, maxWidth:980, fontSize:"clamp(16px, 2.2vw, 18px)", fontWeight:400, lineHeight:1.5, color: scheme.subtitleColor }}>{copy.subtitle}</p>

        <a href={ctaHref} style={{ marginTop:SP.ctaMt, display:"inline-flex", alignItems:"center", justifyContent:"center", padding:"12px 18px", borderRadius:12, textDecoration:"none", fontWeight:700, fontSize:16, color: scheme.buttonTextColor, background: scheme.buttonGradient, border: `1px solid ${rgba(scheme.primary, 0.14)}`, boxShadow: `0 12px 28px ${rgba(scheme.primary, 0.28)}`, transition:"transform .08s ease, filter .18s ease, box-shadow .18s ease", willChange:"transform" }}>
          {copy.button}
        </a>
      </div>
      <style jsx>{`
        .gh { min-height: var(--hero-min, 560px); }
        @media (max-width: 640px) { .gh { min-height: auto; } }
        .balance { text-wrap: balance; }
        .badgeIcon { width:24px; height:24px; display:inline-grid; place-items:center; border-radius:999px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); }
        .badgeIcon :global(svg), .badgeIcon :global(img){ width:16px; height:16px; display:block; }
      `}</style>
    </section>
  )
}
