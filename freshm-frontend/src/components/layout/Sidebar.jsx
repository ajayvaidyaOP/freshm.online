import React, { useEffect, useState } from "react";

import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessIcon from "@mui/icons-material/Business";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },

  {
    title: "Users",
    path: "/admin/users",
    icon: <PeopleIcon />,
  },

  {
    title: "Vendors",
    path: "/admin/vendors",
    icon: <PeopleIcon />,
  },

  {
    title: "Farmers",
    path: "/admin/farmers",
    icon: <AgricultureIcon />,
  },

  {
    title: "Articles",
    path: "/admin/articles",
    icon: <Inventory2Icon />,
  },

  {
    title: "Purchase",
    path: "/admin/purchase",
    icon: <ShoppingCartIcon />,
  },

  {
    title: "Payments",
    path: "/admin/payments",
    icon: <PaymentsIcon />,
  },

  {
    title: "Invoices",
    path: "/admin/invoices",
    icon: <ReceiptLongIcon />,
  },

  {
    title: "Reports",
    path: "/admin/reports",
    icon: <AssessmentIcon />,
  },

  {
    title: "Company",
    path: "/admin/company",
    icon: <BusinessIcon />,
  },

  {
    title: "Letter Head",
    path: "/admin/company/letterhead",
    icon: <ReceiptLongIcon />,
  },

  {
    title: "Settings",
    path: "/admin/settings",
    icon: <SettingsIcon />,
  },
];

// ============================================================
// DESIGN TOKENS — kept identical to the FreshM ERP login screen
// so the sidebar and the sign-in page read as one product.
// ============================================================
const palette = {
  forestDeep: "#0B2F22",
  forestMid: "#123B2A",
  forest: "#0F2E20",
  gold: "#C9A24B",
  goldLight: "#E7CD8B",
  rust: "#B5533C",
  paper: "#FAF6EC",
  sage: "#7E9A88",
  line: "rgba(201,162,75,0.28)",
};

// Desktop/tablet-landscape drawer width. Mobile uses its own
// capped width further down so it never overflows a narrow phone.
const DRAWER_WIDTH = 264;

// Same self-contained font loader used on the login screen. It
// no-ops if the fonts are already present, so mounting both
// screens in one app never double-loads anything.
function useTypography() {
  useEffect(() => {
    const id = "freshm-brand-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function Sidebar() {
  useTypography();

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // < md (tablets in portrait and phones) get the slide-over drawer.
  // >= md (tablets landscape, laptops, desktops) get the fixed rail.
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile drawer automatically whenever the route changes,
  // and whenever the viewport crosses back over to desktop size.
  useEffect(() => {
    if (isMobile) setMobileOpen(false);
  }, [location.pathname, isMobile]);

  // Lock background scroll while the mobile drawer is open, so the
  // page underneath doesn't scroll along with a touch-drag on iOS/Android.
  useEffect(() => {
    if (isMobile && mobileOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [isMobile, mobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const drawerContent = (
    <>
      {/* ---- Brand header ---- */}
      <Box
        sx={{
          minHeight: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderBottom: `1px solid ${palette.line}`,
          flexShrink: 0,
          position: "relative",
          // iOS notch / status-bar safe area
          pt: "env(safe-area-inset-top)",
        }}
      >
        {isMobile && (
          <IconButton
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            sx={{
              position: "absolute",
              top: "calc(10px + env(safe-area-inset-top))",
              right: 10,
              color: palette.paper,
              background: "rgba(255,255,255,0.06)",
              "&:hover": { background: "rgba(255,255,255,0.12)" },
            }}
            size="small"
          >
            <CloseRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}

        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: { xs: 20, sm: 22 },
            letterSpacing: 0.3,
            color: palette.paper,
            lineHeight: 1,
          }}
        >
          FreshM <Box component="span" sx={{ color: palette.gold }}>ERP</Box>
        </Typography>

        <Typography
          sx={{
            mt: 0.8,
            fontSize: 10.5,
            letterSpacing: 2.2,
            fontWeight: 600,
            color: palette.sage,
            textTransform: "uppercase",
          }}
        >
          Management System
        </Typography>
      </Box>

      {/* ---- Navigation ---- */}
      <List
        sx={{
          pt: 2,
          px: 1,
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.12)",
            borderRadius: 10,
          },
        }}
      >
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;

          return (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={active}
                sx={{
                  borderRadius: "10px",
                  pl: 1.75,
                  py: 1.05,
                  minHeight: 44, // comfortable touch target on phones/tablets
                  position: "relative",
                  transition: "background .15s ease, color .15s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.06)",
                  },
                  "&.Mui-selected": {
                    background: palette.gold,
                    "&:hover": {
                      background: palette.gold,
                    },
                  },
                  // gold indicator bar for the active route
                  "&.Mui-selected::before": {
                    content: '""',
                    position: "absolute",
                    left: -8,
                    top: "20%",
                    height: "60%",
                    width: 3,
                    borderRadius: 2,
                    background: palette.goldLight,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: active ? palette.forestDeep : palette.paper,
                    transition: "color .15s ease",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? palette.forestDeep : "rgba(250,246,236,0.9)",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* ---- Logout ---- */}
      <Box
        sx={{
          flexShrink: 0,
          px: 1,
          pt: 1,
          pb: "calc(20px + env(safe-area-inset-bottom))",
        }}
      >
        <Divider sx={{ borderColor: palette.line, mb: 1.5, mx: 1 }} />

        <Tooltip title="Sign out of FreshM ERP" placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: "10px",
              pl: 1.75,
              py: 1.05,
              minHeight: 44,
              color: "rgba(250,246,236,0.85)",
              transition: "background .15s ease, color .15s ease",
              "&:hover": {
                background: palette.rust,
                color: palette.paper,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontSize: 13.5, fontWeight: 600 }}
            />
          </ListItemButton>
        </Tooltip>

        <Typography
          sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: "rgba(126,154,136,0.7)",
            letterSpacing: 0.5,
          }}
        >
          v1.0.0 · Secure ERP
        </Typography>
      </Box>
    </>
  );

  return (
    <>
      {/* ---- Hamburger trigger — shown only when the drawer is closed on mobile ---- */}
      {isMobile && !mobileOpen && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          sx={{
            position: "fixed",
            top: "calc(14px + env(safe-area-inset-top))",
            left: 14,
            zIndex: (t) => t.zIndex.drawer + 2,
            width: 44,
            height: 44,
            borderRadius: "10px",
            color: palette.paper,
            background: palette.forest,
            boxShadow: "0 8px 20px -6px rgba(11,47,34,0.5)",
            "&:hover": { background: palette.forestDeep },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        // On mobile the drawer takes no layout space (it floats above
        // content); on desktop/tablet-landscape it reserves DRAWER_WIDTH.
        sx={{
          width: isMobile ? 0 : DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            // Capped so it never spans the full width of a narrow phone,
            // but still comfortable on tablets and desktops.
            width: isMobile ? "min(78vw, 300px)" : DRAWER_WIDTH,
            maxWidth: isMobile ? "85vw" : "none",
            boxSizing: "border-box",
            background: `linear-gradient(190deg, ${palette.forestDeep} 0%, ${palette.forest} 55%, ${palette.forestMid} 100%)`,
            color: palette.paper,
            borderRight: "none",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
