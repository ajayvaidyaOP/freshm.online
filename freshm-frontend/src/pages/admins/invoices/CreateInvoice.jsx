import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  ReceiptLong,
  Person,
  CalendarToday,
  Inventory,
  Numbers,
  CurrencyRupee,
  Add,
  Delete,
  Save,
} from "@mui/icons-material";
const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  goldLight: "#E7CD8B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  sage: "#7E9A88",
  line: "rgba(201,162,75,.35)",
};
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "#fff",

    "& fieldset": {
      borderColor: "rgba(0,0,0,.12)",
    },

    "&:hover fieldset": {
      borderColor: palette.sage,
    },

    "&.Mui-focused fieldset": {
      borderColor: palette.forest,
      borderWidth: 1.5,
    },
  },
};
export default function CreateInvoice() {
  const navigate = useNavigate();
    const [invoiceNo] = useState(
  "INV-" + Math.floor(1000 + Math.random() * 9000)
);

const [invoiceDate, setInvoiceDate] = useState("");

const [vendorName, setVendorName] = useState("");

const [vendorMobile, setVendorMobile] = useState("");

const [vendorAddress, setVendorAddress] = useState("");

const [items, setItems] = useState([
  {
    itemName: "",
    quantity: 1,
    rate: 0,
    total: 0,
  },
]);
const addItem = () => {
  setItems([
    ...items,
    {
      itemName: "",
      quantity: 1,
      rate: 0,
      total: 0,
    },
  ]);
};
const removeItem = (index) => {
  const copy = [...items];
  copy.splice(index, 1);
  setItems(copy);
};
const handleItemChange = (index, field, value) => {
  const copy = [...items];

  copy[index][field] = value;

  copy[index].total =
    Number(copy[index].quantity) *
    Number(copy[index].rate);

  setItems(copy);
};
const grandTotal = items.reduce(
  (sum, item) => sum + Number(item.total),
  0
);
return (
<Box
sx={{
minHeight:"100vh",
background:palette.paperDim,
p:{xs:2,sm:3,md:4}
}}
>

<Typography
sx={{
fontSize:{xs:28,md:36},
fontWeight:700,
color:palette.ink
}}
>

Create Purchase Invoice

</Typography>

<Typography
sx={{
mb:4,
color:palette.inkSoft
}}
>

Generate purchase invoices for vendors.

</Typography>

<Card
elevation={0}
sx={{
borderRadius:4,
background:palette.paper,
border:`1px solid ${palette.line}`,
}}
>

<CardContent sx={{p:{xs:2,md:4}}}>
<Stack
direction="row"
spacing={2}
alignItems="center"
mb={3}
>

<ReceiptLong
sx={{
color:palette.gold,
fontSize:35
}}
/>

<Typography
fontSize={26}
fontWeight={700}
>

Invoice Information

</Typography>

</Stack>

<Divider sx={{mb:4}}/>
<Grid container spacing={3}>

  {/* Invoice Number */}

  <Grid item xs={12} sm={6} md={4}>
    <TextField
      fullWidth
      label="Invoice Number"
      value={invoiceNo}
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <Numbers />
          </InputAdornment>
        ),
      }}
      sx={fieldSx}
    />
  </Grid>

  {/* Invoice Date */}

<Grid item xs={12} sm={6} md={4}>
<TextField
  fullWidth
  type="date"
  value={invoiceDate}
  onChange={(e) => setInvoiceDate(e.target.value)}
/>
</Grid>
  {/* Vendor Name */}

  <Grid item xs={12} md={4}>
    <TextField
      fullWidth
      label="Vendor Name"
      value={vendorName}
      onChange={(e) => setVendorName(e.target.value)}
      sx={fieldSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Person />
          </InputAdornment>
        ),
      }}
    />
  </Grid>

  {/* Vendor Mobile */}

  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Vendor Mobile"
      value={vendorMobile}
      onChange={(e) => setVendorMobile(e.target.value)}
      sx={fieldSx}
    />
  </Grid>

  {/* Vendor Address */}

  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Vendor Address"
      value={vendorAddress}
      onChange={(e) => setVendorAddress(e.target.value)}
      sx={fieldSx}
    />
  </Grid>

</Grid>

<Box mt={5}>
  <Typography
    sx={{
      fontSize: 22,
      fontWeight: 700,
      color: palette.forest,
      mb: 3,
    }}
  >
    Item Details
  </Typography>
</Box>

{items.map((item, index) => (
  <Card
    key={index}
    sx={{
      mb: 3,
      borderRadius: 3,
      border: `1px solid ${palette.line}`,
      boxShadow: "none",
      background: "#fff",
    }}
  >
    <CardContent>
      <Grid container spacing={2}>

        {/* Item Name */}

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Item Name"
            value={item.itemName}
            onChange={(e) =>
              handleItemChange(index, "itemName", e.target.value)
            }
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Quantity */}

        <Grid item xs={12} sm={4} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
            sx={fieldSx}
          />
        </Grid>

        {/* Rate */}

        <Grid item xs={12} sm={4} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Rate"
            value={item.rate}
            onChange={(e) =>
              handleItemChange(index, "rate", e.target.value)
            }
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupee fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Total */}

        <Grid item xs={12} sm={4} md={2}>
          <TextField
            fullWidth
            label="Total"
            value={item.total}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupee fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={fieldSx}
          />
        </Grid>

        {/* Delete Button */}

        <Grid
          item
          xs={12}
          md={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            color="error"
            onClick={() => removeItem(index)}
            disabled={items.length === 1}
          >
            <Delete />
          </IconButton>
        </Grid>

      </Grid>
    </CardContent>
  </Card>
))}

