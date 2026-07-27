import { createTheme } from "@mui/material/styles";

/* ============================================================
   FreshM ERP — "Packhouse" design tokens
   Grounded in the brand's own world: forest-green leaf mark,
   lime gradient, and the crisp cool-white surfaces of a produce
   grading/packing house. Deliberately NOT warm cream — the
   surfaces are cool green-white so weights, grades and produce
   read clean, like a sorting table.
   ============================================================ */
export const palette = {
  // greens (from the freshm leaf mark)
  forestDeep: "#0E3320",
  forest: "#14432C",
  canopy: "#1E6B3A",
  leaf: "#2E8B4E",
  lime: "#7DBE3C",
  limeBright: "#A7D84F",

  // cool packhouse surfaces
  paper: "#FFFFFF",
  bone: "#F6F8F3",
  mist: "#EAEFE7",

  // ink + muted
  ink: "#10231A",
  slate: "#5C6B60",
  faint: "#8A988C",

  // restrained export-stamp accent (warnings / returns only)
  stamp: "#C2410C",

  line: "rgba(20,67,44,0.10)",
  lineStrong: "rgba(20,67,44,0.18)",
};

// The signature gradient — leaf → lime, used sparingly on the
// active rail, primary actions, and the weigh-readout underline.
export const sprout = `linear-gradient(135deg, ${palette.canopy} 0%, ${palette.leaf} 45%, ${palette.lime} 100%)`;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: palette.forest, dark: palette.forestDeep, light: palette.canopy, contrastText: "#fff" },
    secondary: { main: palette.lime, contrastText: palette.forestDeep },
    success: { main: palette.leaf },
    warning: { main: "#B7791F" },
    error: { main: palette.stamp },
    background: { default: palette.bone, paper: palette.paper },
    text: { primary: palette.ink, secondary: palette.slate },
    divider: palette.line,
  },

  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
    overline: { fontWeight: 700, letterSpacing: "0.14em", fontSize: 11 },
    body2: { color: palette.slate },
  },

  shape: { borderRadius: 14 },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: palette.bone, color: palette.ink },
        "::selection": { background: "rgba(125,190,60,0.28)" },
        "*::-webkit-scrollbar": { width: 10, height: 10 },
        "*::-webkit-scrollbar-thumb": {
          background: "rgba(20,67,44,0.22)", borderRadius: 8, border: "2px solid transparent", backgroundClip: "content-box",
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { height: 44, borderRadius: 11, fontWeight: 600, paddingInline: 18 },
        containedPrimary: {
          background: palette.forest, color: "#fff",
          "&:hover": { background: palette.forestDeep },
        },
        outlinedPrimary: { borderColor: palette.lineStrong, "&:hover": { borderColor: palette.canopy, background: "rgba(46,139,78,0.06)" } },
        sizeSmall: { height: 36, paddingInline: 14 },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: palette.paper,
          borderRadius: 18,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 1px 2px rgba(16,35,26,0.04), 0 18px 40px -24px rgba(14,51,32,0.28)",
        },
      },
    },

    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
        outlined: { borderColor: palette.lineStrong },
      },
    },

    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: palette.paper, borderRadius: 11,
            "& fieldset": { borderColor: palette.lineStrong },
            "&:hover fieldset": { borderColor: palette.canopy },
            "&.Mui-focused fieldset": { borderColor: palette.canopy, borderWidth: 1.5 },
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase", letterSpacing: "0.08em",
          fontSize: 11, fontWeight: 700, color: palette.slate,
          background: palette.bone, borderBottom: `1px solid ${palette.lineStrong}`,
        },
        root: { borderBottom: `1px solid ${palette.line}` },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: palette.forestDeep, fontWeight: 500, fontSize: 12, borderRadius: 8 },
        arrow: { color: palette.forestDeep },
      },
    },

    MuiDialog: { styleOverrides: { paper: { borderRadius: 20, border: `1px solid ${palette.line}` } } },
  },
});

export default theme;
