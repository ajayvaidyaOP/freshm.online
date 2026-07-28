import React, { useState } from "react";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack,
  Typography, IconButton, Avatar, Menu, MenuItem, Divider, Tooltip, useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { palette } from "../../theme/theme";
import { Wordmark, BrandFonts } from "../../brand/Brand";

const RAIL = 268;

function readUser() {
  try { return JSON.parse(localStorage.getItem("user")) || {}; }
  catch { return {}; }
}

function RailContent({ menu, portal, onNavigate }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", background: palette.forestDeep }}>
      {/* Brand */}
      <Box sx={{ px: 2.5, pt: 3, pb: 2.5 }}>
        <Wordmark size={40} onDark subtitle={portal} />
      </Box>

      {/* Nav */}
      <List sx={{ px: 1.5, flexGrow: 1, overflowY: "auto" }}>
        {menu.map((item) => {
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
                "&::before": active ? {
                  content: '""', position: "absolute", left: 0, top: 10, bottom: 10, width: 3,
                  borderRadius: 3, background: sprout,
                } : {},
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: active ? palette.limeBright : "rgba(255,255,255,0.55)" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 500 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          MANDIPRIME · v1.0
        </Typography>
      </Box>
    </Box>
  );
}

export default function PortalLayout({ menu, portal = "Portal", title, children }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const user = readUser();
  const initials = (user.fullName || user.email || "U").slice(0, 1).toUpperCase();
  const { pathname } = useLocation();
  const active = [...menu]
    .sort((a, b) => b.path.length - a.path.length)
    .find((m) => pathname === m.path || pathname.startsWith(m.path + "/"));
  const pageTitle = title || active?.title || portal;

  const logout = () => { localStorage.removeItem("user"); navigate("/login"); };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: palette.bone }}>
      <BrandFonts />

      {/* Sidebar */}
      {isDesktop ? (
        <Box sx={{ width: RAIL, flexShrink: 0 }}>
          <Box sx={{ position: "fixed", width: RAIL, height: "100vh" }}>
            <RailContent menu={menu} portal={portal} />
          </Box>
        </Box>
      ) : (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: RAIL, border: "none" } }}
        >
          <RailContent menu={menu} portal={portal} onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      )}

      {/* Main column */}
      <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Box
          sx={{
            position: "sticky", top: 0, zIndex: 10,
            height: 66, px: { xs: 2, md: 3.5 },
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(246,248,243,0.82)", backdropFilter: "blur(10px)",
            borderBottom: `1px solid ${palette.line}`,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            {!isDesktop && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: palette.forest }}>
                <MenuRoundedIcon />
              </IconButton>
            )}
            <Box>
              <Typography variant="overline" sx={{ color: palette.leaf, lineHeight: 1 }}>{portal}</Typography>
              <Typography sx={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.1, color: palette.ink }}>
                {pageTitle}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.ink, lineHeight: 1.1 }}>
                {user.fullName || "User"}
              </Typography>
              <Typography sx={{ fontSize: 11, color: palette.slate }}>
                {user.companyName || user.role || ""}
              </Typography>
            </Box>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ p: 0.5 }}>
                <Avatar sx={{ width: 38, height: 38, background: sprout, color: palette.forestDeep, fontWeight: 700 }}>
                  {initials}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{user.fullName || "User"}</Typography>
                <Typography sx={{ fontSize: 12, color: palette.slate }}>{user.email}</Typography>
              </Box>
              <Divider />
              <MenuItem onClick={logout} sx={{ color: palette.stamp, mt: 0.5 }}>
                <LogoutRoundedIcon sx={{ fontSize: 18, mr: 1 }} /> Sign out
              </MenuItem>
            </Menu>
          </Stack>
        </Box>

        {/* Page body */}
        <Box sx={{ p: { xs: 2, md: 3.5 }, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
