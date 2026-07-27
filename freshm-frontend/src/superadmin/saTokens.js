import { useEffect } from "react";

/* ============================================================
   Self-contained design tokens for the Super Admin ("Platform")
   portal. No dependency on the app-wide theme — drop the folder
   in and it just works. Palette is drawn from the freshm logo:
   forest green + lime leaf on cool packhouse white.
   ============================================================ */
export const sa = {
  forestDeep: "#0E3320",
  forest: "#14432C",
  canopy: "#1E6B3A",
  leaf: "#2E8B4E",
  lime: "#7DBE3C",
  limeBright: "#A7D84F",

  paper: "#FFFFFF",
  bone: "#F6F8F3",
  mist: "#EAEFE7",

  ink: "#10231A",
  slate: "#5C6B60",
  faint: "#8A988C",

  stamp: "#C2410C",

  line: "rgba(20,67,44,0.10)",
  lineStrong: "rgba(20,67,44,0.18)",
};

export const sprout = `linear-gradient(135deg, ${sa.canopy} 0%, ${sa.leaf} 45%, ${sa.lime} 100%)`;

export const mono = "'IBM Plex Mono', ui-monospace, monospace";
export const display = "'Bricolage Grotesque', 'Segoe UI', sans-serif";

/* Loads the type families (no-ops if already present). */
export function useSaFonts() {
  useEffect(() => {
    const id = "sa-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

export const inr = (n) => `₹ ${Number(n || 0).toLocaleString("en-IN")}`;

export function readUser() {
  try { return JSON.parse(localStorage.getItem("user")) || {}; }
  catch { return {}; }
}
