// import React from "react";

// import {
// Box,
// Grid,
// Card,
// CardContent,
// Typography
// } from "@mui/material";


// import {
// BarChart,
// Bar,
// XAxis,
// YAxis,
// Tooltip,
// ResponsiveContainer
// } from "recharts";


// const palette = {
//   paper: "#FAF6EC",
//   paperDim: "#F3EDDF",
//   ink: "#17231C",
//   inkSoft: "#4B5A50",
// };

// const data=[

// {
// month:"Jan",
// purchase:40000,
// payment:30000
// },

// {
// month:"Feb",
// purchase:65000,
// payment:50000
// },

// {
// month:"Mar",
// purchase:85000,
// payment:60000
// },

// {
// month:"Apr",
// purchase:45000,
// payment:40000
// }

// ];


// export default function Reports(){


// return(

// <Box
//   sx={{
//     p: 4,
//     background: palette.paperDim,
//     minHeight: "100vh",
//   }}
// >

//  <Typography
//     sx={{
//       fontFamily: "'Fraunces', serif",
//       fontSize: 34,
//       fontWeight: 600,
//       color: palette.ink,
//     }}
//   >
//     Reports Dashboard
//   </Typography>



// <Grid container spacing={3}>


// <Grid item xs={12} md={4}>


// <Card>

// <CardContent>


// <Typography color="text.secondary">

// Total Purchase

// </Typography>


// <Typography

// variant="h4"

// fontWeight={700}

// >

// ₹2,50,000

// </Typography>


// </CardContent>

// </Card>


// </Grid>




// <Grid item xs={12} md={4}>


// <Card>

// <CardContent>


// <Typography color="text.secondary">

// Total Payments

// </Typography>


// <Typography

// variant="h4"

// fontWeight={700}

// >

// ₹1,80,000

// </Typography>


// </CardContent>

// </Card>


// </Grid>




// <Grid item xs={12} md={4}>


// <Card>

// <CardContent>


// <Typography color="text.secondary">

// Pending Amount

// </Typography>


// <Typography

// variant="h4"

// fontWeight={700}

// >

// ₹70,000

// </Typography>


// </CardContent>

// </Card>


// </Grid>


// </Grid>





// <Box mt={5}>


// <Card>


// <CardContent>


// <Typography

// variant="h6"

// mb={3}

// >

// Purchase vs Payment Report

// </Typography>



// <ResponsiveContainer

// height={300}

// width="100%"

// >


// <BarChart data={data}>


// <XAxis dataKey="month"/>


// <YAxis/>


// <Tooltip/>


// <Bar

// dataKey="purchase"

// fill="#0B8F4D"

// />



// <Bar

// dataKey="payment"

// fill="#D62828"

// />


// </BarChart>


// </ResponsiveContainer>


// </CardContent>


// </Card>


// </Box>



// </Box>


// )

// }



import React from "react";
import { useEffect, useState } from "react";
import { getReportSummary, getReportGraph } from "../../services/reportService";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ShoppingCart,
  Payments,
  AccountBalanceWallet,
  LocalShipping,
  RequestQuote,
  Paid,
} from "@mui/icons-material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const palette = {
  forest: "#0F2E20",
  forestDark: "#0B2418",
  gold: "#C9A24B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  line: "rgba(201,162,75,.25)",
};


export default function Reports() {

  
const [summary, setSummary] = useState({
  totalPurchase: 0,
  totalPayment: 0,
  pendingAmount: 0,
  hamali: 0,
  commission: 0,
  transportAdvance: 0,
});
const [graphData, setGraphData] = useState([]);
useEffect(() => {
  loadSummary();
  loadGraph();
}, []);


const loadSummary = async () => {
  try {
    const res = await getReportSummary();
    setSummary(res.data);
  } catch (error) {
    console.error(error);
  }
};

const loadGraph = async () => {
  try {
    const res = await getReportGraph();
    setGraphData([res.data]);
  } catch (error) {
    console.error(error);
  }
};
const data = graphData;



const summaryCards = [
  {
    title: "Total Purchase",
    value: `₹${summary.totalPurchase || 0}`,
    color: "#0F8F4D",
    icon: <ShoppingCart />,
  },
  {
    title: "Total Payment",
    value: `₹${summary.totalPayment || 0}`,
    color: "#1565C0",
    icon: <Payments />,
  },
  {
    title: "Pending Amount",
    value: `₹${summary.pendingAmount || 0}`,
    color: "#D32F2F",
    icon: <AccountBalanceWallet />,
  },
  {
    title: "Hamali",
    value: `₹${summary.hamali || 0}`,
    color: "#8E24AA",
    icon: <Paid />,
  },
  {
    title: "Commission",
    value: `₹${summary.commission || 0}`,
    color: "#F9A825",
    icon: <RequestQuote />,
  },
  {
    title: "Transport Advance",
    value: `₹${summary.transportAdvance || 0}`,
    color: "#FB8C00",
    icon: <LocalShipping />,
  },
];
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
          fontSize: 34,
          fontWeight: 700,
          color: palette.forest,
          mb: 4,
          fontFamily: "'Fraunces', serif",
        }}
      >
        Reports Dashboard
      </Typography>
            {/* ================= Summary Cards ================= */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: 1.5,
    mb: 4,
  }}
>
  {summaryCards.map((card, index) => (
    <Card
      key={index}
      sx={{
        flex: 1,
        minWidth: 0,
        borderRadius: 3,
        background: "#fff",
        border: "1px solid rgba(201,162,75,.20)",
        boxShadow: "0 6px 18px rgba(15,46,32,.08)",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 25px rgba(15,46,32,.15)",
        },
      }}
    >
      <CardContent sx={{ p: 1.8 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: "#6B7280",
                whiteSpace: "nowrap",
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 18,
                fontWeight: 700,
                color: "#17231C",
              }}
            >
              {card.value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: card.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              ml: 1,

              "& svg": {
                fontSize: 20,
              },
            }}
          >
            {card.icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  ))}
</Box>
        {/* {summaryCards.map((card, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 240,
              flexShrink: 0,
              borderRadius: 4,
              background: "#fff",
              border: "1px solid rgba(201,162,75,.20)",
              boxShadow: "0 10px 30px rgba(15,46,32,.08)",
              transition: ".3s",
              cursor: "pointer",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 20px 40px rgba(15,46,32,.18)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#6B7280",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#17231C",
                    }}
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",

                    "& svg": {
                      fontSize: 30,
                    },
                  }}
                >
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box> */}
            {/* ================= Graph ================= */}

     <Card
  sx={{
    borderRadius: 4,
    border: "1px solid rgba(201,162,75,.20)",
    boxShadow: "0 12px 30px rgba(15,46,32,.08)",
  }}
>
  <CardContent sx={{ p: 3 }}>
    <Typography
      sx={{
        fontSize: 22,
        fontWeight: 700,
        color: palette.forest,
        mb: 3,
      }}
    >
      Current Month Report
    </Typography>

    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 14 }}
        />

        <YAxis tickFormatter={(value) => `₹${value}`} />

<Tooltip
  formatter={(value, name) => [`₹${value}`, name]}
/>

<Legend />

        <Bar
          dataKey="purchase"
          name="Purchase"
          fill="#0F8F4D"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="payment"
          name="Payment"
          fill="#1976D2"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="pending"
          name="Pending"
          fill="#D32F2F"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="hamali"
          name="Hamali"
          fill="#8E24AA"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="commission"
          name="Commission"
          fill="#F9A825"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="transport"
          name="Transport Advance"
          fill="#FB8C00"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
    </Box>
  );
}