<Button
  startIcon={<Add />}
  variant="outlined"
  onClick={addItem}
  sx={{
    mt: 2,
    borderRadius: 2,
    textTransform: "none",
    borderColor: palette.forest,
    color: palette.forest,
    fontWeight: 700,

    "&:hover": {
      borderColor: palette.forestDeep,
      background: "#f7f7f7",
    },
  }}
>
  Add Item
</Button>
{/* Grand Total Section */}

<Card
  sx={{
    mt: 4,
    borderRadius: 3,
    border: `1px solid ${palette.line}`,
    background: "#fff",
    boxShadow: "none",
  }}
>
  <CardContent>

    <Grid container spacing={3}>

      {/* GST */}

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          select
          label="GST (%)"
          defaultValue="18"
          sx={fieldSx}
        >
          <MenuItem value={0}>0%</MenuItem>
          <MenuItem value={5}>5%</MenuItem>
          <MenuItem value={12}>12%</MenuItem>
          <MenuItem value={18}>18%</MenuItem>
          <MenuItem value={28}>28%</MenuItem>
        </TextField>
      </Grid>

      {/* Payment Status */}

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          select
          label="Payment Status"
          defaultValue="Pending"
          sx={fieldSx}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Partial">Partial</MenuItem>
        </TextField>
      </Grid>

      {/* Grand Total */}

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "flex-start",
              md: "flex-end",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 22,
                md: 30,
              },
              fontWeight: 700,
              color: palette.forest,
            }}
          >
            Grand Total : ₹ {grandTotal.toFixed(2)}
          </Typography>
        </Box>
      </Grid>

    </Grid>

  </CardContent>
</Card>

{/* Buttons */}

<Box
  sx={{
    mt: 4,
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: {
      xs: "center",
      md: "flex-end",
    },
  }}
>

  <Button
    variant="outlined"
     onClick={() => navigate("/admin/invoices")}
    sx={{
      height: 50,
      px: 4,
      borderRadius: 2,
      textTransform: "none",
      borderColor: palette.forest,
      color: palette.forest,
      fontWeight: 700,
    }}
  >
    Cancel
  </Button>

  <Button
    startIcon={<Save />}
    variant="contained"
    onClick={() => {
    // Backend API नंतर इथे call करायचा

    navigate("/admin/invoices");
  }}
    sx={{
      height: 50,
      px: 4,
      borderRadius: 2,
      textTransform: "none",
      fontWeight: 700,
      background:
        "linear-gradient(135deg,#0F2E20,#0B2F22)",

      "&:hover": {
        background:
          "linear-gradient(135deg,#081F16,#0B2F22)",
      },
    }}
  >
    Save Invoice
  </Button>

</Box>
{/* Invoice Preview */}

<Box mt={6}>
  <Typography
    sx={{
      fontSize: 24,
      fontWeight: 700,
      color: palette.forest,
      mb: 3,
    }}
  >
    Invoice Preview
  </Typography>

  <Card
    sx={{
      borderRadius: 4,
      border: `1px solid ${palette.line}`,
      background: "#fff",
      boxShadow: "none",
    }}
  >
    <CardContent>

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              color: palette.forest,
            }}
          >
            FreshM ERP
          </Typography>

          <Typography color="text.secondary">
            Purchase Invoice
          </Typography>
        </Box>

        <Box textAlign={{ xs: "left", md: "right" }}>
          <Typography>
            <b>Invoice No :</b> {invoiceNo}
          </Typography>

          <Typography>
            <b>Date :</b> {invoiceDate || "--"}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography>
        <b>Vendor :</b> {vendorName || "--"}
      </Typography>

      <Typography>
        <b>Mobile :</b> {vendorMobile || "--"}
      </Typography>

      <Typography>
        <b>Address :</b> {vendorAddress || "--"}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            borderBottom: "1px dashed #ddd",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography sx={{ minWidth: 120 }}>
            {item.itemName || "Item"}
          </Typography>

          <Typography>
            Qty : {item.quantity}
          </Typography>

          <Typography>
            ₹ {item.rate}
          </Typography>

          <Typography fontWeight={700}>
            ₹ {item.total}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />

      <Typography
        align="right"
        sx={{
          fontSize: 28,
          fontWeight: 700,
          color: palette.forest,
        }}
      >
        Total : ₹ {grandTotal.toFixed(2)}
      </Typography>

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        mt={4}
      >
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mt: 4,
  }}
>
  <Button
    variant="contained"
    sx={{
      background: "#29B6F6",
      color: "#fff",
      textTransform: "none",
      px: 5,
      py: 1.5,
      borderRadius: 2,
      fontWeight: 700,
      "&:hover": {
        background: "#039BE5",
      },
    }}
  >
    Download PDF
  </Button>
</Box>

        
      </Stack>

    </CardContent>
  </Card>
</Box>
  </CardContent>
</Card>

</Box>
);
}