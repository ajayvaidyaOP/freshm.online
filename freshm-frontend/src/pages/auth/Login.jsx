import React, { useState, useEffect } from "react";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Avatar,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
  Paper,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForwardRounded,
  Agriculture,
  Public,
  LocalShipping,
  TrendingUp,
  VerifiedRounded,
  Android,
  Apple,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../services/authService";

import logo from "../../assets/images/logo.png";

// ============================================================
// DESIGN TOKENS — FreshM ERP
// Palette pulled from the subject itself: deep field-green,
// harvest gold, rust-red (cargo stamp), warm paper cream.
// ============================================================
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

// Inject the two type families this design relies on — a serif
// with real character for the wordmark/headlines, and a plain
// grid-friendly sans for the interface + a mono for "manifest"
// data. Self-contained so this file works without touching
// index.html.
function useTypography() {
  useEffect(() => {
    const id = "freshm-login-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function Login() {
  useTypography();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await loginService({
        email,
        password,
      });

      const user = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "SUPER_ADMIN") {
        navigate("/super-admin/dashboard");
      } else if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (user.role === "USER") {
        navigate("/user/dashboard");
      } else {
        setError("Invalid user role");
      }
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: palette.paperDim,
        p: { xs: 0, md: 4 },
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1320,
          minHeight: { md: 740 },
          display: "flex",
          overflow: "hidden",
          borderRadius: { xs: 0, md: 5 },
          boxShadow: "0 50px 100px -30px rgba(11,47,34,0.45)",
          border: `1px solid ${palette.line}`,
        }}
      >
        {/* ================= LEFT — BRAND PANEL ================= */}
        <Box
          sx={{
            width: "46%",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            padding: 7,
            color: palette.paper,
            background: `linear-gradient(175deg, ${palette.forestDeep} 0%, ${palette.forest} 55%, ${palette.forestMid} 100%)`,
            overflow: "hidden",
          }}
        >
          {/* furrow-line field texture — subject-grounded, not a stock blob */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.08,
              backgroundImage: `repeating-linear-gradient(115deg, ${palette.gold} 0px, ${palette.gold} 1px, transparent 1px, transparent 34px)`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 520,
              height: 520,
              borderRadius: "50%",
              top: -220,
              right: -220,
              background: `radial-gradient(circle, ${palette.goldLight}22 0%, transparent 70%)`,
            }}
          />

          {/* ---- signature element: cargo / export manifest stamp ---- */}
          <Box
            sx={{
              position: "absolute",
              top: 46,
              right: 40,
              width: 118,
              height: 118,
              borderRadius: "50%",
              border: `1.5px dashed ${palette.gold}`,
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-14deg)",
              opacity: 0.85,
            }}
          >
            <Stack alignItems="center" spacing={0.3}>
              <VerifiedRounded sx={{ color: palette.gold, fontSize: 22 }} />
              <Typography
                sx={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 9,
                  letterSpacing: 1.2,
                  color: palette.goldLight,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                VERIFIED
                <br />
                MANIFEST
              </Typography>
            </Stack>
          </Box>

          {/* ---- header block ---- */}
          <Box sx={{ zIndex: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={logo}
                sx={{
                  width: 62,
                  height: 62,
                  background: palette.paper,
                  padding: 0.8,
                  border: `1px solid ${palette.line}`,
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: 30,
                    lineHeight: 1,
                    color: palette.paper,
                  }}
                >
                  FreshM ERP
                </Typography>
                <Typography
                  sx={{
                    mt: 0.7,
                    fontSize: 11.5,
                    letterSpacing: 3,
                    color: palette.sage,
                    fontWeight: 600,
                  }}
                >
                  AGRICULTURE · EXPORT · IMPORT
                </Typography>
              </Box>
            </Stack>

            <Typography
              sx={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 26,
                lineHeight: 1.45,
                mt: 6,
                maxWidth: 420,
                color: palette.goldLight,
              }}
            >
              From the field to the freight manifest — one ledger for
              everything in between.
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                fontSize: 15,
                lineHeight: 1.8,
                maxWidth: 400,
                color: "rgba(250,246,236,0.72)",
              }}
            >
              Inventory, sales, purchase, farmer and vendor relationships,
              and trade documentation — run from a single, dependable
              dashboard.
            </Typography>
          </Box>

          {/* ---- feature ledger rows ---- */}
          <Stack sx={{ zIndex: 2 }} divider={<Divider sx={{ borderColor: palette.line }} />}>
            <FeatureRow
              icon={<LocalShipping sx={{ fontSize: 19 }} />}
              title="Global Agro Trade"
              description="Export and import operations, tracked end to end"
            />
            <FeatureRow
              icon={<Agriculture sx={{ fontSize: 19 }} />}
              title="Farm Produce Tracking"
              description="Every lot traced from farm gate to customer"
            />
            <FeatureRow
              icon={<TrendingUp sx={{ fontSize: 19 }} />}
              title="Business Analytics"
              description="Live reporting across the full operation"
            />
          </Stack>

          {/* ---- footer ---- */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ zIndex: 2, pt: 3 }}
          >
            <Typography sx={{ fontSize: 12, color: "rgba(250,246,236,0.5)" }}>
              © 2026 FreshM Technologies Pvt Ltd
            </Typography>
            <Stack direction="row" spacing={0.7} alignItems="center">
              <Public sx={{ fontSize: 14, color: palette.sage }} />
              <Typography sx={{ fontSize: 12, color: palette.sage }}>
                Multi-region
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* ================= RIGHT — SIGN-IN PANEL ================= */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: 4, sm: 6, md: 8 },
            background: palette.paper,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Typography
              sx={{
                fontSize: 11.5,
                letterSpacing: 2.5,
                fontWeight: 700,
                color: palette.rust,
                mb: 1.5,
              }}
            >
              SECURE BUSINESS LOGIN
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: 36,
                color: palette.ink,
              }}
            >
              Welcome back
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                mb: 4,
                color: palette.inkSoft,
                fontSize: 14.5,
                lineHeight: 1.7,
              }}
            >
              Sign in to access your FreshM ERP dashboard and pick up right
              where you left off.
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  border: "1px solid #f2c2b8",
                }}
              >
                {error}
              </Alert>
            )}

            <Typography
              sx={{ fontSize: 13, fontWeight: 600, color: palette.ink, mb: 1 }}
            >
              Email address
            </Typography>

            <TextField
              fullWidth
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ fontSize: 20, color: palette.sage }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />

            <Typography
              sx={{ fontSize: 13, fontWeight: 600, color: palette.ink, mb: 1 }}
            >
              Password
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ fontSize: 20, color: palette.sage }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: 19 }} />
                      ) : (
                        <Visibility sx={{ fontSize: 19 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ ...fieldSx, mb: 0 }}
            />

            <Box display="flex" justifyContent="flex-end" mt={1.5} mb={4}>
              <Typography
                sx={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: palette.forest,
                  cursor: "pointer",
                  "&:hover": { color: palette.rust },
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              endIcon={!loading && <ArrowForwardRounded />}
              sx={{
                height: 56,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 15.5,
                fontWeight: 700,
                color: palette.paper,
                background: `linear-gradient(135deg, ${palette.forest}, ${palette.forestDeep})`,
                boxShadow: "0 18px 34px -14px rgba(15,46,32,0.55)",
                transition: "all .2s ease",
                "&:hover": {
                  background: `linear-gradient(135deg, ${palette.forestDeep}, #081f16)`,
                  boxShadow: "0 20px 38px -12px rgba(15,46,32,0.65)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-disabled": {
                  color: palette.paper,
                  opacity: 0.7,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: palette.paper }} />
              ) : (
                "Sign in to dashboard"
              )}
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ my: 4 }}
            >
              <Divider sx={{ flex: 1, borderColor: palette.line }} />
              <Typography
                sx={{ fontSize: 11.5, letterSpacing: 1.5, color: palette.sage }}
              >
                MOBILE APPLICATIONS
              </Typography>
              <Divider sx={{ flex: 1, borderColor: palette.line }} />
            </Stack>

            <Stack spacing={1.5}>
              <AppRow
                icon={<Android sx={{ fontSize: 20 }} />}
                iconBg={palette.forest}
                title="Android app"
                subtitle="Download from Play Store"
              />
              <AppRow
                icon={<Apple sx={{ fontSize: 20 }} />}
                iconBg="#1a1a1a"
                title="iPhone app"
                subtitle="Available on App Store"
              />
            </Stack>

            {/* footer manifest strip — echoes the left panel's stamp motif */}
            <Box
              sx={{
                mt: 5,
                pt: 3,
                borderTop: `1px dashed ${palette.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={0.8} alignItems="center">
                <VerifiedRounded sx={{ fontSize: 15, color: palette.gold }} />
                <Typography sx={{ fontSize: 11.5, color: palette.inkSoft }}>
                  Version 1.0.0 · Secure ERP
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: palette.sage,
                }}
              >
                © 2026 FreshM
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

// ============================================================
// Shared style object for text fields — quiet, paper-toned,
// forest-green focus ring instead of default MUI blue.
// ============================================================
const fieldSx = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    height: 54,
    borderRadius: 2,
    background: "#fff",
    fontSize: 14.5,
    "& fieldset": {
      borderColor: "rgba(23,35,28,0.14)",
    },
    "&:hover fieldset": {
      borderColor: palette.sage,
    },
    "&.Mui-focused fieldset": {
      borderColor: palette.forest,
      borderWidth: "1.5px",
    },
  },
};

// ============================================================
// Sub-components
// ============================================================
function FeatureRow({ icon, title, description }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1.6 }}>
      <Box
        sx={{
          width: 38,
          height: 38,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: `1px solid ${palette.line}`,
          color: palette.gold,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 14, color: palette.paper }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: "rgba(250,246,236,0.6)" }}>
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}

function AppRow({ icon, iconBg, title, subtitle }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.8,
        borderRadius: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(23,35,28,0.1)",
        background: "#fff",
        transition: "border-color .15s ease",
        "&:hover": { borderColor: palette.sage },
      }}
    >
      <Stack direction="row" spacing={1.8} alignItems="center">
        <Avatar sx={{ background: iconBg, width: 38, height: 38 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: palette.ink }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: palette.inkSoft }}>
            {subtitle}
          </Typography>
        </Box>
      </Stack>
      <IconButton
        size="small"
        sx={{
          border: `1px solid ${palette.line}`,
          color: palette.forest,
        }}
      >
        <ArrowForwardRounded sx={{ fontSize: 17 }} />
      </IconButton>
    </Paper>
  );
}
