import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField, MenuItem, Button, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody, Divider, Snackbar, Alert, Chip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import api from "../../services/api";
import { createReceipt, getReceipts, deleteReceipt } from "../../services/operationsService";

const forest = "#0F2E20";
const gold = "#C9A24B";
const num = (v) => (v === "" || v == null ? 0 : Number(v));

export default function ReceiveMaterial() {
  const [products, setProducts] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [productId, setProductId] = useState("");
  const [receiptDate, setReceiptDate] = useState(new Date().toISOString().slice(0, 10));
  const [emptyCrateUnitWeight, setEmpty] = useState("");
  const [lines, setLines] = useState([{ crateCount: "", grossWeight: "" }]);
  const [remarks, setRemarks] = useState("");
  const [toast, setToast] = useState(null);

  const load = async () => { try { setReceipts(await getReceipts()); } catch { /* ignore */ } };
  useEffect(() => {
    (async () => {
      try { const r = await api.get("/products"); setProducts(r.data?.data ?? r.data ?? []); } catch { setProducts([]); }
      load();
    })();
  }, []);

  const setLine = (i, k, v) => setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, [k]: v } : l)));
  const addLine = () => setLines((ls) => [...ls, { crateCount: "", grossWeight: "" }]);
  const removeLine = (i) => setLines((ls) => (ls.length === 1 ? ls : ls.filter((_, idx) => idx !== i)));

  const totals = useMemo(() => {
    const crates = lines.reduce((s, l) => s + num(l.crateCount), 0);
    const gross = lines.reduce((s, l) => s + num(l.grossWeight), 0);
    const emptyTotal = crates * num(emptyCrateUnitWeight);
    const net = gross - emptyTotal;
    return { crates, gross, emptyTotal, net };
  }, [lines, emptyCrateUnitWeight]);

  const save = async () => {
    if (!productId) return setToast({ t: "error", m: "Select an article first." });
    const valid = lines.filter((l) => num(l.crateCount) > 0 || num(l.grossWeight) > 0);
    if (valid.length === 0) return setToast({ t: "error", m: "Add at least one karat line." });
    try {
      await createReceipt({
        productId,
        receiptDate,
        emptyCrateUnitWeight: num(emptyCrateUnitWeight),
        remarks,
        crateLines: valid.map((l) => ({ crateCount: num(l.crateCount), grossWeight: num(l.grossWeight) })),
      });
      setToast({ t: "success", m: "Material received." });
      setProductId(""); setEmpty(""); setRemarks(""); setLines([{ crateCount: "", grossWeight: "" }]);
      load();
    } catch (e) {
      setToast({ t: "error", m: e?.response?.data?.message || "Couldn't save the receipt." });
    }
  };

  const remove = async (id) => { try { await deleteReceipt(id); load(); } catch { /* ignore */ } };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box>
      <Typography variant="overline" sx={{ color: gold }}>Godown</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest }}>Receive Material</Typography>
      <Typography variant="body2" sx={{ color: "#5b6b60", mb: 3 }}>
        Enter each weighing as “crates + kg”. Empty-crate weight is subtracted to get the net (without karat).
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth size="small" label="Article" value={productId} onChange={(e) => setProductId(e.target.value)} sx={fieldSx}>
                  {products.length === 0 && <MenuItem disabled value="">No articles — add one first</MenuItem>}
                  {products.map((p) => <MenuItem key={p.id} value={p.id}>{p.productName}{p.articleName ? ` — ${p.articleName}` : ""}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} sx={fieldSx} />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3, mb: 1 }}>
              <Typography variant="subtitle2">Weighings (karat)</Typography>
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
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" type="number" label="Empty crate weight (kg each) — 0 to skip" value={emptyCrateUnitWeight} onChange={(e) => setEmpty(e.target.value)} sx={fieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} sx={fieldSx} />
              </Grid>
            </Grid>

            <Grid container spacing={1.5} sx={{ mt: 1 }}>
              <Grid item xs={6} sm={3}><Metric label="Total crates" value={totals.crates} /></Grid>
              <Grid item xs={6} sm={3}><Metric label="Gross (with karat)" value={`${totals.gross} kg`} /></Grid>
              <Grid item xs={6} sm={3}><Metric label="Empty crate wt" value={`${totals.emptyTotal} kg`} /></Grid>
              <Grid item xs={6} sm={3}><Metric label="Net (without karat)" value={`${totals.net} kg`} highlight /></Grid>
            </Grid>

            <Button fullWidth size="large" variant="contained" onClick={save} sx={{ mt: 3, background: forest, "&:hover": { background: "#0b241a" } }}>
              Save receipt
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 2.5, borderRadius: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Recent receipts</Typography>
            {receipts.length === 0 ? (
              <Typography variant="body2" sx={{ color: "#5b6b60", py: 3, textAlign: "center" }}>No receipts yet.</Typography>
            ) : (
              <Stack divider={<Divider />} spacing={0}>
                {receipts.slice(0, 8).map((r) => (
                  <Stack key={r.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: forest }}>{r.productName}</Typography>
                      <Typography variant="caption" sx={{ color: "#5b6b60" }}>{r.receiptNumber} · net {r.netWeight} kg</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip size="small" label={`avail ${r.availableWeight} kg`} sx={{ fontWeight: 600, background: "rgba(201,162,75,.16)", color: forest }} />
                      <IconButton size="small" onClick={() => remove(r.id)}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
                    </Stack>
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

function Metric({ label, value, highlight }) {
  return (
    <Box sx={{ p: 1.5, borderRadius: 2, textAlign: "center", background: highlight ? "#0F2E20" : "rgba(15,46,32,.06)", color: highlight ? "#fff" : "#0F2E20" }}>
      <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18 }}>{value}</Typography>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>{label}</Typography>
    </Box>
  );
}
