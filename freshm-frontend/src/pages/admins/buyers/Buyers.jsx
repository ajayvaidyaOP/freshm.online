import React, { useEffect, useState } from "react";
import {
  Box, Card, Stack, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, CircularProgress, Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { getAllBuyers, deleteBuyer } from "../../../services/buyerService";

const forest = "#0F2E20";
const gold = "#C9A24B";

export default function Buyers() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAllBuyers();
      setRows(res?.data ?? res ?? []);
    } catch { setRows([]); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this buyer?")) return;
    try { await deleteBuyer(id); load(); } catch { /* ignore */ }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" sx={{ color: gold }}>Selling</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: forest }}>Buyers</Typography>
          <Typography variant="body2" sx={{ color: "#5b6b60" }}>Customer companies you sell produce to.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate("/admin/buyers/add")}
          sx={{ background: forest, "&:hover": { background: "#0b241a" } }}>Add buyer</Button>
      </Stack>

      <Card sx={{ p: 2.5, borderRadius: 4 }}>
        {loading ? (
          <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress size={26} sx={{ color: gold }} /></Stack>
        ) : rows.length === 0 ? (
          <Stack alignItems="center" spacing={1.5} sx={{ py: 6, textAlign: "center" }}>
            <GroupsRoundedIcon sx={{ fontSize: 40, color: gold }} />
            <Typography sx={{ fontWeight: 700, color: forest }}>No buyers yet</Typography>
            <Typography variant="body2" sx={{ color: "#5b6b60" }}>Add a buyer so you can pick them on the sale invoice.</Typography>
            <Button variant="contained" onClick={() => navigate("/admin/buyers/add")} sx={{ background: forest }}>Add buyer</Button>
          </Stack>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell sx={{ fontFamily: "monospace" }}>{b.buyerCode || "—"}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{b.buyerName}</TableCell>
                  <TableCell>{b.mobile || "—"}</TableCell>
                  <TableCell>{b.destination ? <Chip size="small" label={b.destination} sx={{ background: "rgba(201,162,75,.16)", color: forest }} /> : "—"}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => remove(b.id)}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Box>
  );
}
