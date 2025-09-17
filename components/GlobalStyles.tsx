import * as React from "react"

export default function GlobalStyles() {
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
/* ===================== TOKENS ===================== */
:root{
  /* Font */
  --font-sans: "Sora", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;

  /* Layout */
  --maxw: 1200px;
  --px: clamp(16px, 5vw, 24px);

  /* Colors (as per style guide; hues kept for headings/body) */
  --bg: #FAF9F5;
  --text: #3D3929;     /* body text */
  --heading: #28261B;  /* h1–h5 */
  --border: #DAD9D4;

  /* Brand (color use later; sizes first) */
  --primary: #8B5CF6;
  --primary-foreground: #FFFFFF;
  --secondary: #A78BFA;
  --secondary-foreground: #535146;

  /* Dark surface helper */
  --surface-dark:#0B0B13;
  --text-on-dark:rgba(255,255,255,.92);

  /* ===== Type Scale (STRICT per style guide) ===== */
  /* Body */
  --fs-body-m:16px;
  --fs-body-d:18px;
  --fw-body:400;
  --lh-body:1.5;
  --ls-body:0em;

  /* Headings */
  --fs-h1-m:28px; --fs-h1-d:48px; --fw-h1:600; --lh-hx:1.2; --ls-h1:-0.01em;
  --fs-h2-m:24px; --fs-h2-d:36px; --fw-h2:500;             --ls-h2:-0.01em;
  --fs-h3-m:20px; --fs-h3-d:28px; --fw-h3:500;             --ls-h3:0em;
  --fs-h4-m:18px; --fs-h4-d:24px; --fw-h4:400;             --ls-h4:0em;
  --fs-h5-m:16px; --fs-h5-d:20px; --fw-h5:400;             --ls-h5:0em;

  /* Emphasis */
  --fs-emp-lg-m:18px; --fs-emp-lg-d:20px; --fw-emp:500; --lh-emp:1.5; --ls-emp-lg:0em;
  --fs-emp-sm-m:14px; --fs-emp-sm-d:16px;                --ls-emp-sm:0.01em;

  /* Spacing helpers (optional) */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px;
}

/* ===================== BASE ===================== */
html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
html,body{ background:var(--bg); }
body, button, input, select, textarea{
  font-family: var(--font-sans) !important;
  color: var(--text);
  margin: 0;
}
.container{ max-width:var(--maxw); margin:0 auto; padding:0 var(--px); }

/* ===================== TYPOGRAPHY ===================== */
/* Headings strictly from tokens */
h1,h2,h3,h4,h5{ color:var(--heading); line-height:1.2; margin:0; letter-spacing:0; }

h1{ font-size:var(--fs-h1-m); font-weight:var(--fw-h1); letter-spacing:var(--ls-h1); line-height:var(--lh-hx); }
@media (min-width:768px){ h1{ font-size:var(--fs-h1-d); } }

h2{ font-size:var(--fs-h2-m); font-weight:var(--fw-h2); letter-spacing:var(--ls-h2); line-height:var(--lh-hx); }
@media (min-width:768px){ h2{ font-size:var(--fs-h2-d); } }

h3{ font-size:var(--fs-h3-m); font-weight:var(--fw-h3); letter-spacing:var(--ls-h3); line-height:var(--lh-hx); }
@media (min-width:768px){ h3{ font-size:var(--fs-h3-d); } }

h4{ font-size:var(--fs-h4-m); font-weight:var(--fw-h4); letter-spacing:var(--ls-h4); line-height:var(--lh-hx); }
@media (min-width:768px){ h4{ font-size:var(--fs-h4-d); } }

h5{ font-size:var(--fs-h5-m); font-weight:var(--fw-h5); letter-spacing:var(--ls-h5); line-height:var(--lh-hx); }
@media (min-width:768px){ h5{ font-size:var(--fs-h5-d); } }

/* Body text */
p{
  font-size: var(--fs-body-m);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-body);
  font-weight: var(--fw-body);
  margin: 0;
  color: var(--text);
}
@media (min-width:768px){ p{ font-size: var(--fs-body-d); } }

