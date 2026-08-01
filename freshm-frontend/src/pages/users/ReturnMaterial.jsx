import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField, MenuItem, Button, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody, Divider, Snackbar, Alert,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { getReceipts, createReturn, getReturns, deleteReturn } from "../../services/operationsService";

const forest = "#0F2E20";
const gold = "#C9A24B";
const rust = "#B5533C";
const num = (v) => (v === "" || v == null ? 0 : Number(v));

export default function ReturnMaterial() {
  const [receipts, setReceipts] = useState([]);
  const [returns, setReturns] = useState([]);
  const [receiptId, setReceiptId] = useState("");
  const [returnDate, setReturnDate] = useState(new Date().toISOString().slice(0, 10));
  const [emptyCrateUnitWeight, setEmpty] = useState("");
  const [lines, setLines] = useState([{ crateCount: "", grossWeight: "" }]);
  const [remarks, setRemarks] = useState("");
  const [toast, setToast] = useState(null);

  const load = async () => {
    try { setReceipts(await getReceipts()); } catch { /* ignore */ }
    try { setReturns(await getReturns()); } catch { /* ignore */ }
  };
  useEffect(() => { load(); }, []);

  const setLine = (i, k, v) => setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, [k]: v } : l)));
  const addLine = () => setLines((ls) => [...ls, { crateCount: "", grossWeight: "" }]);
  const removeLine = (i) => setLines((ls) => (ls.length === 1 ? ls : ls.filter((_, idx) => idx !== i)));

  const selected = receipts.find((r) => String(r.id) === String(receiptId));
  const totals = useMemo(() => {
    const crates = lines.reduce((s, l) => s + num(l.crateCount), 0);
    const gross = lines.reduce((s, l) => s + num(l.grossWeight), 0);
    const net = gross - crates * num(emptyCrateUnitWeight);
    return { crates, gross, net };
  }, [lines, emptyCrateUnitWeight]);

  const remainingAfter = selected ? Number((num(selected.availableWeight) - totals.net).toFixed(2)) : null;

  const save = async () => {
    if (!receiptId) return setToast({ t: "error", m: "Select the receipt to return against." });
    const valid = lines.filter((l) => num(l.crateCount) > 0 || num(l.grossWeight) > 0);
    if (valid.length === 0) return setToast({ t: "error", m: "Add at least one weighing." });
    try {
      await createReturn({
        receiptId, returnDate,
        emptyCrateUnitWeight: num(emptyCrateUnitWeight),
        remarks,
        crateLines: valid.map((l) => ({ crateCount: num(l.crateCount), grossWeight: num(l.grossWeight) })),
      });
      setToast({ t: "success", m: "Return recorded — stock updated." });
      setReceiptId(""); setEmpty(""); setRemarks(""); setLines([{ crateCount: "", grossWeight: "" }]);
      load();
    } catch (e) {
      setToast({ t: "error", m: e?.response?.data?.message || "Couldn't save the return." });
    }
  };

  const remove = async (id) => { try { await deleteReturn(id); load(); } catch { /* ignore */ } };
  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box>
      <Typography variant="overline" sx={{ color: gold }}>Godown</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest }}>Return / Reject Material</Typography>
      <Typography variant="body2" sx={{ color: "#5b6b60", mb: 3 }}>
        Weigh the rejected goods by karat. The net is subtracted from that receipt’s available stock.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField select fullWidth size="small" label="Receipt" value={receiptId} onChange={(e) => setReceiptId(e.target.value)} sx={fieldSx}>
                  {receipts.length === 0 && <MenuItem disabled value="">No receipts yet</MenuItem>}
                  {receipts.map((r) => (
                    <MenuItem key={r.id} value={r.id}>{r.receiptNumber} · {r.productName} · avail {r.availableWeight} kg</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} sx={fieldSx} />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3, mb: 1 }}>
              <Typography variant="subtitle2">Rejected weighings (karat)</Typography>
              <Button size="small" startIcon={<AddRoundedIcon />} onClick={addLine}>Add line</Button>
            </Stack>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Crates</TableCell>
                  <TableCell>Weight (kg, with karat)</TableCell>
                  <TableCell width={40} />
                </TableRow>
              </TableHead>
              <TableBody>
                {lines.map((l, i) => (
                  <TableRow key={i}>
                    <TableCell><TextField variant="standard" type="number" placeholder="2" value={l.crateCount} onChange={(e) => setLine(i, "crateCount", e.target.value)} /></TableCell>
                    <TableCell><TextField variant="standard" type="number" placeholder="84" value={l.grossWeight} onChange={(e) => setLine(i, "grossWeight", e.target.value)} /></TableCell>
                    <TableCell><IconButton size="small" onClick={() => removeLine(i)}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider sx={{ my: 2.5 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="number" label="Empty crate weight (kg each) — 0 to skip" value={emptyCrateUnitWeight} onChange={(e) => setEmpty(e.target.value)} sx={fieldSx} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} sx={fieldSx} /></Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, borderRadius: 3, background: "rgba(181,83,60,.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: rust, fontWeight: 600 }}>Reject net (without karat)</span>
              <span style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: rust }}>{totals.net} kg</span>
            </Box>
            {selected && (
              <Typography variant="caption" sx={{ color: "#5b6b60", display: "block", mt: 1 }}>
                {selected.receiptNumber}: available {selected.availableWeight} kg → after this return {remainingAfter} kg
              </Typography>
            )}

            <Button fullWidth size="large" variant="contained" onClick={save} sx={{ mt: 2, background: rust, "&:hover": { background: "#98452f" } }}>
              Record return
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 2.5, borderRadius: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Recent returns</Typography>
            {returns.length === 0 ? (
              <Typography variant="body2" sx={{ color: "#5b6b60", py: 3, textAlign: "center" }}>No returns yet.</Typography>
            ) : (
              <Stack divider={<Divider />}>
                {returns.slice(0, 8).map((r) => (
                  <Stack key={r.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: forest }}>{r.productName}</Typography>
                      <Typography variant="caption" sx={{ color: "#5b6b60" }}>{r.returnNumber} · {r.netWeight} kg · {r.receiptNumber}</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => remove(r.id)}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
                  </Stack>
                ))}
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}
