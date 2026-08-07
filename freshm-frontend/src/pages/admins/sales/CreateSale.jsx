import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField, MenuItem, Button, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody, Divider, Snackbar, Alert, CircularProgress,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import api from "../../../services/api";
import { createSale } from "../../../services/saleService";
import InvoiceBill from "../../../components/bill/InvoiceBill";
import { numberToWordsIndian } from "../../../utils/numberToWords";
import logo from "../../../assets/logo.png";

const forest = "#0F2E20";
const gold = "#C9A24B";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}
const emptyItem = () => ({ productId: "", description: "", itemCount: "", weightKg: "", price: "" });
const num = (v) => (v === "" || v == null ? 0 : Number(v));
const lineAmount = (it) => (num(it.weightKg) > 0 ? num(it.weightKg) * num(it.price) : num(it.itemCount) * num(it.price));

export default function CreateSale() {
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState({});   // productId -> onHand
  const [company, setCompany] = useState(null);

  const [buyerId, setBuyerId] = useState("");
  const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10));
  const [letterHeadName, setLetterHeadName] = useState("");
  const [items, setItems] = useState([emptyItem()]);
  const [hamali, setHamali] = useState("");
  const [commission, setCommission] = useState("");
  const [transportAdvance, setTransportAdvance] = useState("");