/* Emphasis utilities (for subtitle/smaller copy) */
.text-emphasis-large{ font-size:var(--fs-emp-lg-m); line-height:var(--lh-emp); font-weight:var(--fw-emp); letter-spacing:var(--ls-emp-lg); color:var(--text); }
@media (min-width:768px){ .text-emphasis-large{ font-size:var(--fs-emp-lg-d); } }

.text-emphasis-small{ font-size:var(--fs-emp-sm-m); line-height:var(--lh-emp); font-weight:var(--fw-emp); letter-spacing:var(--ls-emp-sm); color:var(--text); }
@media (min-width:768px){ .text-emphasis-small{ font-size:var(--fs-emp-sm-d); } }

/* Dark section helper (optional) */
.section-dark{
  background: var(--surface-dark);
  color: var(--text-on-dark);
  background-image: radial-gradient(60% 50% at 90% 44%, color-mix(in srgb, var(--primary), transparent 82%) 0%, transparent 60%);
}
.text-gradient{
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}

/* Logos (unchanged behavior) */
.logo-row{ display:flex; flex-wrap:wrap; gap:24px; opacity:.7; filter:saturate(0) brightness(1.05) contrast(.95); }
.logo-row img{ height:28px; object-fit:contain; opacity:.85; transition:opacity .2s; }
.logo-row img:hover{ opacity:1; }
.tools-marquee{ display:none !important; }

/* ===================== ENFORCE SORA IN FRAMER ===================== */
/* Everything text-like → Sora */
:where(h1,h2,h3,h4,h5,p,li,blockquote,small,a,button,label,input,textarea,figcaption,span,strong,em){
  font-family: var(--font-sans) !important;
}

/* Framer Text/RichText nodes sometimes inject their own fonts */
[data-framer-component-type="Text"],
[data-framer-component-type="RichText"],
[data-framer-name] :where(*) {
  font-family: var(--font-sans) !important;
}

/* ===================== OPTIONAL: HEADLINE BLOCK HELPER ===================== */
.h1-block{ display:flex; flex-direction:column; row-gap: var(--space-3); }
.h1-block .line{ font: var(--fw-h1) clamp(var(--fs-h1-m), 7vw, var(--fs-h1-d)) / var(--lh-hx) var(--font-sans); letter-spacing: var(--ls-h1); color: var(--heading); }
.h1-block .sub{ font: var(--fw-emp) clamp(14px, 2.2vw, 18px) / 1.35 var(--font-sans); letter-spacing: 0; color: var(--text); }

.t-body{ font: var(--fw-body) var(--fs-body-d)/var(--lh-body) var(--font-sans); letter-spacing: var(--ls-body); }
@media (max-width: 767px){ .t-body{ font-size: var(--fs-body-m); } }

.t-h1{ font: var(--fw-h1) var(--fs-h1-d)/var(--lh-hx) var(--font-sans); letter-spacing: var(--ls-h1); }
@media (max-width: 767px){ .t-h1{ font-size: var(--fs-h1-m); } }

.t-h2{ font: var(--fw-h2) var(--fs-h2-d)/var(--lh-hx) var(--font-sans); letter-spacing: var(--ls-h2); }
@media (max-width: 767px){ .t-h2{ font-size: var(--fs-h2-m); } }

.t-h3{ font: var(--fw-h3) var(--fs-h3-d)/var(--lh-hx) var(--font-sans); letter-spacing: var(--ls-h3); }
@media (max-width: 767px){ .t-h3{ font-size: var(--fs-h3-m); } }

.t-emphasis-lg{ font: var(--fw-emp) var(--fs-emp-lg-d)/var(--lh-emp) var(--font-sans); letter-spacing: var(--ls-emp-lg); }
@media (max-width: 767px){ .t-emphasis-lg{ font-size: var(--fs-emp-lg-m); } }

.t-emphasis-sm{ font: var(--fw-emp) var(--fs-emp-sm-d)/var(--lh-emp) var(--font-sans); letter-spacing: var(--ls-emp-sm); }
@media (max-width: 767px){ .t-emphasis-sm{ font-size: var(--fs-emp-sm-m); } }
        `,
            }}
        />
    )
}
