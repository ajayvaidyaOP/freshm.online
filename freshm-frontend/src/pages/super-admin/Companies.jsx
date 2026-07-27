import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Card, Stack, Typography, Button, TextField, InputAdornment, Chip, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody, Menu, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Snackbar, Alert, CircularProgress, Tooltip, Divider,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { sa, sprout, mono, display } from "../../superadmin/saTokens";
import { getAllCompanies, createCompany, updateCompany, disableCompany } from "../../services/companyService";

const blank = { companyName: "", email: "", mobile: "", address: "", gstNumber: "", panNumber: "" };
const DEFAULT_ADMIN_PASSWORD = "Admin@123"; // set by the backend on company creation

function humanError(err, fallback) {
  return err?.response?.data?.message || (err?.message === "Network Error"
    ? "Can't reach the server. Is the backend running on :8080?" : fallback);
}

export default function Companies() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const [dialog, setDialog] = useState(null);      // { mode: 'create'|'edit', id? }
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  const [menu, setMenu] = useState({ el: null, row: null });
  const [creds, setCreds] = useState(null);        // { email, password, companyCode, companyName }
  const [confirmDisable, setConfirmDisable] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    try { setRows(await getAllCompanies()); }
    catch (e) { setToast({ t: "error", m: humanError(e, "Couldn't load companies.") }); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((c) =>
      [c.companyName, c.companyCode, c.email, c.mobile, c.gstNumber]
        .filter(Boolean).some((v) => String(v).toLowerCase().includes(s))
    );
  }, [rows, q]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(blank); setDialog({ mode: "create" }); };
  const openEdit = (row) => {
    setForm({
      companyName: row.companyName || "", email: row.email || "", mobile: row.mobile || "",
      address: row.address || "", gstNumber: row.gstNumber || "", panNumber: row.panNumber || "",
    });
    setDialog({ mode: "edit", id: row.id });
    setMenu({ el: null, row: null });
  };

  const submit = async () => {
    if (!form.companyName.trim()) return setToast({ t: "error", m: "Company name is required." });
    setSaving(true);
    try {
      if (dialog.mode === "create") {
        const created = await createCompany(form);
        setDialog(null);
        setCreds({
          email: created?.email || form.email,
          password: DEFAULT_ADMIN_PASSWORD,
          companyCode: created?.companyCode,
          companyName: created?.companyName || form.companyName,
        });
      } else {
        await updateCompany(dialog.id, form);
        setDialog(null);
        setToast({ t: "success", m: "Company updated." });
      }
      load();
    } catch (e) {
      setToast({ t: "error", m: humanError(e, "Couldn't save the company.") });
    } finally { setSaving(false); }
  };

  const doDisable = async () => {
    const row = confirmDisable; setConfirmDisable(null);
    try { await disableCompany(row.id); setToast({ t: "success", m: `${row.companyName} disabled.` }); load(); }
    catch (e) { setToast({ t: "error", m: humanError(e, "Couldn't disable.") }); }
  };

  const copy = (text) => { navigator.clipboard?.writeText(text); setToast({ t: "success", m: "Copied." }); };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2.5 } };

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", color: sa.leaf, textTransform: "uppercase" }}>Tenants</Typography>
          <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 30, color: sa.ink, mt: 0.25 }}>Companies</Typography>
          <Typography variant="body2" sx={{ color: sa.slate, mt: 0.5 }}>
            Onboard a company and it gets its own isolated workspace — plus an admin login, created automatically.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreate}
          sx={{ background: sa.forest, height: 44, borderRadius: 2.75, "&:hover": { background: sa.forestDeep } }}>New company</Button>
      </Stack>

      <Card sx={{ p: { xs: 1.5, md: 2.5 }, borderRadius: 4.5, border: `1px solid ${sa.line}` }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, flexWrap: "wrap", gap: 1.5 }}>
          <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: sa.ink }}>
            All companies {rows.length > 0 && <span style={{ color: sa.slate, fontWeight: 500 }}>· {rows.length}</span>}
          </Typography>
          <TextField size="small" placeholder="Search name, code, GST…" value={q} onChange={(e) => setQ(e.target.value)}
            sx={{ minWidth: 240, ...fieldSx }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment> }} />
        </Stack>

        {loading ? (
          <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress size={26} sx={{ color: sa.leaf }} /></Stack>
        ) : filtered.length === 0 ? (
          <Stack alignItems="center" spacing={1.5} sx={{ py: 6, textAlign: "center" }}>
            <Box sx={{ width: 54, height: 54, borderRadius: 4, display: "grid", placeItems: "center", color: sa.leaf, background: "rgba(46,139,78,0.10)" }}>
              <BusinessRoundedIcon />
            </Box>
            <Typography sx={{ fontFamily: display, fontWeight: 700, color: sa.ink }}>
              {q ? "No matches" : "No companies yet"}
            </Typography>
            <Typography variant="body2" sx={{ color: sa.slate, maxWidth: 360 }}>
              {q ? "Try a different search." : "Create your first company to issue an admin login."}
            </Typography>
            {!q && <Button variant="contained" onClick={openCreate} sx={{ background: sa.forest, borderRadius: 2.5, "&:hover": { background: sa.forestDeep } }}>Add company</Button>}
          </Stack>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow sx={{ "& th": { fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: sa.slate, borderBottom: `1px solid ${sa.lineStrong}` } }}>
                  <TableCell>Company</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>GST</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell width={48} />
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: sa.ink }}>{c.companyName}</Typography>
                      {c.address && <Typography sx={{ fontSize: 12, color: sa.faint }}>{c.address}</Typography>}
                    </TableCell>
                    <TableCell sx={{ fontFamily: mono, fontSize: 12.5, color: sa.slate }}>{c.companyCode}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 13, color: sa.ink }}>{c.email || "—"}</Typography>
                      <Typography sx={{ fontSize: 12, color: sa.faint }}>{c.mobile || ""}</Typography>
                    </TableCell>
                    <TableCell sx={{ fontFamily: mono, fontSize: 12, color: sa.slate }}>{c.gstNumber || "—"}</TableCell>
                    <TableCell align="right">
                      <Chip size="small" label={c.active === false ? "Disabled" : "Active"}
                        sx={{
                          fontWeight: 600,
                          color: c.active === false ? sa.stamp : sa.forestDeep,
                          background: c.active === false ? "rgba(194,65,12,0.12)" : "rgba(46,139,78,0.14)",
                          border: `1px solid ${c.active === false ? sa.stamp : sa.leaf}`,
                        }} />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => setMenu({ el: e.currentTarget, row: c })} sx={{ color: sa.slate }}>
                        <MoreVertRoundedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Card>

      {/* Row actions */}
      <Menu anchorEl={menu.el} open={Boolean(menu.el)} onClose={() => setMenu({ el: null, row: null })}>
        <MenuItem onClick={() => openEdit(menu.row)}>
          <EditRoundedIcon sx={{ fontSize: 18, mr: 1, color: sa.slate }} /> Edit details
        </MenuItem>
        <MenuItem
          disabled={menu.row?.active === false}
          onClick={() => { setConfirmDisable(menu.row); setMenu({ el: null, row: null }); }}
          sx={{ color: sa.stamp }}
        >
          <BlockRoundedIcon sx={{ fontSize: 18, mr: 1 }} /> Disable company
        </MenuItem>
      </Menu>

      {/* Create / Edit dialog */}
      <Dialog open={Boolean(dialog)} onClose={() => !saving && setDialog(null)} fullWidth maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 5 } }}>
        <DialogTitle sx={{ fontFamily: display, fontWeight: 700 }}>
          {dialog?.mode === "edit" ? "Edit company" : "Onboard a company"}
        </DialogTitle>
        <DialogContent>
          {dialog?.mode === "create" && (
            <Typography variant="body2" sx={{ color: sa.slate, mb: 2 }}>
              An admin login is created automatically using the email below (default password{" "}
              <b style={{ fontFamily: mono }}>{DEFAULT_ADMIN_PASSWORD}</b>).
            </Typography>
          )}
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}><TextField fullWidth label="Company name *" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} sx={fieldSx} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email (admin login)" value={form.email} onChange={(e) => set("email", e.target.value)} sx={fieldSx} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Mobile" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} sx={fieldSx} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Address" value={form.address} onChange={(e) => set("address", e.target.value)} sx={fieldSx} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="GST number" value={form.gstNumber} onChange={(e) => set("gstNumber", e.target.value)} sx={fieldSx} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="PAN number" value={form.panNumber} onChange={(e) => set("panNumber", e.target.value)} sx={fieldSx} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDialog(null)} color="inherit" disabled={saving}>Cancel</Button>
          <Button variant="contained" onClick={submit} disabled={saving}
            sx={{ background: sa.forest, borderRadius: 2.5, "&:hover": { background: sa.forestDeep } }}>
            {saving ? <CircularProgress size={20} color="inherit" /> : dialog?.mode === "edit" ? "Save changes" : "Create company"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Admin credentials reveal after create */}
      <Dialog open={Boolean(creds)} onClose={() => setCreds(null)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 5 } }}>
        <Box sx={{ p: 3 }}>
          <Stack alignItems="center" spacing={1.25} sx={{ textAlign: "center", mb: 2 }}>
            <Box sx={{ width: 52, height: 52, borderRadius: "50%", background: sprout, display: "grid", placeItems: "center", color: sa.forestDeep }}>
              <KeyRoundedIcon />
            </Box>
            <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: sa.ink }}>Company created</Typography>
            <Typography variant="body2" sx={{ color: sa.slate }}>
              Share these admin credentials with <b>{creds?.companyName}</b>. Ask them to change the password after first sign-in.
            </Typography>
          </Stack>
          <Stack spacing={1.25} sx={{ mb: 2 }}>
            <CredRow label="Company code" value={creds?.companyCode} onCopy={copy} mono />
            <CredRow label="Login email" value={creds?.email} onCopy={copy} />
            <CredRow label="Password" value={creds?.password} onCopy={copy} mono />
          </Stack>
          <Button fullWidth variant="contained" onClick={() => setCreds(null)}
            sx={{ background: sa.forest, borderRadius: 2.5, "&:hover": { background: sa.forestDeep } }}>Done</Button>
        </Box>
      </Dialog>

      {/* Confirm disable */}
      <Dialog open={Boolean(confirmDisable)} onClose={() => setConfirmDisable(null)} PaperProps={{ sx: { borderRadius: 5 } }}>
        <DialogTitle sx={{ fontFamily: display, fontWeight: 700 }}>Disable this company?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: sa.slate }}>
            <b>{confirmDisable?.companyName}</b> and its admin will no longer be able to sign in. You can re-enable later.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setConfirmDisable(null)} color="inherit">Cancel</Button>
          <Button variant="contained" color="error" onClick={doDisable} sx={{ borderRadius: 2.5 }}>Disable</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}

function CredRow({ label, value, onCopy, mono: isMono }) {
  return (
    <Box sx={{ p: 1.5, borderRadius: 2.5, background: sa.bone, border: `1px solid ${sa.line}` }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: sa.slate }}>{label}</Typography>
          <Typography sx={{ fontFamily: isMono ? mono : "inherit", fontWeight: 600, color: sa.ink, wordBreak: "break-all" }}>{value || "—"}</Typography>
        </Box>
        <Tooltip title="Copy">
          <IconButton size="small" onClick={() => onCopy(value)} sx={{ color: sa.slate }}>
            <ContentCopyRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
