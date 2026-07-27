import React, { useEffect, useMemo, useState } from "react";
import {
  Grid, Box, Stack, Typography, TextField, MenuItem, Button, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody, Divider, Snackbar, Alert,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import api from "../../services/api";
import { palette, sprout } from "../../theme/theme";
import { PageHeader, SectionCard, StatTile } from "../../components/ui/kit";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; }
  catch { return []; }
}

const emptyLine = () => ({ crateCount: "", grossWeight: "" });

export default function ReceivedMaterial() {
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [product, setProduct] = useState("");
  const [emptyCrateKg, setEmptyCrateKg] = useState("2");
  const [lines, setLines] = useState([emptyLine()]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      setFarmers(await safeGet("/farmers"));
      setProducts(await safeGet("/products"));
    })();
  }, []);

  const totals = useMemo(() => {
    const crates = lines.reduce((s, l) => s + (parseFloat(l.crateCount) || 0), 0);
    const gross = lines.reduce((s, l) => s + (parseFloat(l.grossWeight) || 0), 0);
    const tare = crates * (parseFloat(emptyCrateKg) || 0);
    const net = Math.max(0, gross - tare);
    return { crates, gross, tare, net };
  }, [lines, emptyCrateKg]);

  const setLine = (i, key, v) =>
    setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, [key]: v } : l)));
  const addLine = () => setLines((ls) => [...ls, emptyLine()]);
  const removeLine = (i) => setLines((ls) => (ls.length === 1 ? ls : ls.filter((_, idx) => idx !== i)));

  const save = async () => {
    if (!supplier || !product) return setToast({ t: "error", m: "Pick a supplier and an article first." });
    const payload = {
      farmerId: supplier,
      productId: product,
      emptyCrateUnitWeight: parseFloat(emptyCrateKg) || 0,
      totalCrates: totals.crates,
      totalGrossWeight: totals.gross,
      netWeight: totals.net,
      lines: lines
        .filter((l) => l.crateCount || l.grossWeight)
        .map((l) => ({ crateCount: parseFloat(l.crateCount) || 0, grossWeight: parseFloat(l.grossWeight) || 0 })),
    };
    try {
      await api.post("/receipts", payload);
      setToast({ t: "success", m: "Receipt saved. Stock updated after sorting." });
      setLines([emptyLine()]); setSupplier(""); setProduct("");
    } catch {
      setToast({ t: "error", m: "Couldn't save — the /receipts endpoint isn't wired yet (see roadmap)." });
    }
  };

  return (
    <Box>
      <PageHeader
        eyebrow="Intake · weighing station"
        title="Received material"
        subtitle="Log produce as it comes off the truck — crate by crate, or a batch at a time. Net weight is calculated after removing crate weight."
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <SectionCard eyebrow="Consignment" title="Supplier & article">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Farmer / Vendor" value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                  {farmers.length === 0 && <MenuItem disabled value="">No suppliers found</MenuItem>}
                  {farmers.map((f) => (
                    <MenuItem key={f.id} value={f.id}>{f.farmerName || f.vendorName || f.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Article" value={product} onChange={(e) => setProduct(e.target.value)}>
                  {products.length === 0 && <MenuItem disabled value="">No articles found</MenuItem>}
                  {products.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.productName || p.articleName}{p.size ? ` · ${p.size}` : ""}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth type="number" label="Empty crate weight (kg)"
                  value={emptyCrateKg} onChange={(e) => setEmptyCrateKg(e.target.value)}
                  helperText="Tare weight of one crate — subtracted from gross."
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2.5 }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle2">Crate entries</Typography>
              <Button size="small" startIcon={<AddRoundedIcon />} onClick={addLine}>Add row</Button>
            </Stack>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Crates</TableCell>
                  <TableCell>Gross weight (kg)</TableCell>
                  <TableCell align="right">Net (kg)</TableCell>
                  <TableCell width={44} />
                </TableRow>
              </TableHead>
              <TableBody>
                {lines.map((l, i) => {
                  const net = Math.max(0, (parseFloat(l.grossWeight) || 0) - (parseFloat(l.crateCount) || 0) * (parseFloat(emptyCrateKg) || 0));
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <TextField variant="standard" type="number" value={l.crateCount}
                          onChange={(e) => setLine(i, "crateCount", e.target.value)} placeholder="e.g. 2" />
                      </TableCell>
                      <TableCell>
                        <TextField variant="standard" type="number" value={l.grossWeight}
                          onChange={(e) => setLine(i, "grossWeight", e.target.value)} placeholder="e.g. 42" />
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: "'IBM Plex Mono', monospace", color: palette.leaf, fontWeight: 600 }}>
                        {net.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => removeLine(i)} sx={{ color: palette.faint }}>
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </SectionCard>
        </Grid>

        {/* Live totals — weigh readout */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2.5}>
            <StatTile label="Total gross" value={totals.gross.toLocaleString("en-IN")} unit="kg" icon={<ScaleRoundedIcon />} />
            <StatTile label="Crate tare" value={`− ${totals.tare.toLocaleString("en-IN")}`} unit="kg" tone="stamp" />
            <Box sx={{ p: 2.5, borderRadius: 4, background: palette.forestDeep, color: "#fff" }}>
              <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.6)" }}>Net received</Typography>
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 38, fontWeight: 600 }}>
                  {totals.net.toLocaleString("en-IN")}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>kg</Typography>
              </Stack>
              <Box sx={{ height: 3, background: sprout, borderRadius: 3, mt: 1, width: "50%" }} />
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)", mt: 1, display: "block" }}>
                {totals.crates} crates · net = gross − (crates × {emptyCrateKg || 0} kg)
              </Typography>
            </Box>
            <Button variant="contained" size="large" onClick={save}>Save receipt</Button>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}
