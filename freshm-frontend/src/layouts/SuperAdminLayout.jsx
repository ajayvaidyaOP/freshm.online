import React, { useState } from "react";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack,
  Typography, IconButton, Avatar, Menu, MenuItem, Divider, Tooltip, useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { sa, sprout, mono, display, useSaFonts, readUser } from "../superadmin/saTokens";
import logo from "../assets/logo.png";

const RAIL = 268;

const MENU = [
  { title: "Overview", path: "/super-admin/dashboard", icon: <DashboardRoundedIcon /> },
  { title: "Companies", path: "/super-admin/companies", icon: <BusinessRoundedIcon /> },
  { title: "Settings", path: "/super-admin/settings", icon: <TuneRoundedIcon /> },
];

function Brand() {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Box
        component="img" src={logo} alt="FreshM"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
        sx={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", background: "#fff" }}
      />
      <Box sx={{ lineHeight: 1 }}>
        <Typography sx={{ fontFamily: display, fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1 }}>
          fresh<span style={{ color: sa.lime }}>m</span>
        </Typography>
        <Typography sx={{ fontFamily: mono, fontSize: 9.5, letterSpacing: "0.34em", color: "rgba(255,255,255,0.5)", mt: 0.4 }}>
          PLATFORM
        </Typography>
      </Box>
    </Stack>
  );
}

function Rail({ onNavigate }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", background: sa.forestDeep }}>
      <Box sx={{ px: 2.5, pt: 3, pb: 2.5 }}><Brand /></Box>
      <List sx={{ px: 1.5, flexGrow: 1 }}>
        {MENU.map((item) => {
          const active = pathname === item.path || pathname.startsWith(item.path + "/");
          return (
            <ListItemButton
              key={item.path}
              onClick={() => { navigate(item.path); onNavigate?.(); }}
              sx={{
                borderRadius: 2.5, mb: 0.5, py: 1.1, px: 1.5, position: "relative",
                color: active ? "#fff" : "rgba(255,255,255,0.62)",
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                "&:hover": { background: "rgba(255,255,255,0.06)", color: "#fff" },
                "&::before": active ? { content: '""', position: "absolute", left: 0, top: 10, bottom: 10, width: 3, borderRadius: 3, background: sprout } : {},
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: active ? sa.limeBright : "rgba(255,255,255,0.55)" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 500 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography sx={{ fontFamily: mono, fontSize: 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          MANDIPRIME · v1.0
        </Typography>
      </Box>
    </Box>
  );
}

export default function SuperAdminLayout({ children }) {
  useSaFonts();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const user = readUser();
  const initials = (user.fullName || user.email || "S").slice(0, 1).toUpperCase();
  const active = [...MENU].sort((a, b) => b.path.length - a.path.length)
    .find((m) => pathname === m.path || pathname.startsWith(m.path + "/"));
  const pageTitle = active?.title || "Platform";

  const logout = () => { localStorage.removeItem("user"); navigate("/login"); };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: sa.bone }}>
      {isDesktop ? (
        <Box sx={{ width: RAIL, flexShrink: 0 }}>
          <Box sx={{ position: "fixed", width: RAIL, height: "100vh" }}><Rail /></Box>
        </Box>
      ) : (
        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: RAIL, border: "none" } }}>
          <Rail onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      )}

      <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Box sx={{
          position: "sticky", top: 0, zIndex: 10, height: 66, px: { xs: 2, md: 3.5 },
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(246,248,243,0.82)", backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${sa.line}`,
        }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {!isDesktop && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: sa.forest }}><MenuRoundedIcon /></IconButton>
            )}
            <Box>
              <Typography sx={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.18em", color: sa.leaf, textTransform: "uppercase" }}>
                Platform
              </Typography>
              <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 18, lineHeight: 1.1, color: sa.ink }}>
                {pageTitle}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: sa.ink, lineHeight: 1.1 }}>
                {user.fullName || "Super Admin"}
              </Typography>
              <Typography sx={{ fontSize: 11, color: sa.slate }}>{user.email || "SUPER_ADMIN"}</Typography>
            </Box>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ p: 0.5 }}>
                <Avatar sx={{ width: 38, height: 38, background: sprout, color: sa.forestDeep, fontWeight: 700 }}>{initials}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <Box sx={{ px: 2, py: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{user.fullName || "Super Admin"}</Typography>
                <Typography sx={{ fontSize: 12, color: sa.slate }}>{user.email}</Typography>
              </Box>
              <Divider />
              <MenuItem onClick={logout} sx={{ color: sa.stamp, mt: 0.5 }}>
                <LogoutRoundedIcon sx={{ fontSize: 18, mr: 1 }} /> Sign out
              </MenuItem>
            </Menu>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2, md: 3.5 }, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
