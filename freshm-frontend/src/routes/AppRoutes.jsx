import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


// Auth
import Login from "../pages/auth/Login";
import Unauthorized from "../pages/auth/Unauthorized";
import ProtectedRoute from "../pages/auth/ProtectedRoute";


// Layouts
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import UserLayout from "../layouts/UserLayout";



// Super Admin
import SuperAdminDashboard 
from "../pages/super-admin/SuperAdminDashboard";



// Admin Dashboard

import Dashboard 
from "../pages/admins/Dashboard";



// Users

import Users 
from "../pages/admins/users/Users";

import AddUser
from "../pages/admins/users/AddUser";



// Vendors

import Vendors
from "../pages/admins/vendors/Vendors";

import AddVendor
from "../pages/admins/vendors/AddVendor";



// Farmers

import Farmers
from "../pages/admins/farmers/Farmers";

import AddFarmer
from "../pages/admins/farmers/AddFarmer";



// Articles

import Articles
from "../pages/admins/articles/Articles";


import AddArticle
from "../pages/admins/articles/AddArticle";



// Purchase

import Purchase
from "../pages/admins/purchase/Purchase";


import AddPurchase
from "../pages/admins/purchase/AddPurchase";


import PurchaseInvoice
from "../pages/admins/purchase/PurchaseInvoice";



// Payments

import Payments
from "../pages/admins/payments/Payments";


import AddPayment
from "../pages/admins/payments/AddPayment";


import PaymentReceipt
from "../pages/admins/payments/PaymentReceipt";



// Invoices

import Invoices
from "../pages/admins/invoices/Invoices";



// Reports

import Reports
from "../pages/admins/Reports";



// Settings

import Settings
from "../pages/admins/Settings";



// Company

import CompanyProfile
from "../pages/admins/company/CompanyProfile";


import LetterHeadSettings
from "../pages/admins/company/LetterHeadSettings";



// User

import UserDashboard
from "../pages/user/UserDashboard";


import ReceivedMaterial
from "../pages/user/ReceivedMaterial";


import UserPayments
from "../pages/user/UserPayments";


import UserInvoices
from "../pages/user/UserInvoices";





function AppRoutes(){


return(


<BrowserRouter>


<Routes>



{/* LOGIN */}

<Route

path="/login"

element={<Login/>}

/>



<Route

path="/unauthorized"

element={<Unauthorized/>}

/>





{/* ================= SUPER ADMIN ================= */}



<Route

path="/super-admin/dashboard"

element={


<ProtectedRoute

allowedRoles={["SUPER_ADMIN"]}

>


<SuperAdminLayout>


<SuperAdminDashboard/>


</SuperAdminLayout>


</ProtectedRoute>


}

/>







{/* ================= ADMIN ================= */}




<Route

path="/admin/dashboard"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Dashboard/>


</AdminLayout>


</ProtectedRoute>

}

/>





<Route

path="/admin/users"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Users/>


</AdminLayout>


</ProtectedRoute>

}

/>



<Route

path="/admin/users/add"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<AddUser/>


</AdminLayout>


</ProtectedRoute>

}

/>






<Route

path="/admin/vendors"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Vendors/>


</AdminLayout>


</ProtectedRoute>

}

/>



<Route

path="/admin/vendors/add"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<AddVendor/>


</AdminLayout>


</ProtectedRoute>

}

/>






<Route

path="/admin/farmers"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Farmers/>


</AdminLayout>


</ProtectedRoute>

}

/>



<Route

path="/admin/farmers/add"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<AddFarmer/>


</AdminLayout>


</ProtectedRoute>

}

/>







<Route

path="/admin/articles"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Articles/>


</AdminLayout>


</ProtectedRoute>

}

/>



<Route

path="/admin/articles/add"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<AddArticle/>


</AdminLayout>


</ProtectedRoute>

}

/>








<Route

path="/admin/purchase"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Purchase/>


</AdminLayout>


</ProtectedRoute>

}

/>



<Route

path="/admin/purchase/add"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<AddPurchase/>


</AdminLayout>


</ProtectedRoute>

}

/>




<Route

path="/admin/purchase/invoice"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<PurchaseInvoice/>


</AdminLayout>


</ProtectedRoute>

}

/>







<Route

path="/admin/payments"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Payments/>


</AdminLayout>


</ProtectedRoute>

}

/>




<Route

path="/admin/payments/add"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<AddPayment/>


</AdminLayout>


</ProtectedRoute>

}

/>



<Route

path="/admin/payments/receipt"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<PaymentReceipt/>


</AdminLayout>


</ProtectedRoute>

}

/>







<Route

path="/admin/invoices"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Invoices/>


</AdminLayout>


</ProtectedRoute>

}

/>







<Route

path="/admin/reports"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Reports/>


</AdminLayout>


</ProtectedRoute>

}

/>






<Route

path="/admin/settings"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<Settings/>


</AdminLayout>


</ProtectedRoute>

}

/>






<Route

path="/admin/company"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<CompanyProfile/>


</AdminLayout>


</ProtectedRoute>

}

/>




<Route

path="/admin/company/letterhead"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>


<AdminLayout>


<LetterHeadSettings/>


</AdminLayout>


</ProtectedRoute>

}

/>








{/* ================= USER ================= */}



<Route

path="/user/dashboard"

element={

<ProtectedRoute allowedRoles={["USER"]}>


<UserLayout>


<UserDashboard/>


</UserLayout>


</ProtectedRoute>

}

/>





<Route

path="/user/material"

element={

<ProtectedRoute allowedRoles={["USER"]}>


<UserLayout>


<ReceivedMaterial/>


</UserLayout>


</ProtectedRoute>

}

/>





<Route

path="/user/payments"

element={

<ProtectedRoute allowedRoles={["USER"]}>


<UserLayout>


<UserPayments/>


</UserLayout>


</ProtectedRoute>

}

/>





<Route

path="/user/invoices"

element={

<ProtectedRoute allowedRoles={["USER"]}>


<UserLayout>


<UserInvoices/>


</UserLayout>


</ProtectedRoute>

}

/>





{/* FALLBACK */}


<Route

path="*"

element={<Login/>}

/>



</Routes>


</BrowserRouter>


)

}



export default AppRoutes;