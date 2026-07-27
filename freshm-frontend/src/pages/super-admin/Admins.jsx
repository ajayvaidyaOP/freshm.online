import React, { useEffect, useState } from "react";
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, Avatar, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, MenuItem, Snackbar, Alert,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import api from "../../services/api";
import { palette, sprout } from "../../theme/theme";
import { PageHeader, SectionCard, EmptyState } from "../../components/ui/kit";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}
const blank = { fullName: "", email: "", mobile: "", password: "", companyId: "", role: "ADMIN" };

export default function Admins() {
  const [rows, setRows] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [toast, setToast] = useState(null);

  const load = async () => {
    const users = await safeGet("/users");
    setRows(users.filter((u) => u.role === "ADMIN"));
    setCompanies(await safeGet("/super-admin/companies"));
  };
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const create = async () => {
    if (!form.fullName || !form.email || !form.password) return setToast({ t: "error", m: "Name, email and password are required." });
    try {
      await api.post("/users", form);
      setToast({ t: "success", m: "Admin created." });
      setOpen(false); setForm(blank); load();
    } catch {
      setToast({ t: "error", m: "Couldn't create admin. Verify the /users endpoint accepts a companyId + role." });
    }
  };

  return (
    <Box>
      <PageHeader
        eyebrow="Access"
        title="Admins"
        subtitle="Each admin owns one company's workspace. They never see another company's data."
        action={<Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setOpen(true)}>New admin</Button>}
      />

      <SectionCard>
        {rows.length === 0 ? (
          <EmptyState icon={<AdminPanelSettingsRoundedIcon />} title="No admins yet"
            hint="Create an admin and assign them to a company."
            action={<Button variant="contained" onClick={() => setOpen(true)}>Add admin</Button>} />
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Admin</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Avatar sx={{ width: 30, height: 30, fontSize: 13, background: sprout, color: palette.forestDeep, fontWeight: 700 }}>
                        {(u.fullName || "A").slice(0, 1)}
                      </Avatar>
                      <span style={{ fontWeight: 600, color: palette.ink }}>{u.fullName}</span>
                    </Stack>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.companyName || "—"}</TableCell>
                  <TableCell align="right">
                    <Chip size="small" label={u.active === false ? "Inactive" : "Active"}
                      sx={{
                        fontWeight: 600,
                        color: u.active === false ? palette.stamp : palette.forestDeep,
                        background: u.active === false ? "rgba(194,65,12,0.12)" : "rgba(46,139,78,0.14)",
                        border: `1px solid ${u.active === false ? palette.stamp : palette.leaf}`,
                      }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}>Create an admin</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.25 }}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Full name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Mobile" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email" value={form.email} onChange={(e) => set("email", e.target.value)} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth type="password" label="Password" value={form.password} onChange={(e) => set("password", e.target.value)} /></Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Company" value={form.companyId} onChange={(e) => set("companyId", e.target.value)}>
                {companies.length === 0 && <MenuItem disabled value="">Create a company first</MenuItem>}
                {companies.map((c) => <MenuItem key={c.id} value={c.id}>{c.companyName}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={create}>Create admin</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}
