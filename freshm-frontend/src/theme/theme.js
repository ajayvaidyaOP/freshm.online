import { createTheme } from "@mui/material/styles";

const palette = {
  forestDeep: "#0B2F22",
  forestMid: "#123B2A",
  forest: "#0F2E20",

  gold: "#C9A24B",
  goldLight: "#E7CD8B",

  rust: "#B5533C",

  paper: "#FAF6EC",
  paperDim: "#F3EDDF",

  ink: "#17231C",
  inkSoft: "#4B5A50",

  sage: "#7E9A88",

  line: "rgba(201,162,75,0.35)",
};

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: palette.forest,
    },

    secondary: {
      main: palette.gold,
    },

    success: {
      main: "#2E7D32",
    },

    warning: {
      main: palette.gold,
    },

    error: {
      main: palette.rust,
    },

    background: {
      default: palette.paperDim,
      paper: palette.paper,
    },

    text: {
      primary: palette.ink,
      secondary: palette.inkSoft,
    },
  },

  typography: {
    fontFamily: "'Inter', sans-serif",

    h3: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 600,
    },

    h4: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 600,
    },

    h5: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 600,
    },

    h6: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 600,
    },

    button: {
      fontFamily: "'Inter', sans-serif",
      textTransform: "none",
      fontWeight: 700,
    },

    body1: {
      fontFamily: "'Inter', sans-serif",
    },

    body2: {
      fontFamily: "'Inter', sans-serif",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: palette.paperDim,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          height: 48,
          borderRadius: 12,
          fontWeight: 700,
          boxShadow: "none",
        },

        containedPrimary: {
          background: `linear-gradient(135deg, ${palette.forest}, ${palette.forestDeep})`,
          color: "#fff",

          "&:hover": {
            background: `linear-gradient(135deg, ${palette.forestDeep}, #081f16)`,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: palette.paper,
          borderRadius: 24,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 25px 60px rgba(11,47,34,0.08)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: palette.paper,
          borderRadius: 20,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: "#fff",
            borderRadius: 12,

            "& fieldset": {
              borderColor: "rgba(23,35,28,.14)",
            },

            "&:hover fieldset": {
              borderColor: palette.sage,
            },

            "&.Mui-focused fieldset": {
              borderColor: palette.forest,
              borderWidth: 1.5,
            },
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          background: palette.paperDim,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export { palette };
export default theme;