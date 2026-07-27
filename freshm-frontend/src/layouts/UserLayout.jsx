import React from "react";
import PortalLayout from "../components/layout/PortalLayout";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InventoryRoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

// Operations portal — the warehouse/packhouse user role.
const menu = [
  { title: "Overview", path: "/user/dashboard", icon: <DashboardRoundedIcon /> },
  { title: "Received Material", path: "/user/material", icon: <WarehouseRoundedIcon /> },
  { title: "Available Stock", path: "/user/stock", icon: <InventoryRoundedIcon /> },
  { title: "Payments", path: "/user/payments", icon: <PaymentsRoundedIcon /> },
  { title: "Invoices", path: "/user/invoices", icon: <ReceiptLongRoundedIcon /> },
];

export default function UserLayout({ children }) {
  return (
    <PortalLayout menu={menu} portal="Operations">
      {children}
    </PortalLayout>
  );
}
