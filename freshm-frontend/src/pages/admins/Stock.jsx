import React, { useEffect, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, Tabs, Tab, Table, TableHead, TableRow, TableCell,
  TableBody, Chip, CircularProgress,
} from "@mui/material";
import { getReceipts, getReturns, getPacking } from "../../services/operationsService";
import api from "../../services/api";

const forest = "#0F2E20";
const gold = "#C9A24B";

export default function Stock() {
  const [tab, setTab] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const [returns, setReturns] = useState([]);
  const [packing, setPacking] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [r1, r2, r3] = await Promise.all([getReceipts(), getReturns(), getPacking()]);
        setReceipts(r1); setReturns(r2); setPacking(r3);
        try { const st = await api.get("/stock"); setStock(st.data?.data ?? st.data ?? []); } catch { /* ignore */ }
      } finally { setLoading(false); }
    })();
  }, []);

  const totalAvailable = receipts.reduce((s, r) => s + (Number(r.availableWeight) || 0), 0);
  const totalBoxes = packing.reduce((s, p) => s + (Number(p.totalBoxes) || 0), 0);

  return (
    <Box>
      <Typography variant="overline" sx={{ color: gold }}>Godown activity</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest }}>Stock &amp; Operations</Typography>
      <Typography variant="body2" sx={{ color: "#5b6b60", mb: 3 }}>Everything your users record in the godown — for your company only.</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><Kpi label="Receipts" value={receipts.length} /></Grid>
        <Grid item xs={6} md={3}><Kpi label="Available (net) kg" value={totalAvailable.toLocaleString("en-IN")} highlight /></Grid>
        <Grid item xs={6} md={3}><Kpi label="Returns" value={returns.length} /></Grid>
        <Grid item xs={6} md={3}><Kpi label="Boxes packed" value={totalBoxes.toLocaleString("en-IN")} /></Grid>
      </Grid>

      <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, "& .MuiTabs-indicator": { background: gold } }}>
          <Tab label="By product" /><Tab label="Receipts" /><Tab label="Returns" /><Tab label="Packing" />
        </Tabs>
        <Box sx={{ p: 2.5 }}>
          {loading ? (
            <Stack alignItems="center" sx={{ py: 5 }}><CircularProgress size={24} sx={{ color: gold }} /></Stack>
          ) : tab === 0 ? (
            <SimpleTable
              head={["Article", "Received net", "Returned", "Packed", "Sold", "On hand"]}
              rows={stock.map((p) => [
                p.productName + (p.articleName ? ` — ${p.articleName}` : ""),
                `${p.receivedNet} kg`, `${p.returned} kg`, `${p.packed} kg`, `${p.sold} kg`,
                <Chip key="oh" size="small" label={`${p.onHand} kg`} sx={{ fontWeight: 700, background: p.onHand > 0 ? "rgba(46,139,78,.16)" : "rgba(181,83,60,.14)", color: p.onHand > 0 ? "#0F2E20" : "#B5533C" }} />,
              ])}
              empty="No stock yet — receive material to see it here."
            />
          ) : tab === 1 ? (
            <SimpleTable
              head={["Receipt", "Article", "Date", "Gross", "Net", "Returned", "Packed", "Available"]}
              rows={receipts.map((r) => [
                r.receiptNumber, r.productName, r.receiptDate, `${r.grossWeight} kg`, `${r.netWeight} kg`,
                `${r.returnedWeight} kg`, `${r.packedWeight} kg`,
                <Chip key="a" size="small" label={`${r.availableWeight} kg`} sx={{ fontWeight: 600, background: "rgba(201,162,75,.16)", color: forest }} />,
              ])}
              empty="No receipts yet."
            />
          ) : tab === 2 ? (
            <SimpleTable
              head={["Return", "Article", "Date", "Crates", "Net subtracted", "Against"]}
              rows={returns.map((r) => [r.returnNumber, r.productName, r.returnDate, r.totalCrates, `${r.netWeight} kg`, r.receiptNumber])}
              empty="No returns yet."
            />
          ) : (
            <SimpleTable
              head={["Pack", "Size grade", "Destination", "Weight", "Box size", "Boxes"]}
              rows={packing.map((p) => [p.packNumber, p.sizeGrade || "—", p.destination || "—", `${p.inputWeight} kg`, `${p.boxSize} kg`, p.totalBoxes])}
              empty="No packing yet."
            />
          )}
        </Box>
      </Card>
    </Box>
  );
}

function Kpi({ label, value, highlight }) {
  return (
    <Card sx={{ p: 2, borderRadius: 3, textAlign: "center", background: highlight ? forest : "#fff", color: highlight ? "#fff" : forest, border: "1px solid rgba(201,162,75,.3)" }}>
      <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: 22 }}>{value}</Typography>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>{label}</Typography>
    </Card>
  );
}

function SimpleTable({ head, rows, empty }) {
  if (!rows.length) return <Typography variant="body2" sx={{ color: "#5b6b60", py: 4, textAlign: "center" }}>{empty}</Typography>;
  return (
    <Table size="small">
      <TableHead><TableRow>{head.map((h) => <TableCell key={h} sx={{ fontWeight: 700, color: forest }}>{h}</TableCell>)}</TableRow></TableHead>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i} hover>{r.map((c, j) => <TableCell key={j}>{c}</TableCell>)}</TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