const [transporterName, setTransporterName] = useState("");
const [transporterContact, setTransporterContact] = useState("");
const [vehicleNumber, setVehicleNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);   // SaleResponse after save
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      setBuyers(await safeGet("/buyers"));
      setProducts(await safeGet("/products"));
      const st = await safeGet("/stock");
      const map = {};
      (Array.isArray(st) ? st : []).forEach((r) => { map[r.productId] = r.onHand; });
      setStock(map);
      const me = JSON.parse(localStorage.getItem("user") || "{}");
      setCompany(me);
      setLetterHeadName(me.companyName || "");
    })();
  }, []);

  const setItem = (i, k, v) => setItems((ls) => ls.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const setArticle = (i, pid) => setItems((ls) => ls.map((it, idx) => {
    if (idx !== i) return it;
    const p = products.find((x) => String(x.id) === String(pid));
    return { ...it, productId: pid, description: p ? p.productName : it.description };
  }));
  const addItem = () => setItems((ls) => [...ls, emptyItem()]);
  const addEmptyBox = () => setItems((ls) => [...ls, { ...emptyItem(), description: "Empty box" }]);
  const removeItem = (i) => setItems((ls) => (ls.length === 1 ? ls : ls.filter((_, idx) => idx !== i)));

  const productTotal = items.reduce((s, it) => s + lineAmount(it), 0);
  const grandTotal = productTotal + num(hamali) + num(commission) + num(transportAdvance);

  const selectedBuyer = buyers.find((b) => String(b.id) === String(buyerId));

  // live preview data (before save) — matches InvoiceBill's normalized shape
  const previewData = useMemo(() => ({
    letterHeadName: letterHeadName || company?.companyName || "COMPANY NAME",

    invoiceNumber: saved?.saleNumber || "—",
    date: saleDate,

    partyLabel: "Buyer",
    partyName: selectedBuyer?.buyerName || "--",

    transporterName,
    transporterContact,
    vehicleNumber,
    transportName: transporterName,      // InvoiceBill reads d.transportName
    transportContact: transporterContact,
    transportMobile: transporterContact, // shown under TRANSPORT DETAILS

    items: items
      .filter((it) => it.description)
      .map((it) => ({
        desc: it.description,
        item: it.itemCount,
        unit: it.itemCount,
        quantity: it.weightKg,
        weight: it.weightKg,
        price: it.price,
        amount: lineAmount(it),
      })),

    charges: [
      { label: "Hamali", amount: num(hamali) },
      { label: "Comission", amount: num(commission) },
      { label: "Transport Advance", amount: num(transportAdvance) },
    ].filter((c) => c.amount > 0),

    grandTotal,
    amountInWords: saved?.amountInWords || (grandTotal > 0 ? `Rupees ${numberToWordsIndian(grandTotal)} Only.` : ""),

}), [
    letterHeadName,
    company,
    saved,
    saleDate,
    selectedBuyer,
    items,
    hamali,
    commission,
    transportAdvance,
    grandTotal,
    transporterName,
    transporterContact,
    vehicleNumber
]);


  const save = async () => {
    const validItems = items.filter((it) => it.description);
    if (validItems.length === 0) return setToast({ t: "error", m: "Add at least one item." });
    setSaving(true);
    try {
      const res = await createSale({
    buyerId: buyerId || null,

    saleDate,

    letterHeadName,


    transporterName,
    transporterContact,
    vehicleNumber,


    hamali: num(hamali),
    commission: num(commission),
    transportAdvance: num(transportAdvance),
        items: validItems.map((it) => ({
          productId: it.productId || null,
          description: it.description,
          itemCount: num(it.itemCount) || null,
          weightKg: num(it.weightKg) || null,
          price: num(it.price),
        })),
      });
      setSaved(res);
      setToast({ t: "success", m: `Sale ${res.saleNumber} created.` });
    } catch (err) {
      setToast({ t: "error", m: err?.response?.data?.message || "Couldn't save the sale." });
    } finally { setSaving(false); }
  };

  // when saved, feed the REAL response (with number + words) into the bill
  const billData = saved ? {

    letterHeadName: saved.letterHeadName,

    invoiceNumber: saved.saleNumber,

    date: saved.saleDate,


    transportName: transporterName,          // from the form (backend doesn't store transport)
    transportContact: transporterContact,
    transportMobile: transporterContact,
    vehicleNumber: vehicleNumber,


    partyLabel: "Buyer",
    partyName: saved.buyerName || "--",
    items: (saved.items || []).map((it) => ({ desc: it.description, item: it.itemCount, unit: it.itemCount, quantity: it.weightKg, weight: it.weightKg, price: it.price, amount: it.amount })),
    charges: [
      { label: "Hamali", amount: saved.hamali },
      { label: "Comission", amount: saved.commission },
      { label: "Transport Advance", amount: saved.transportAdvance },
    ].filter((c) => c.amount > 0),
    grandTotal: saved.grandTotal,
    amountInWords: saved.amountInWords || (saved.grandTotal > 0 ? `Rupees ${numberToWordsIndian(saved.grandTotal)} Only.` : ""),
  } : previewData;

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    
  <Box
    sx={{
      p: 4,
      minHeight: "100vh",
      background: "#F3EDDF",
    }}
  >
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest }}>Create Sale Invoice</Typography>
      <Typography variant="body2" sx={{ color: "#5b6b60", mb: 3 }}>
        Sell to a buyer, set the letterhead name, and generate the bill PDF.
      </Typography>

      <Grid container spacing={2.5}>
        {/* form */}
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth size="small" label="Buyer" value={buyerId} onChange={(e) => setBuyerId(e.target.value)} sx={fieldSx}>
                  {buyers.length === 0 && <MenuItem disabled value="">No buyers — add one first</MenuItem>}
                  {buyers.map((b) => <MenuItem key={b.id} value={b.id}>{b.buyerName}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={saleDate} onChange={(e) => setSaleDate(e.target.value)} sx={fieldSx} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth size="small" label="Letterhead name (prints on the bill)" value={letterHeadName} onChange={(e) => setLetterHeadName(e.target.value)} sx={fieldSx} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2.5 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle2">Items</Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" startIcon={<Inventory2RoundedIcon />} onClick={addEmptyBox}>Empty box</Button>
                <Button size="small" startIcon={<AddRoundedIcon />} onClick={addItem}>Item</Button>
              </Stack>
            </Stack>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width={150}>Article</TableCell>
                  <TableCell>Material Desc.</TableCell>
                  <TableCell width={80}>Item</TableCell>
                  <TableCell width={90}>Weight kg</TableCell>
                  <TableCell width={80}>Price</TableCell>
                  <TableCell width={100} align="right">Amount</TableCell>
                  <TableCell width={40} />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((it, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <TextField select variant="standard" fullWidth value={it.productId || ""}
                        onChange={(e) => setArticle(i, e.target.value)}
                        helperText={it.productId && stock[it.productId] != null ? `avail ${stock[it.productId]} kg` : ""}
                        FormHelperTextProps={{ sx: { color: it.productId && stock[it.productId] != null && Number(it.weightKg) > stock[it.productId] ? "#B5533C" : "#5b6b60", m: 0 } }}>
                        <MenuItem value="">— custom —</MenuItem>
                        {products.map((p) => <MenuItem key={p.id} value={p.id}>{p.productName}</MenuItem>)}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField variant="standard" fullWidth placeholder="Fresh Capsicum" value={it.description}
                        onChange={(e) => setItem(i, "description", e.target.value)} />
                    </TableCell>
                    <TableCell><TextField variant="standard" type="number" value={it.itemCount} onChange={(e) => setItem(i, "itemCount", e.target.value)} /></TableCell>
                    <TableCell><TextField variant="standard" type="number" value={it.weightKg} onChange={(e) => setItem(i, "weightKg", e.target.value)} /></TableCell>
                    <TableCell><TextField variant="standard" type="number" value={it.price} onChange={(e) => setItem(i, "price", e.target.value)} /></TableCell>
                    <TableCell align="right" sx={{ fontFamily: "monospace", fontWeight: 600 }}>{lineAmount(it).toLocaleString("en-IN")}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => removeItem(i)}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider sx={{ my: 2.5 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}><TextField fullWidth size="small" type="number" label="Hamali" value={hamali} onChange={(e) => setHamali(e.target.value)} sx={fieldSx} /></Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth size="small" type="number" label="Comission" value={commission} onChange={(e) => setCommission(e.target.value)} sx={fieldSx} /></Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth size="small" type="number" label="Transport Advance" value={transportAdvance} onChange={(e) => setTransportAdvance(e.target.value)} sx={fieldSx} /></Grid>
            </Grid>
           <Grid container spacing={2} sx={{ mt: 1 }}>

  <Grid item xs={12} sm={4}>
    <TextField
      fullWidth
      size="small"
      label="Transporter Name"
      value={transporterName}
      onChange={(e) => setTransporterName(e.target.value)}
      sx={fieldSx}
    />
  </Grid>

  <Grid item xs={12} sm={4}>
    <TextField
      fullWidth
      size="small"
      label="Transporter Contact Number"
      value={transporterContact}
      onChange={(e) => setTransporterContact(e.target.value)}
      sx={fieldSx}
    />
  </Grid>

  <Grid item xs={12} sm={4}>
    <TextField
      fullWidth
      size="small"
      label="Vehicle Number"
      value={vehicleNumber}
      onChange={(e) => setVehicleNumber(e.target.value)}
      sx={fieldSx}
    />
  </Grid>

</Grid>
            <Box sx={{ mt: 3, p: 2, borderRadius: 3, background: forest, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Grand Total</span>
              <span style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700 }}>₹ {grandTotal.toLocaleString("en-IN")}</span>
            </Box>
            <Button fullWidth size="large" variant="contained" onClick={save} disabled={saving}
              sx={{ mt: 2, background: forest, "&:hover": { background: "#0b241a" } }}>
              {saving ? <CircularProgress size={22} color="inherit" /> : saved ? "Update & regenerate" : "Save & generate bill"}
            </Button>
          </Card>
        </Grid>

        {/* live bill preview / final bill */}
        <Grid item xs={12} md={5}>
          <Box
  sx={{
    position: "sticky",
    top: 16,
    background: "#FAF6EC",
    borderRadius: 4,
    p: 2,
    border: "1px solid rgba(201,162,75,.35)",
    boxShadow: "0 25px 50px rgba(0,0,0,.08)",
  }}
>
            <Typography variant="overline" sx={{ color: gold }}>{saved ? "Generated bill" : "Live preview"}</Typography>
            <Box sx={{ transform: { md: "scale(0.92)" }, transformOrigin: "top center" }}>
              <InvoiceBill type="SALE" data={billData} logoSrc={logo} canDownload={!!saved} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}