import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Unauthorized from "../pages/auth/Unauthorized";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import UserLayout from "../layouts/UserLayout";

// Super Admin
import SuperAdminDashboard from "../pages/super-admin/SuperAdminDashboard";
import Companies from "../pages/super-admin/Companies";
import Admins from "../pages/super-admin/Admins";
import PlatformSettings from "../pages/super-admin/PlatformSettings";

// Admin
import Dashboard from "../pages/admins/Dashboard";
import Users from "../pages/admins/users/Users";
import AddUser from "../pages/admins/users/AddUser";
import Vendors from "../pages/admins/vendors/Vendors";
import AddVendor from "../pages/admins/vendors/AddVendor";
import Farmers from "../pages/admins/farmers/Farmers";
import AddFarmer from "../pages/admins/farmers/AddFarmer";
import Articles from "../pages/admins/articles/Articles";
import AddArticle from "../pages/admins/articles/AddArticle";
import Purchase from "../pages/admins/purchase/Purchase";
import AddPurchase from "../pages/admins/purchase/AddPurchase";
import PurchaseInvoice from "../pages/admins/purchase/PurchaseInvoice";
import Payments from "../pages/admins/payments/Payments";
import AddPayment from "../pages/admins/payments/AddPayment";
import PaymentReceipt from "../pages/admins/payments/PaymentReceipt";
import Invoices from "../pages/admins/invoices/Invoices";
import Reports from "../pages/admins/Reports";
import Settings from "../pages/admins/Settings";
import CompanyProfile from "../pages/admins/company/CompanyProfile";
import LetterHeadSettings from "../pages/admins/company/LetterHeadSettings";

// User (Operations)
import UserDashboard from "../pages/users/UserDashboard";
import ReceivedMaterial from "../pages/users/ReceivedMaterial";
import AvailableStock from "../pages/users/AvailableStock";
import UserPayments from "../pages/users/UserPayments";
import UserInvoices from "../pages/users/UserInvoices";

// Small helper to keep every guarded route on one line.
const guard = (roles, Layout, Page) => (
  <ProtectedRoute allowedRoles={roles}>
    <Layout>
      <Page />
    </Layout>
  </ProtectedRoute>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ===== SUPER ADMIN ===== */}
        <Route path="/super-admin/dashboard" element={guard(["SUPER_ADMIN"], SuperAdminLayout, SuperAdminDashboard)} />
        <Route path="/super-admin/companies" element={guard(["SUPER_ADMIN"], SuperAdminLayout, Companies)} />
        <Route path="/super-admin/admins" element={guard(["SUPER_ADMIN"], SuperAdminLayout, Admins)} />
        <Route path="/super-admin/settings" element={guard(["SUPER_ADMIN"], SuperAdminLayout, PlatformSettings)} />

        {/* ===== ADMIN ===== */}
        <Route path="/admin/dashboard" element={guard(["ADMIN"], AdminLayout, Dashboard)} />
        <Route path="/admin/users" element={guard(["ADMIN"], AdminLayout, Users)} />
        <Route path="/admin/users/add" element={guard(["ADMIN"], AdminLayout, AddUser)} />
        <Route path="/admin/vendors" element={guard(["ADMIN"], AdminLayout, Vendors)} />
        <Route path="/admin/vendors/add" element={guard(["ADMIN"], AdminLayout, AddVendor)} />
        <Route path="/admin/farmers" element={guard(["ADMIN"], AdminLayout, Farmers)} />
        <Route path="/admin/farmers/add" element={guard(["ADMIN"], AdminLayout, AddFarmer)} />
        <Route path="/admin/articles" element={guard(["ADMIN"], AdminLayout, Articles)} />
        <Route path="/admin/articles/add" element={guard(["ADMIN"], AdminLayout, AddArticle)} />
        <Route path="/admin/purchase" element={guard(["ADMIN"], AdminLayout, Purchase)} />
        <Route path="/admin/purchase/add" element={guard(["ADMIN"], AdminLayout, AddPurchase)} />
        <Route path="/admin/purchase/invoice" element={guard(["ADMIN"], AdminLayout, PurchaseInvoice)} />
        <Route path="/admin/payments" element={guard(["ADMIN"], AdminLayout, Payments)} />
        <Route path="/admin/payments/add" element={guard(["ADMIN"], AdminLayout, AddPayment)} />
        <Route path="/admin/payments/receipt" element={guard(["ADMIN"], AdminLayout, PaymentReceipt)} />
        <Route path="/admin/invoices" element={guard(["ADMIN"], AdminLayout, Invoices)} />
        <Route path="/admin/reports" element={guard(["ADMIN"], AdminLayout, Reports)} />
        <Route path="/admin/settings" element={guard(["ADMIN"], AdminLayout, Settings)} />
        <Route path="/admin/company" element={guard(["ADMIN"], AdminLayout, CompanyProfile)} />
        <Route path="/admin/company/letterhead" element={guard(["ADMIN"], AdminLayout, LetterHeadSettings)} />

        {/* ===== USER (Operations) ===== */}
        <Route path="/user/dashboard" element={guard(["USER"], UserLayout, UserDashboard)} />
        <Route path="/user/material" element={guard(["USER"], UserLayout, ReceivedMaterial)} />
        <Route path="/user/stock" element={guard(["USER"], UserLayout, AvailableStock)} />
        <Route path="/user/payments" element={guard(["USER"], UserLayout, UserPayments)} />
        <Route path="/user/invoices" element={guard(["USER"], UserLayout, UserInvoices)} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
