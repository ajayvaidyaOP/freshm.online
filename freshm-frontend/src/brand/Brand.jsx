import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { palette } from "../theme/theme";
import logo from "../assets/logo.png";

/* Loads the three type families the design relies on:
   Bricolage Grotesque (display), Inter (body), IBM Plex Mono (weights/data).
   No-ops if already present, so mounting it anywhere is safe. */
export function BrandFonts() {
  useEffect(() => {
    const id = "freshm-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

/* The circular freshm mark. size = px diameter. */
export function Logo({ size = 40, ring = true }) {
  return (
    <Box
      component="img"
      src={logo}
      alt="FreshM"
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "block",
        objectFit: "cover",
        background: "#fff",
        boxShadow: ring ? "0 0 0 1px rgba(255,255,255,0.35), 0 6px 18px -8px rgba(0,0,0,0.5)" : "none",
      }}
    />
  );
}

/* Lockup: mark + wordmark. `onDark` flips text colour for the green rail. */
export function Wordmark({ size = 38, onDark = false, subtitle = "ERP" }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Logo size={size} />
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          sx={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: size * 0.5,
            letterSpacing: "-0.02em",
            color: onDark ? "#fff" : palette.forest,
            lineHeight: 1,
          }}
        >
          fresh<span style={{ color: palette.lime }}>m</span>
        </Typography>
        <Typography
          sx={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9.5,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: onDark ? "rgba(255,255,255,0.55)" : palette.slate,
            mt: 0.4,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}
