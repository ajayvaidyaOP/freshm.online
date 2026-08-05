

import React from "react";
import { Box, Toolbar } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const palette = {
  pageBg: "#F6F4EC",
};

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Topbar />

      
<Box
  component="main"
  sx={{
    flexGrow: 1,
    width: "100%",
    minWidth: 0,
    minHeight: "100vh",
    background: palette.pageBg,
    overflowX: "hidden",
  }}
>
  <Toolbar sx={{ minHeight: "72px !important" }} />

  {children}
</Box>
</Box>
    
  );
}
// import React from "react";

// import { Box, Toolbar } from "@mui/material";

// import Sidebar from "../components/layout/Sidebar";
// import Topbar from "../components/layout/Topbar";

// // Same design tokens used across the login screen and sidebar,
// // so the content area reads as part of the same product rather
// // than a plain default gray canvas.
// const palette = {
//   pageBg: "#F6F4EC", // warm paper tint instead of a flat neutral gray
// };

// export default function AdminLayout({ children }) {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />

//       <Topbar />

     
// <Box
//   component="main"
//   sx={{
//     flexGrow: 1,
//     minWidth: 0,
//     minHeight: "100vh",
//     background: palette.pageBg,
//     p: 0,
//   }}
// >
//   <Toolbar />
//   {children}
// </Box>

//     </Box>
//   );
// }