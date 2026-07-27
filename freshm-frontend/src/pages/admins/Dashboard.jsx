import React from "react";

import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ============================================================
// DESIGN TOKENS — same palette as the login screen and sidebar.
// ============================================================
const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  goldLight: "#E7CD8B",
  rust: "#B5533C",
  amber: "#C97A2B",
  paper: "#FFFFFF",
  ink: "#17231C",
  inkSoft: "#5C6B61",
  line: "rgba(15,46,32,0.08)",
};

const cards = [
  {
    title: "Total Vendors",
    value: "325",
    icon: <PeopleIcon />,
    color: palette.forest,
  },

  {
    title: "Total Farmers",
    value: "1250",
    icon: <AgricultureIcon />,
    color: palette.gold,
  },

  {
    title: "Today's Purchase",
    value: "₹4,25,000",
    icon: <ShoppingCartIcon />,
    color: palette.rust,
  },

  {
    title: "Pending Payments",
    value: "₹2,18,500",
    icon: <PaymentsIcon />,
    color: palette.amber,
  },
];

const chartData = [
  {
    month: "Jan",
    purchase: 4000,
  },

  {
    month: "Feb",
    purchase: 6500,
  },

  {
    month: "Mar",
    purchase: 5000,
  },

  {
    month: "Apr",
    purchase: 8500,
  },

  {
    month: "May",
    purchase: 7200,
  },
];

export default function Dashboard() {
  return (
    <Box>
      {/* ---- Page header ---- */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          sx={{
            fontSize: 11.5,
            letterSpacing: 2.2,
            fontWeight: 700,
            color: palette.rust,
            mb: 0.5,
          }}
        >
          OVERVIEW
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: { xs: 26, sm: 30, md: 34 },
            color: palette.ink,
          }}
        >
          Dashboard
        </Typography>

        <Typography sx={{ mt: 0.5, fontSize: 14, color: palette.inkSoft }}>
          A snapshot of vendors, farmers, purchases and payments today.
        </Typography>
      </Box>

      {/* ---- KPI cards ---- */}
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${palette.line}`,
                background: palette.paper,
                transition: "transform .18s ease, box-shadow .18s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 30px -18px rgba(15,46,32,0.35)",
                },
              }}
            >
              <CardContent sx={{ p: 2.75 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        letterSpacing: 0.3,
                        color: palette.inkSoft,
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontFamily: "'Fraunces', serif",
                        fontWeight: 600,
                        fontSize: 26,
                        color: palette.ink,
                      }}
                    >
                      {card.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      background: `${card.color}1A`,
                      color: card.color,
                      width: 46,
                      height: 46,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ---- Chart ---- */}
      <Box mt={4}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${palette.line}`,
            background: palette.paper,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              sx={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: 19,
                color: palette.ink,
                mb: 3,
              }}
            >
              Monthly Purchase Analytics
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid
                  vertical={false}
                  stroke={palette.line}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12.5, fill: palette.inkSoft }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12.5, fill: palette.inkSoft }}
                />

                <Tooltip
                  cursor={{ fill: "rgba(15,46,32,0.05)" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: `1px solid ${palette.line}`,
                    fontSize: 13,
                  }}
                />

                <Bar
                  dataKey="purchase"
                  fill={palette.gold}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
