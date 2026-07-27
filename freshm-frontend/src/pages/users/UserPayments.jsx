import React, { useEffect, useState } from "react";
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import api from "../../services/api";
import { palette } from "../../theme/theme";
import { PageHeader, SectionCard, EmptyState } from "../../components/ui/kit";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}

export default function UserPayments() {
  const [rows, setRows] = useState([]);
  useEffect(() => { (async () => setRows(await safeGet("/payments")))(); }, []);

  return (
    <Box>
      <PageHeader
        eyebrow="Supplier payments"
        title="Payments"
        subtitle="Whether each supplier's amount is cleared. Buyer receipts stay with the admin."
      />
      <SectionCard title="Recent payments">
        {rows.length === 0 ? (
          <EmptyState icon={<PaymentsRoundedIcon />} title="No payments recorded" hint="Payments made to farmers and vendors will appear here." />
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Supplier</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((p, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ fontWeight: 600, color: palette.ink }}>
                    {p.farmerName || p.vendorName || p.supplierName || "Supplier"}
                  </TableCell>
                  <TableCell>{p.paymentDate || "—"}</TableCell>
                  <TableCell>{p.paymentMode || "—"}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>
                    ₹ {Number(p.amount || 0).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell align="right">
                    <Chip size="small"
                      label={(p.status || "CLEARED")}
                      sx={{
                        fontWeight: 600,
                        color: palette.forestDeep,
                        background: "rgba(46,139,78,0.14)",
                        border: `1px solid ${palette.leaf}`,
                      }} />
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
