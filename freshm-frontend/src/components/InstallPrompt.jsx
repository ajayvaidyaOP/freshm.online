import React, { useEffect, useState } from "react";
import { Snackbar, Button, Dialog, DialogTitle, DialogContent, Typography, Stack, Box, IconButton } from "@mui/material";
import InstallMobileRoundedIcon from "@mui/icons-material/InstallMobileRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const forest = "#0F2E20";
const gold = "#C9A24B";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}
function isiOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
}

/**
 * Shows an install affordance:
 *  - Android/desktop Chrome: real "Install app" button via beforeinstallprompt.
 *  - iOS Safari (no beforeinstallprompt): a button that explains Share → Add to Home Screen.
 * Renders nothing once the app is already installed (standalone).
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [open, setOpen] = useState(false);
  const [iosHelp, setIosHelp] = useState(false);
  const installed = isStandalone();

  useEffect(() => {
    if (installed) return;

    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
      setOpen(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", () => setOpen(false));

    // iOS never fires beforeinstallprompt — show the hint once per session.
    if (isiOS() && !sessionStorage.getItem("iosInstallDismissed")) {
      setOpen(true);
    }
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, [installed]);

  if (installed) return null;

  const install = async () => {
    if (isiOS()) { setIosHelp(true); return; }
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setOpen(false);
  };

  const dismiss = () => {
    setOpen(false);
    if (isiOS()) sessionStorage.setItem("iosInstallDismissed", "1");
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: { xs: 1, sm: 2 } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, background: forest, color: "#fff",
          px: 2, py: 1.25, borderRadius: 3, boxShadow: "0 10px 30px -10px rgba(0,0,0,.5)" }}>
          <InstallMobileRoundedIcon sx={{ color: gold }} />
          <Box sx={{ mr: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Install FreshM</Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.85 }}>Add it to your home screen for full-screen, app-like use.</Typography>
          </Box>
          <Button onClick={install} size="small" variant="contained"
            sx={{ background: gold, color: forest, fontWeight: 700, "&:hover": { background: "#b8923f" } }}>
            Install
          </Button>
          <IconButton size="small" onClick={dismiss} sx={{ color: "#fff" }}><CloseRoundedIcon fontSize="small" /></IconButton>
        </Box>
      </Snackbar>

      <Dialog open={iosHelp} onClose={() => setIosHelp(false)} PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle sx={{ fontWeight: 800, color: forest }}>Add FreshM to your Home Screen</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#5b6b60", mb: 2 }}>
            On iPhone/iPad, install from Safari in two taps:
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IosShareRoundedIcon sx={{ color: forest }} />
              <Typography variant="body2">1. Tap the <b>Share</b> button in Safari’s toolbar.</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <AddBoxOutlinedIcon sx={{ color: forest }} />
              <Typography variant="body2">2. Choose <b>Add to Home Screen</b>, then <b>Add</b>.</Typography>
            </Stack>
          </Stack>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button onClick={() => setIosHelp(false)} variant="contained" sx={{ background: forest }}>Got it</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
