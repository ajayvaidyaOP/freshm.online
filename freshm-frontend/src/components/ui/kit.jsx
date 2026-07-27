import React from "react";
import { Box, Card, Stack, Typography, Chip, LinearProgress } from "@mui/material";
import { palette, sprout } from "../../theme/theme";

/* ============================================================
   SIGNATURE ELEMENT — the "weigh-readout" tile.
   Stat cards styled like a digital weighing-scale display:
   mono digits, a unit tag, a lime baseline, and a faint
   scan-line. This is the one bold, brand-specific device;
   everything else stays quiet around it.
   ============================================================ */
export function StatTile({ label, value, unit, icon, tone = "forest", delta }) {
  const accent =
    tone === "lime" ? palette.leaf : tone === "stamp" ? palette.stamp : palette.forest;
  return (
    <Card
      sx={{
        p: 2.25,
        position: "relative",
        overflow: "hidden",
        height: "100%",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(180deg, rgba(16,35,26,0.03) 0 1px, transparent 1px 5px)",
          pointerEvents: "none",
          opacity: 0.5,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="overline" sx={{ color: palette.slate }}>
          {label}
        </Typography>
        {icon && (
          <Box
            sx={{
              width: 34, height: 34, borderRadius: 10,
              display: "grid", placeItems: "center",
              color: accent, background: "rgba(46,139,78,0.10)",
            }}
          >
            {icon}
          </Box>
        )}
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={0.75} sx={{ mt: 1.25 }}>
        <Typography
          sx={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 600,
            fontSize: 30,
            lineHeight: 1,
            color: palette.ink,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: palette.slate }}>
            {unit}
          </Typography>
        )}
      </Stack>

      <Box sx={{ mt: 1.25, height: 3, borderRadius: 3, background: sprout, opacity: 0.9, width: "42%" }} />

      {delta != null && (
        <Typography variant="caption" sx={{ mt: 1, display: "block", color: palette.slate }}>
          {delta}
        </Typography>
      )}
    </Card>
  );
}

/* A quiet content card with an eyebrow label + optional action. */
export function SectionCard({ title, eyebrow, action, children, sx }) {
  return (
    <Card sx={{ p: { xs: 2, md: 2.5 }, ...sx }}>
      {(title || action) && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Box>
            {eyebrow && (
              <Typography variant="overline" sx={{ color: palette.leaf, display: "block" }}>
                {eyebrow}
              </Typography>
            )}
            {title && (
              <Typography variant="h6" sx={{ color: palette.ink }}>
                {title}
              </Typography>
            )}
          </Box>
          {action}
        </Stack>
      )}
      {children}
    </Card>
  );
}

/* Page header used at the top of every screen. */
export function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "flex-end" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Box>
        {eyebrow && (
          <Typography variant="overline" sx={{ color: palette.leaf }}>
            {eyebrow}
          </Typography>
        )}
        <Typography variant="h4" sx={{ color: palette.ink, mt: 0.25 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ mt: 0.5, maxWidth: 560 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Stack>
  );
}

/* Produce grade label — styled like a crate grade sticker. */
export function GradeChip({ label, tone = "leaf" }) {
  const c = tone === "lime" ? palette.lime : palette.leaf;
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 600,
        color: palette.forestDeep,
        background: "rgba(125,190,60,0.16)",
        border: `1px solid ${c}`,
        borderRadius: 1,
      }}
    />
  );
}

/* Article-wise stock as a labelled horizontal bar. */
export function MiniBar({ label, value, max, unit = "kg", sub }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <Box sx={{ mb: 1.75 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="body2" sx={{ color: palette.ink, fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography
          sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: palette.slate }}
        >
          {Number(value).toLocaleString("en-IN")} {unit}
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 8, borderRadius: 6, background: palette.mist,
          "& .MuiLinearProgress-bar": { borderRadius: 6, background: sprout },
        }}
      />
      {sub && (
        <Typography variant="caption" sx={{ color: palette.faint }}>
          {sub}
        </Typography>
      )}
    </Box>
  );
}

/* Empty state — an invitation to act, never a dead end. */
export function EmptyState({ icon, title, hint, action }) {
  return (
    <Stack alignItems="center" spacing={1.5} sx={{ py: 6, textAlign: "center" }}>
      <Box
        sx={{
          width: 56, height: 56, borderRadius: 16, display: "grid", placeItems: "center",
          color: palette.leaf, background: "rgba(46,139,78,0.10)",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ color: palette.ink }}>{title}</Typography>
      {hint && <Typography variant="body2" sx={{ maxWidth: 380 }}>{hint}</Typography>}
      {action}
    </Stack>
  );
}
