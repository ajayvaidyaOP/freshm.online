import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField, MenuItem, Button, IconButton,
  Divider, Snackbar, Alert,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { getReceipts, createPacking, getPacking, deletePacking } from "../../services/operationsService";

const forest = "#0F2E20";
const gold = "#C9A24B";
const num = (v) => (v === "" || v == null ? 0 : Number(v));

export default function Packing() {
  const [receipts, setReceipts] = useState([]);
  const [packing, setPacking] = useState([]);
  const [receiptId, setReceiptId] = useState("");
  const [packDate, setPackDate] = useState(new Date().toISOString().slice(0, 10));
  const [sizeGrade, setSizeGrade] = useState("");
  const [destination, setDestination] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [boxSize, setBoxSize] = useState("");
  const [remarks, setRemarks] = useState("");
  const [toast, setToast] = useState(null);

  const load = async () => {
    try { setReceipts(await getReceipts()); } catch { /* ignore */ }
    try { setPacking(await getPacking()); } catch { /* ignore */ }
  };
  useEffect(() => { load(); }, []);

  const selected = receipts.find((r) => String(r.id) === String(receiptId));
  const totalBoxes = useMemo(() => {
    const b = num(boxSize);
    return b > 0 ? Math.floor(num(inputWeight) / b) : 0;
  }, [inputWeight, boxSize]);
  const leftover = useMemo(() => {
    const b = num(boxSize);
    return b > 0 ? Number((num(inputWeight) - totalBoxes * b).toFixed(2)) : num(inputWeight);
  }, [inputWeight, boxSize, totalBoxes]);

  const save = async () => {
    if (num(inputWeight) <= 0) return setToast({ t: "error", m: "Enter the sorted weight to pack." });
    if (num(boxSize) <= 0) return setToast({ t: "error", m: "Enter the box size (kg per box)." });
    try {
      await createPacking({
        receiptId: receiptId || null,
        productId: selected?.productId || null,
        packDate, sizeGrade, destination,
        inputWeight: num(inputWeight), boxSize: num(boxSize), remarks,
      });
      setToast({ t: "success", m: `Packed — ${totalBoxes} boxes.` });
      setReceiptId(""); setSizeGrade(""); setDestination(""); setInputWeight(""); setBoxSize(""); setRemarks("");
      load();
    } catch (e) {
      setToast({ t: "error", m: e?.response?.data?.message || "Couldn't save packing." });
    }
  };

  const remove = async (id) => { try { await deletePacking(id); load(); } catch { /* ignore */ } };
  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box>
      <Typography variant="overline" sx={{ color: gold }}>Godown</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest }}>Sort &amp; Pack</Typography>
      <Typography variant="body2" sx={{ color: "#5b6b60", mb: 3 }}>
        Enter the sorted weight for a size grade and the box size — boxes are calculated automatically.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth size="small" label="From receipt (optional)" value={receiptId} onChange={(e) => setReceiptId(e.target.value)} sx={fieldSx}>
                  <MenuItem value="">— none —</MenuItem>
                  {receipts.map((r) => <MenuItem key={r.id} value={r.id}>{r.receiptNumber} · {r.productName} · avail {r.availableWeight} kg</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={packDate} onChange={(e) => setPackDate(e.target.value)} sx={fieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Size grade (e.g. 150-250 gm)" value={sizeGrade} onChange={(e) => setSizeGrade(e.target.value)} sx={fieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Destination (e.g. Dubai)" value={destination} onChange={(e) => setDestination(e.target.value)} sx={fieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" type="number" label="Sorted weight (kg, without karat)" value={inputWeight} onChange={(e) => setInputWeight(e.target.value)} sx={fieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" type="number" label="Box size (kg per box, e.g. 1.6)" value={boxSize} onChange={(e) => setBoxSize(e.target.value)} sx={fieldSx} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth size="small" label="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} sx={fieldSx} />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2.5, borderRadius: 3, background: forest, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Stack direction="row" spacing={1} alignItems="center"><Inventory2RoundedIcon /><span>Total boxes</span></Stack>
              <span style={{ fontFamily: "monospace", fontSize: 30, fontWeight: 700 }}>{totalBoxes}</span>
            </Box>
            <Typography variant="caption" sx={{ color: "#5b6b60", display: "block", mt: 1 }}>
              Leftover (not a full box): {leftover} kg
              {selected ? ` · receipt available ${selected.availableWeight} kg` : ""}
            </Typography>

            <Button fullWidth size="large" variant="contained" onClick={save} sx={{ mt: 2, background: forest, "&:hover": { background: "#0b241a" } }}>
              Save packing
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 2.5, borderRadius: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Recent packing</Typography>
            {packing.length === 0 ? (
              <Typography variant="body2" sx={{ color: "#5b6b60", py: 3, textAlign: "center" }}>No packing yet.</Typography>
            ) : (
              <Stack divider={<Divider />}>
                {packing.slice(0, 8).map((p) => (
                  <Stack key={p.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: forest }}>{p.sizeGrade || p.productName || "Pack"}{p.destination ? ` → ${p.destination}` : ""}</Typography>
                      <Typography variant="caption" sx={{ color: "#5b6b60" }}>{p.packNumber} · {p.inputWeight} kg ÷ {p.boxSize} = {p.totalBoxes} boxes</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => remove(p.id)}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
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
