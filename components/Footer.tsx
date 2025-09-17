"use client";

import "./footer.css"
import * as React from "react"
import { resolveScheme, rgba } from "@/components/accentSchemes"

type ColorScheme =
    | "purple"
    | "cyan"
    | "lime"
    | "holographic"
    | "green"
    | "custom"

type Props = {
    colorScheme?: ColorScheme
    primaryColor?: string
    secondaryColor?: string

    logoImgUrl?: string
    impressumLabel?: string
    impressumHref?: string
    datenschutzLabel?: string
    datenschutzHref?: string
}

export default function Footer({
    colorScheme = "purple",
    primaryColor = "#00D9FF",
    secondaryColor = "#FF0080",

    logoImgUrl = "https://framerusercontent.com/images/3nlBFsBI370XMnzXFiLN8lRhzM.png?scale-down-to=512",
    impressumLabel = "Impressum",
    impressumHref = "/impressum",
    datenschutzLabel = "Datenschutz",
    datenschutzHref = "/datenschutz",
}: Props) {
    const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor)

    return (
        <footer
            className="vf"
            style={
                {
                    ["--primary" as any]: scheme.primary,
                    ["--secondary" as any]: scheme.secondary,
                    ["--p1" as any]: scheme.primary,
                    ["--p2" as any]: scheme.secondary,
                    ["--bg-rgb" as any]: "7,13,23",
                    borderTop: `1px solid ${rgba(scheme.primary, 0.12)}`,
                } as React.CSSProperties
            }
        >
            <div className="vwrap container">
                <a className="brand" href="/" aria-label="Verrodata">
                    <img src={logoImgUrl} alt="verrodata logo" />
                </a>

                <nav className="links" aria-label="Legal">
                    <a href={impressumHref}>{impressumLabel}</a>
                    <a href={datenschutzHref}>{datenschutzLabel}</a>
                </nav>

                <div className="social">
                    <a
                        href="https://linkedin.com/company/verrodata"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="icon"
                        style={{
                            border: `1px solid ${rgba(scheme.primary, 0.14)}`,
                            borderRadius: 10,
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
                            borderRadius: 10,
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
            </div>

            <style jsx>{`
        .vf{
          width:100%;
          padding-block: clamp(20px, 3vw, 32px);
          padding-inline: max(16px, env(safe-area-inset-left)) max(16px, env(safe-area-inset-right));
          background:
            radial-gradient(58% 50% at 12% 56%, color-mix(in oklab, var(--p1), transparent 82%) 0%, transparent 66%),
            linear-gradient(180deg, rgba(var(--bg-rgb),0.86) 0%, rgba(var(--bg-rgb),0.72) 100%);
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          color: rgba(255,255,255,0.92);
          font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; /* Sora everywhere */
          letter-spacing: 0em;
        }
        @supports not (backdrop-filter: blur(1px)){
          .vf{ background: rgba(var(--bg-rgb), 0.9); }
        }

        .vwrap{
          width:100%;
          margin:0 auto;
          display:grid;
          grid-template-columns:auto 1fr auto;
          align-items:center;
          gap: clamp(12px, 2vw, 20px);
          min-width:0;
        }
        /*  global width lock to match header/content */
        .vwrap.container{
          width: min(var(--container-max, 1200px), 96%);
          margin-inline: auto;
        }

        .brand img{
          height: clamp(22px, 2vw, 28px);
          display:block;
          filter: invert(1) brightness(1.02);
          opacity:.8;
          transition: opacity .2s ease, filter .2s ease, transform .2s ease;
        }
        .brand:hover img{
          opacity:1;
          filter: invert(1) brightness(1.08);
          transform: translateY(-1px);
        }

        .links{
          display:flex;
          justify-content:center;
          gap: clamp(16px, 3vw, 28px);
          font-size: clamp(13px, 1vw, 14px);
          font-weight: 500;
          line-height: 1.5;
          flex-wrap: wrap;
          min-width:0;
        }
        .links a{
          color: rgba(229,231,235,0.86);
          text-decoration:none;
          position:relative;
          padding:2px 0;
          transition: color .2s ease;
          white-space:nowrap;
        }
        .links a::after{
          content:"";
          position:absolute; left:0; right:0; bottom:0; height:1px;
          background: rgba(229,231,235,0.35);
          transform: scaleX(.7);
          transform-origin: left;
          transition: transform .2s ease, background .2s ease;
        }
        .links a:hover,
        .links a:focus-visible{ color:#fff; }
        .links a:hover::after,
        .links a:focus-visible::after{
          background: rgba(255,255,255,0.7);
          transform: scaleX(1);
        }

        .social{
          display:flex;
          justify-content:flex-end;
          gap:14px;
          min-width:120px;
        }
        .icon{
          color: rgba(255,255,255,0.9);
          display:inline-flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:10px;
          transition: background .15s ease, color .15s ease, transform .1s ease, box-shadow .15s ease;
        }
        .icon:hover{
          background: rgba(255,255,255,0.08);
          color:#fff; transform: translateY(-1px);
          box-shadow: 0 8px 18px color-mix(in oklab, var(--primary), #000 72%);
        }
        .icon :global(svg), .icon :global(img){ width:20px; height:20px; }

        @media (max-width: 768px){
          .vwrap{
            grid-template-columns:1fr;
            justify-items:center;
            text-align:center;
          }
          .brand{ display:inline-flex; justify-self:center; margin:0 auto; }
          .brand img{ margin:0 auto; }
          .links{ justify-content:center; }
          .social{ justify-content:center; min-width:0; }
        }
      `}</style>
        </footer>
    )
}
