import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// ============================================================
// DESIGN TOKENS — same palette as the login screen and sidebar.
// NOTE: DRAWER_WIDTH must stay in sync with the value in
// Sidebar.jsx (currently 264) so the AppBar lines up correctly
// with the fixed rail on desktop.
// ============================================================
const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  rust: "#B5533C",
  ink: "#17231C",
  inkSoft: "#5C6B61",
  line: "rgba(15,46,32,0.08)",
};

const DRAWER_WIDTH = 264;

export default function Topbar() {
  const [anchor, setAnchor] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        // On desktop the bar starts after the fixed sidebar rail;
        // on mobile it spans full width (the drawer floats above it).
        width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        background: "#FFFFFF",
        color: palette.ink,
        borderBottom: `1px solid ${palette.line}`,
        boxShadow: "0 4px 16px rgba(15,46,32,0.05)",
        zIndex: (t) => t.zIndex.drawer - 1, // stays under the sidebar/hamburger
      }}
    >
      <Toolbar
        sx={{
          // extra left padding on mobile so the title never sits
          // under the sidebar's floating hamburger button
          pl: isMobile ? "68px" : 3,
          pr: { xs: 2, sm: 3 },
          gap: 1,
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: { xs: 17, sm: 19 },
            letterSpacing: 0.2,
            color: palette.forest,
          }}
        >
          FreshM <Box component="span" sx={{ color: palette.gold }}>ERP</Box>
        </Typography>

        <IconButton
          sx={{
            color: palette.forest,
            "&:hover": { background: "rgba(15,46,32,0.06)" },
          }}
        >
          <NotificationsRoundedIcon />
        </IconButton>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{
            cursor: "pointer",
            ml: 0.5,
            pl: 1,
            pr: 0.5,
            py: 0.5,
            borderRadius: "10px",
            transition: "background .15s ease",
            "&:hover": { background: "rgba(15,46,32,0.05)" },
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
              fontSize: 13.5,
              fontWeight: 600,
              color: palette.ink,
            }}
          >
            Admin
          </Typography>

          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontSize: 14.5,
              fontWeight: 700,
              background: palette.forest,
            }}
          >
            A
          </Avatar>

          <KeyboardArrowDownRoundedIcon
            sx={{
              fontSize: 18,
              color: palette.inkSoft,
              transform: Boolean(anchor) ? "rotate(180deg)" : "none",
              transition: "transform .15s ease",
            }}
          />
        </Box>

        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 190,
              borderRadius: 2.5,
              border: `1px solid ${palette.line}`,
              boxShadow: "0 20px 40px -20px rgba(15,46,32,0.3)",
            },
          }}
        >
          <MenuItem
            onClick={() => setAnchor(null)}
            sx={{
              fontSize: 13.5,
              gap: 1.25,
              py: 1.1,
              "&:hover": { background: "rgba(201,162,75,0.12)" },
            }}
          >
            <PersonRoundedIcon sx={{ fontSize: 18, color: palette.forest }} />
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => setAnchor(null)}
            sx={{
              fontSize: 13.5,
              gap: 1.25,
              py: 1.1,
              "&:hover": { background: "rgba(201,162,75,0.12)" },
            }}
          >
            <SettingsRoundedIcon sx={{ fontSize: 18, color: palette.forest }} />
            Settings
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem
            onClick={handleLogout}
            sx={{
              fontSize: 13.5,
              gap: 1.25,
              py: 1.1,
              color: palette.rust,
              "&:hover": {
                background: palette.rust,
                color: "#fff",
                "& .MuiSvgIcon-root": { color: "#fff" },
              },
            }}
          >
            <LogoutRoundedIcon sx={{ fontSize: 18, color: palette.rust }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
