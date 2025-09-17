// Shared theme system for all Framer Code Components.

export type ColorSchemeName =
    | "purple"
    | "cyan"
    | "lime"
    | "holographic"
    | "green"
    | "purpleClassic"
    | "cyanClassic"
    | "limeClassic"
    | "greenClassic"
    | "holographicClassic"
    | "custom"

export type Scheme = {
    primary: string
    secondary: string
    badgeBg: string
    badgeBorder: string
    badgeText: string
    subtitleColor: string
    buttonGradient: string
    buttonTextColor: string
}

/* - Helpers -*/
export function hexToRgb(hex: string) {
    const m = hex.trim().replace("#", "")
    const n =
        m.length === 3
            ? m
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : m
    const int = parseInt(n, 16)
    const r = (int >> 16) & 255
    const g = (int >> 8) & 255
    const b = int & 255
    return { r, g, b }
}
export function rgba(hex: string, alpha: number) {
    const { r, g, b } = hexToRgb(hex)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/* Base (non-classic) schemes -*/
type BaseKey = "purple" | "cyan" | "lime" | "holographic" | "green"

const BASE_SCHEMES: Record<BaseKey, Scheme> = {
    purple: {
        primary: "#8B5CF6",
        secondary: "#A78BFA",
        badgeBg: "rgba(120, 100, 255, 0.2)",
        badgeBorder: "rgba(138, 92, 246, 0.3)",
        badgeText: "#A78BFA",
        subtitleColor: "#E9D5FF",
        buttonGradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
        buttonTextColor: "white",
    },
    cyan: {
        primary: "#00D9FF",
        secondary: "#00A3FF",
        badgeBg: rgba("#00D9FF", 0.15),
        badgeBorder: rgba("#00D9FF", 0.3),
        badgeText: "#00D9FF",
        subtitleColor: "#E0F2FE",
        buttonGradient: "linear-gradient(135deg, #00D9FF, #00A3FF)",
        buttonTextColor: "#000",
    },
    lime: {
        primary: "#BFFF00",
        secondary: "#9FD500",
        badgeBg: rgba("#BFFF00", 0.15),
        badgeBorder: rgba("#BFFF00", 0.3),
        badgeText: "#BFFF00",
        subtitleColor: "#D9F7BE",
        buttonGradient: "linear-gradient(135deg, #BFFF00, #9FD500)",
        buttonTextColor: "#000",
    },
    holographic: {
        primary: "#00F5FF",
        secondary: "#FF00E5",
        badgeBg: rgba("#00F5FF", 0.1),
        badgeBorder: rgba("#00F5FF", 0.2),
        badgeText: "#00F5FF",
        subtitleColor: "#E0F2FE",
        buttonGradient: "linear-gradient(135deg, #00F5FF, #FF00E5)",
        buttonTextColor: "white",
    },
    green: {
        primary: "#10B981",
        secondary: "#3B82F6",
        badgeBg: rgba("#10B981", 0.15),
        badgeBorder: rgba("#10B981", 0.3),
        badgeText: "#10B981",
        subtitleColor: "#A7F3D0",
        buttonGradient: "#10B981",
        buttonTextColor: "white",
    },
}


const GUIDE_PRIMARY = "#C96442"
const GUIDE_SECONDARY = "#E9E6DC"
const GUIDE_PRIMARY_FG = "#FFFFFF"

function classicOverDark(base: Scheme): Scheme {
    return {

        primary: GUIDE_PRIMARY,
        secondary: GUIDE_SECONDARY,
        badgeBg: rgba(GUIDE_PRIMARY, 0.12),
        badgeBorder: rgba(GUIDE_PRIMARY, 0.26),
        badgeText: GUIDE_PRIMARY,
        subtitleColor: base.subtitleColor,
        buttonGradient: GUIDE_PRIMARY,
        buttonTextColor: GUIDE_PRIMARY_FG,
    }
}

export const COLOR_SCHEMES: Record<
    Exclude<ColorSchemeName, "custom">,
    Scheme
> = {
    ...BASE_SCHEMES,
    purpleClassic: classicOverDark(BASE_SCHEMES.purple),
    cyanClassic: classicOverDark(BASE_SCHEMES.cyan),
    limeClassic: classicOverDark(BASE_SCHEMES.lime),
    greenClassic: classicOverDark(BASE_SCHEMES.green),
    holographicClassic: classicOverDark(BASE_SCHEMES.holographic),
}

/* -------------------- Options for controls -------------------- */
export const SCHEME_OPTIONS: ColorSchemeName[] = [
    "purple",
    "cyan",
    "lime",
    "holographic",
    "green",
    "purpleClassic",
    "cyanClassic",
    "limeClassic",
    "greenClassic",
    "holographicClassic",
    "custom",
]

export const SCHEME_OPTION_TITLES = [
    "Purple",
    "Cyan",
    "Lime",
    "Holographic",
    "Green",
    "Purple (Classic)",
    "Cyan (Classic)",
    "Lime (Classic)",
    "Green (Classic)",
    "Holographic (Classic)",
    "Custom",
]

export function resolveScheme(
    name: ColorSchemeName,
    primaryColor = "#8B5CF6",
    secondaryColor = "#A78BFA"
): Scheme {
    if (name !== "custom") return COLOR_SCHEMES[name as Exclude<ColorSchemeName, "custom">]
    return {
        primary: primaryColor,
        secondary: secondaryColor,
        badgeBg: rgba(primaryColor, 0.15),
        badgeBorder: rgba(primaryColor, 0.3),
        badgeText: primaryColor,
        subtitleColor: "#E9D5FF",
        buttonGradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        buttonTextColor: "white",
    }
}

export function resolveGradientBackground(
    name: ColorSchemeName,
    scheme: Scheme
): string {
    const DARK_BASE = `linear-gradient(180deg,#0b0f16 0%,#0a0d14 42%,#090d12 100%)`

    const classicBase = String(name).endsWith("Classic")
        ? (String(name).replace("Classic", "") as "purple" | "cyan" | "lime" | "holographic" | "green")
        : null

    const bgTints = classicBase ? BASE_SCHEMES[classicBase] : scheme
    const effectiveName = classicBase ?? (name as any)

    switch (effectiveName) {
        case "purple":
            return `
        radial-gradient(58% 50% at 12% 56%, ${rgba(bgTints.primary, 0.18)} 0%, transparent 60%),
        radial-gradient(50% 44% at 82% 40%, ${rgba(bgTints.secondary, 0.12)} 0%, transparent 62%),
        ${DARK_BASE}
      `
        case "cyan":
            return `
        radial-gradient(58% 50% at 12% 56%, ${rgba(bgTints.primary, 0.16)} 0%, transparent 60%),
        radial-gradient(50% 44% at 82% 40%, ${rgba(bgTints.secondary, 0.12)} 0%, transparent 62%),
        ${DARK_BASE}
      `
        case "lime":
            return `
        radial-gradient(58% 50% at 18% 60%, ${rgba(bgTints.primary, 0.14)} 0%, transparent 62%),
        ${DARK_BASE}
      `
        case "holographic":
            return `linear-gradient(to bottom, #0a0a0f, #0f0f14)`
        case "green":
            return `
        radial-gradient(58% 50% at 20% 58%, ${rgba(bgTints.primary, 0.12)} 0%, transparent 60%),
        radial-gradient(58% 50% at 82% 42%, ${rgba(bgTints.secondary, 0.08)} 0%, transparent 62%),
        ${DARK_BASE}
      `
        case "custom":
        default:
            return `
        radial-gradient(58% 50% at 12% 56%, ${rgba(bgTints.primary, 0.18)} 0%, transparent 60%),
        radial-gradient(50% 44% at 82% 40%, ${rgba(bgTints.secondary, 0.12)} 0%, transparent 62%),
        ${DARK_BASE}
      `
    }
}

const accentSchemes = {
    COLOR_SCHEMES: { ...BASE_SCHEMES },
    SCHEME_OPTIONS,
    SCHEME_OPTION_TITLES,
    resolveScheme,
    resolveGradientBackground,
    rgba,
    hexToRgb,
}
export default accentSchemes
