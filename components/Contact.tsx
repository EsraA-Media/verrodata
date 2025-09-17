"use client";

import * as React from "react";
import "./contact.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

  titleText?: string;
  sublineText?: string;
  ctaText?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  privacyNote?: string;
  privacyUrl?: string;

  /* Form */
  actionUrl?: string;
  method?: "get" | "post";
};

export default function Contact({
  colorScheme = "cyan",
  primaryColor = "#00D9FF",
  secondaryColor = "#FF0080",

  titleText = "Kontakt",
  sublineText = "Lassen Sie uns sprechen\nSchildern Sie uns Ihre Herausforderung – wir melden uns innerhalb von 24 Stunden mit einem konkreten Vorschlag.",
  ctaText = "Jetzt Kontakt aufnehmen",
  namePlaceholder = "Name",
  emailPlaceholder = "E-Mail",
  messagePlaceholder = "Nachricht",
  privacyNote = "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer",
  privacyUrl = "/datenschutz",

  actionUrl = "#",
  method = "post",
}: Props) {
  const scheme = resolveScheme(colorScheme, primaryColor, secondaryColor);
  const themedBg = resolveGradientBackground(colorScheme, scheme);

  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const v = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.12 * i, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={ref}
      className="cWrap"
      id="kontakt"
      style={
        {
          background: themedBg,
          ["--primary" as any]: scheme.primary,
          ["--secondary" as any]: scheme.secondary,
        } as React.CSSProperties
      }
    >
      {/* background glows */}
      <div className="cGlow lt" aria-hidden />
      <div className="cGlow rt" aria-hidden />

      {/* container */}
      <div className="container">
        <motion.h2
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        //   variants={v}
          className="cTitle"
          style={{
            background: `linear-gradient(90deg, var(--primary), var(--secondary))`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {titleText}
        </motion.h2>

        <motion.p
          custom={1}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        //   variants={v}
          className="cSub"
        >
          {sublineText.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < sublineText.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.p>

        <motion.form
          custom={2}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        //   variants={v}
          className="cForm"
          action={actionUrl}
          method={method}
        >
          <label className="cVisuallyHidden" htmlFor="cName">
            Name
          </label>
          <input
            id="cName"
            type="text"
            name="name"
            placeholder={namePlaceholder}
            className="cInput"
            required
            autoComplete="name"
            style={{ borderColor: rgba(scheme.primary, 0.14) }}
          />

          <label className="cVisuallyHidden" htmlFor="cEmail">
            E-Mail
          </label>
          <input
            id="cEmail"
            type="email"
            name="email"
            placeholder={emailPlaceholder}
            className="cInput"
            required
            autoComplete="email"
            style={{ borderColor: rgba(scheme.primary, 0.14) }}
          />

          <label className="cVisuallyHidden" htmlFor="cMessage">
            Nachricht
          </label>
          <textarea
            id="cMessage"
            name="message"
            placeholder={messagePlaceholder}
            rows={6}
            className="cInput cArea"
            required
            style={{ borderColor: rgba(scheme.primary, 0.14) }}
          />

          <button
            type="submit"
            className="cBtn"
            style={{
              background: scheme.buttonGradient,
              color: scheme.buttonTextColor,
              borderColor: rgba(scheme.primary, 0.15),
              boxShadow: `0 10px 26px ${rgba(scheme.primary, 0.8)}`,
            }}
          >
            {ctaText}
            <span className="cShine" aria-hidden />
          </button>

          <p className="cTiny">
            {privacyNote} <a href={privacyUrl}>Datenschutzerklärung</a>.
          </p>
        </motion.form>
      </div>

    
    </section>
  );
}
