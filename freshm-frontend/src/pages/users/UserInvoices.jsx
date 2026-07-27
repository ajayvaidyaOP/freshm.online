import React, { useEffect, useState } from "react";
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import api from "../../services/api";
import { palette } from "../../theme/theme";
import { PageHeader, SectionCard, EmptyState } from "../../components/ui/kit";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}

export default function UserInvoices() {
  const [rows, setRows] = useState([]);
  useEffect(() => { (async () => setRows(await safeGet("/invoices")))(); }, []);

  return (
    <Box>
      <PageHeader eyebrow="Documents" title="Invoices"
        subtitle="Dispatch and purchase invoices generated for this company." />
      <SectionCard title="All invoices">
        {rows.length === 0 ? (
          <EmptyState icon={<ReceiptLongRoundedIcon />} title="No invoices yet"
            hint="Invoices created on dispatch or purchase will be listed here." />
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">PDF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((inv, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{inv.invoiceNumber}</TableCell>
                  <TableCell sx={{ color: palette.ink }}>{inv.buyerName || inv.partyName || "—"}</TableCell>
                  <TableCell>{inv.generatedAt?.slice(0, 10) || inv.date || "—"}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    ₹ {Number(inv.grandTotal || inv.amount || 0).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" startIcon={<DownloadRoundedIcon />}
                      href={inv.pdfPath ? `/api/${inv.pdfPath}` : undefined} disabled={!inv.pdfPath}>
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </Box>
  );
}
