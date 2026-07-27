import React, { useEffect, useState } from "react";
import { Box, Grid, Table, TableHead, TableRow, TableCell, TableBody, TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import api from "../../services/api";
import { palette } from "../../theme/theme";
import { PageHeader, SectionCard, GradeChip, EmptyState, MiniBar } from "../../components/ui/kit";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}

export default function AvailableStock() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => { (async () => setRows(await safeGet("/inventory")))(); }, []);

  const filtered = rows.filter((r) =>
    (r.productName || r.articleName || "").toLowerCase().includes(q.toLowerCase())
  );
  const max = Math.max(1, ...rows.map((r) => Number(r.availableQuantity) || 0));

  return (
    <Box>
      <PageHeader
        eyebrow="Sorted & graded"
        title="Available stock"
        subtitle="Quantities graded by size and ready to pack. Updated live as material is sorted."
      />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <SectionCard
            title="By article"
            action={
              <TextField
                size="small" placeholder="Search article" value={q} onChange={(e) => setQ(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment> }}
              />
            }
          >
            {filtered.length === 0 ? (
              <EmptyState icon={<Inventory2RoundedIcon />} title="No graded stock yet"
                hint="Once received material is sorted by size, available quantities show up here." />
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Article</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell align="right">Available</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ fontWeight: 600, color: palette.ink }}>{r.productName || r.articleName}</TableCell>
                      <TableCell>{r.size ? <GradeChip label={r.size} /> : "—"}</TableCell>
                      <TableCell>{r.destination || "—"}</TableCell>
                      <TableCell align="right" sx={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>
                        {Number(r.availableQuantity || 0).toLocaleString("en-IN")} kg
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <SectionCard eyebrow="Share of stock" title="Distribution">
            {rows.length === 0 ? (
              <EmptyState icon={<Inventory2RoundedIcon />} title="Nothing to show" hint="Graded stock will chart here." />
            ) : (
              rows.map((r, i) => (
                <MiniBar key={i} label={r.productName || r.articleName || "Article"}
                  value={Number(r.availableQuantity) || 0} max={max} sub={r.size} />
              ))
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
