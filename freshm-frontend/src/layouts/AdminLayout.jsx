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

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           minWidth: 0, // prevents flex children (tables/charts) from overflowing on small screens
//           minHeight: "100vh",
//           background: palette.pageBg,
//           padding: { xs: 2, sm: 2.5, md: 3 },
//         }}
//       >
//         <Toolbar />

//         {children}
//       </Box>
//     </Box>
//   );
// }

import React from "react";

import { Box, Toolbar } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

// Same design tokens used across the login screen and sidebar,
// so the content area reads as part of the same product rather
// than a plain default gray canvas.
const palette = {
  pageBg: "#F6F4EC", // warm paper tint instead of a flat neutral gray
};

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Topbar />

      {/* <Box
  component="main"
  sx={{
    flexGrow: 1,
    minWidth: 0,
    minHeight: "100vh",
   background: "transparent",
p: 0,        // <-- padding remove
  }}
>


      
        <Toolbar />

        <Box
    sx={{
      p: 0
    }}
  >
    {children}
  </Box>
</Box> */}

<Box
  component="main"
  sx={{
    flexGrow: 1,
    minWidth: 0,
    minHeight: "100vh",
    background: palette.pageBg,
    p: 0,
  }}
>
  <Toolbar />
  {children}
</Box>

    </Box>
  );
}