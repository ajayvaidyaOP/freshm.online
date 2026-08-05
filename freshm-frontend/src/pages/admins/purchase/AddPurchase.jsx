

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Stack,
  Divider,
  InputAdornment,
} from "@mui/material";

import {
  ShoppingCart,
  Store,
  Agriculture,
  Inventory2,
  Numbers,
  CurrencyRupee,
  Description,
  Save,
} from "@mui/icons-material";


import {
  createPurchase,
  getAllVendors,
  getAllFarmers,
  getAllProducts,
} from "../../../services/purchaseService";

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
  line: "rgba(201,162,75,0.35)",
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


export default function AddPurchase() {

  const [purchaseType, setPurchaseType] = useState("vendor");

  const [vendors, setVendors] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);

  const [purchase, setPurchase] = useState({
  vendorId: "",
  farmerId: "",
  productId: "",
  unit: "",
  quantity: "",
  kg: "",
  rate: "",
  remarks: "",

  hamali: "",
  commission: "",
  transportAdvance: "",
});
  const [errors, setErrors] = useState({
  vendorId: "",
  farmerId: "",
  productId: "",
  quantity: "",
  rate: "",
});
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    
    try {
      const vendorRes = await getAllVendors();
      console.log("Vendor:", vendorRes);

      const farmerRes = await getAllFarmers();
      console.log("Farmer:", farmerRes);

      const productRes = await getAllProducts();
      console.log("Product:", productRes);

      setVendors(vendorRes);
      setFarmers(farmerRes);
      setProducts(productRes);

    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPurchase((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSave = async () => {
    const newErrors = {};

if (purchaseType === "vendor" && !purchase.vendorId) {
  newErrors.vendorId = "Vendor is required";
}

if (purchaseType === "farmer" && !purchase.farmerId) {
  newErrors.farmerId = "Farmer is required";
}

if (!purchase.productId) {
  newErrors.productId = "Product is required";
}

if (!purchase.quantity) {
  newErrors.quantity = "Quantity is required";
} else if (Number(purchase.quantity) <= 0) {
  newErrors.quantity = "Quantity must be greater than 0";
}

if (!purchase.rate) {
  newErrors.rate = "Rate is required";
} else if (Number(purchase.rate) <= 0) {
  newErrors.rate = "Rate must be greater than 0";
}

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}
    try {

      const payload = {
  vendorId:
    purchaseType === "vendor"
      ? Number(purchase.vendorId)
      : null,

  farmerId:
    purchaseType === "farmer"
      ? Number(purchase.farmerId)
      : null,

  remarks: purchase.remarks,

  hamali: purchase.hamali
    ? Number(purchase.hamali)
    : null,

  commission: purchase.commission
    ? Number(purchase.commission)
    : null,

  transportAdvance: purchase.transportAdvance
    ? Number(purchase.transportAdvance)
    : null,

  items: [
    {
      productId: Number(purchase.productId),
      usesCrates: false,
      quantity: Number(purchase.quantity),
      rate: Number(purchase.rate),
    },
  ],
};

      console.log("Purchase Payload:", payload);

      const response = await createPurchase(payload);

      alert("Purchase Saved Successfully");
      //alert("Purchase ID : " + response.id);
      console.log(response);

      setPurchase({
  vendorId: "",
  farmerId: "",
  productId: "",
  unit: "",
  quantity: "",
  kg: "",
  rate: "",
  remarks: "",

  hamali: "",
  commission: "",
  transportAdvance: "",
});
setErrors({
  vendorId: "",
  farmerId: "",
  productId: "",
  quantity: "",
  rate: "",
});
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("ERROR RESPONSE:", error.response);
  console.log("ERROR DATA:", error.response?.data);

  alert(JSON.stringify(error.response?.data));
}
  };
  return (
    <Box
      sx={{
        p: 4,
        background: palette.paperDim,
        minHeight: "100vh",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontSize: 34,
          fontWeight: 600,
          color: palette.ink,
        }}
      >
        Receive Material
      </Typography>

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          background: palette.paper,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 20px 50px rgba(11,47,34,.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>

          <Grid container spacing={3}>

            {/* Purchase From */}

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Purchase From"
                value={purchaseType}
                onChange={(e) => {
  setPurchaseType(e.target.value);

  setPurchase({
    ...purchase,
    vendorId: "",
    farmerId: "",
  });

  setErrors({
    ...errors,
    vendorId: "",
    farmerId: "",
  });
}}
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ShoppingCart color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="vendor">
                  Vendor
                </MenuItem>

                <MenuItem value="farmer">
                  Farmer
                </MenuItem>

              </TextField>
            </Grid>

            {/* Vendor */}

            {purchaseType === "vendor" && (

              <Grid item xs={12} md={6}>

                <TextField
  select
  fullWidth
  required
  label="Select Vendor"
  name="vendorId"
  value={purchase.vendorId}
  error={!!errors.vendorId}
  helperText={errors.vendorId}
  onChange={(e) => {
    setPurchase({
      ...purchase,
      vendorId: e.target.value,
    });

    setErrors({
      ...errors,
      vendorId: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Store color="action" />
      </InputAdornment>
    ),
  }}
>
  {vendors.map((vendor) => (
    <MenuItem key={vendor.id} value={vendor.id}>
      {vendor.vendorName}
    </MenuItem>
  ))}
</TextField>

              </Grid>

            )}

            {/* Farmer */}

            {purchaseType === "farmer" && (

              <Grid item xs={12} md={6}>

                <TextField
  select
  fullWidth
  required
  label="Select Farmer"
  name="farmerId"
  value={purchase.farmerId}
  error={!!errors.farmerId}
  helperText={errors.farmerId}
  onChange={(e) => {
    setPurchase({
      ...purchase,
      farmerId: e.target.value,
    });

    setErrors({
      ...errors,
      farmerId: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Agriculture color="action" />
      </InputAdornment>
    ),
  }}
>
  {farmers.map((farmer) => (
    <MenuItem key={farmer.id} value={farmer.id}>
      {farmer.farmerName}
    </MenuItem>
  ))}
</TextField>

              </Grid>

            )}

            {/* Product */}

            <Grid item xs={12} md={6}>

              <TextField
  select
  fullWidth
  required
  label="Select Product"
  name="productId"
  value={purchase.productId}
  error={!!errors.productId}
  helperText={errors.productId}
  onChange={(e) => {
    setPurchase({
      ...purchase,
      productId: e.target.value,
    });

    setErrors({
      ...errors,
      productId: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Inventory2 color="action" />
      </InputAdornment>
    ),
  }}
>
  {products.map((product) => (
    <MenuItem key={product.id} value={product.id}>
      {product.productName}
    </MenuItem>
  ))}
</TextField>
            </Grid>
            {/* Quantity */}

            {/* <Grid item xs={12} md={4}>
              <TextField
  fullWidth
  required
  type="number"
  inputProps={{
  min: 1,
}}
  label="Quantity"
  name="quantity"
  value={purchase.quantity}
  error={!!errors.quantity}
  helperText={errors.quantity}
  onChange={(e) => {
    setPurchase({
      ...purchase,
      quantity: e.target.value,
    });

    setErrors({
      ...errors,
      quantity: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Numbers color="action" />
      </InputAdornment>
    ),
  }}
/>
            </Grid> */}
            <Grid item xs={12} md={3}>
  <TextField
  fullWidth
  type="number"
  label="Unit"
  name="unit"
  value={purchase.unit}
  onChange={(e) => {
    const unit = e.target.value;

    setPurchase((prev) => ({
      ...prev,
      unit,
      quantity:
        unit && prev.kg
          ? Number(unit) * Number(prev.kg)
          : "",
    }));
  }}
  sx={fieldSx}
/>
</Grid>
<Grid item xs={12} md={3}>
  <TextField
    fullWidth
    type="number"
    label="KG"
    name="kg"
    value={purchase.kg}
    onChange={(e) => {
      const kg = e.target.value;

      setPurchase((prev) => ({
        ...prev,
        kg,
        quantity:
          prev.unit && kg
            ? Number(prev.unit) * Number(kg)
            : "",
      }));
    }}
    sx={fieldSx}
  />
</Grid>



<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    required
    type="number"
    label="Quantity"
    name="quantity"
    value={purchase.quantity}
    error={!!errors.quantity}
    helperText={errors.quantity}
    onChange={(e) => {
      setPurchase({
        ...purchase,
        quantity: e.target.value,
      });

      setErrors({
        ...errors,
        quantity: "",
      });
    }}
    sx={fieldSx}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Numbers color="action" />
        </InputAdornment>
      ),
    }}
  />
</Grid>
            

             <Grid item xs={12} md={3}>
              <TextField
  fullWidth
  required
  type="number"
  inputProps={{
  min: 1,
}}
  label="Rate"
  name="rate"
  value={purchase.rate}
  error={!!errors.rate}
  helperText={errors.rate}
  onChange={(e) => {
    setPurchase({
      ...purchase,
      rate: e.target.value,
    });

    setErrors({
      ...errors,
      rate: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <CurrencyRupee color="action" />
      </InputAdornment>
    ),
  }}
/>
            </Grid> 

            {/* Total Amount */}

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Total Amount"
                value={
                  purchase.quantity && purchase.rate
                    ? Number(purchase.quantity) * Number(purchase.rate)
                    : 0
                }
                sx={fieldSx}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Remarks */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Remarks"
                name="remarks"
                value={purchase.remarks}
                onChange={handleChange}
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* Charges */}

<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Hamali"
    name="hamali"
    value={purchase.hamali}
    onChange={handleChange}
    sx={fieldSx}
    type="number"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CurrencyRupee fontSize="small" />
        </InputAdornment>
      ),
    }}
  />
</Grid>

<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Commission"
    name="commission"
    value={purchase.commission}
    onChange={handleChange}
    sx={fieldSx}
    type="number"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CurrencyRupee fontSize="small" />
        </InputAdornment>
      ),
    }}
  />
</Grid>

<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Transport Advance"
    name="transportAdvance"
    value={purchase.transportAdvance}
    onChange={handleChange}
    sx={fieldSx}
    type="number"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CurrencyRupee fontSize="small" />
        </InputAdornment>
      ),
    }}
  />
</Grid>

            {/* Save Button */}

            <Grid item xs={12}>
              <Button
                startIcon={<Save />}
                variant="contained"
                onClick={handleSave}
                sx={{
                  mt: 2,
                  px: 5,
                  height: 52,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  background: "linear-gradient(135deg,#0F2E20,#0B2F22)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#081F16,#0B2F22)",
                  },
                }}
              >
                Generate Purchase Invoice
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

    </Box>
  );
}






