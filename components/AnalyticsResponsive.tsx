"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type DesktopAnalytics from "@/components/Analytics";

const AnalyticsDesktop = dynamic(() => import("@/components/Analytics"), { ssr: false });
const AnalyticsMobile = dynamic(() => import("@/components/AnalyticsMobile"), { ssr: false });

type AnalyticsProps = React.ComponentProps<typeof DesktopAnalytics>;

function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setIsMobile(m.matches);
    onChange();
    m.addEventListener ? m.addEventListener("change", onChange) : m.addListener(onChange);
    return () => {
      m.removeEventListener ? m.removeEventListener("change", onChange) : m.removeListener(onChange);
    };
  }, [query]);
  return isMobile;
}

export default function AnalyticsResponsive(props: AnalyticsProps) {
  const isMobile = useIsMobile("(max-width: 767px)");
  if (isMobile === null) return null;
  return isMobile ? <AnalyticsMobile {...props} /> : <AnalyticsDesktop {...props} />;
}
