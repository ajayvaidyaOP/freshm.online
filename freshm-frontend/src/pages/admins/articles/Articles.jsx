





// import React, { useEffect, useState } from "react";
// import { getAllProducts } from "../../../services/productService";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Avatar,
//   Stack,
// } from "@mui/material";

// import { Add } from "@mui/icons-material";

// const palette = {
//   forestDeep: "#0B2F22",
//   forest: "#0F2E20",
//   gold: "#C9A24B",
//   goldLight: "#E7CD8B",
//   paper: "#FAF6EC",
//   paperDim: "#F3EDDF",
//   ink: "#17231C",
//   inkSoft: "#4B5A50",
//   line: "rgba(201,162,75,0.35)",
// };

// export default function Articles() {
//   const navigate = useNavigate();

//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     try {
//       const data = await getAllProducts();
//       console.log(data);
//       setArticles(data);
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         p: 4,
//         background: palette.paperDim,
//         minHeight: "100vh",
//       }}
//     >
//       {/* Header */}


//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <Box>
//           <Typography
//             sx={{
//               fontFamily: "'Fraunces', serif",
//               fontSize: 34,
//               fontWeight: 600,
//               color: palette.ink,
//             }}
//           >
//             Articles
//           </Typography>

//           <Typography
//             sx={{
//               color: palette.inkSoft,
//               mt: 1,
//             }}
//           >
//             Manage all articles from one place.
//           </Typography>
//         </Box>

//         <Button
//           startIcon={<Add />}
//           variant="contained"
//           onClick={() => navigate("/admin/articles/add")}
//           sx={{
//             px: 3,
//             height: 50,
//             borderRadius: 3,
//             textTransform: "none",
//             fontWeight: 700,
//             background: "linear-gradient(135deg,#0F2E20,#0B2F22)",

//             "&:hover": {
//               background: "linear-gradient(135deg,#081F16,#0B2F22)",
//             },
//           }}
//         >
//           Add Article
//         </Button>
//       </Box>




//       {/* Card */}

//       <Card
//         elevation={0}
//         sx={{
//           borderRadius: 4,
//           background: palette.paper,
//           border: `1px solid ${palette.line}`,
//           boxShadow: "0 25px 50px rgba(0,0,0,.08)",
//         }}
//       >
//         <CardContent sx={{ p: 4 }}>
//           <Typography
//             sx={{
//               fontFamily: "'Fraunces', serif",
//               fontSize: 24,
//               mb: 3,
//             }}
//           >
//             Article Directory
//           </Typography>

//           <TableContainer
//             component={Paper}
//             elevation={0}
//             sx={{
//               borderRadius: 3,
//               border: "1px solid rgba(0,0,0,.08)",
//             }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow
//                   sx={{
//                     background: palette.paperDim,
//                   }}
//                 >
//                   {/* <TableCell>Product Name</TableCell>
//                   <TableCell>Article Name</TableCell>
//                   <TableCell>Size</TableCell>
//                   <TableCell>Destination</TableCell> */}
//                   <TableCell>Article Name</TableCell>
//                   <TableCell>unit </TableCell>
//                   <TableCell>Rate</TableCell>
//                   <TableCell>Destination</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {articles.length > 0 ? (
//                   articles.map((item) => (
//                     <TableRow
//                       key={item.id}
//                       hover
//                       sx={{
//                         "&:hover": {
//                           background: "#FCFBF7",
//                         },
//                       }}
//                     >
//                       <TableCell>
//                         <Stack
//                           direction="row"
//                           spacing={2}
//                           alignItems="center"
//                         >
//                           <Avatar
//                             sx={{
//                               bgcolor: palette.forest,
//                             }}
//                           >
//                             {item.productName?.charAt(0)}
//                           </Avatar>

//                           <Typography fontWeight={600}>
//                             {item.productName}
//                           </Typography>
//                         </Stack>
//                       </TableCell>

//                       <TableCell>{item.articleName}</TableCell>

//                       <TableCell>{item.size}</TableCell>

//                       <TableCell>{item.destination}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={4} align="center">
//                       No Articles Found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/productService";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";

import { Add } from "@mui/icons-material";

const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  goldLight: "#E7CD8B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  line: "rgba(201,162,75,0.35)",
};

export default function Articles() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getAllProducts();
      console.log(data);
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
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
      {/* Header */}


      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontSize: 34,
              fontWeight: 600,
              color: palette.ink,
            }}
          >
            Articles
          </Typography>

          <Typography
            sx={{
              color: palette.inkSoft,
              mt: 1,
            }}
          >
            Manage all articles from one place.
          </Typography>
        </Box>

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/admin/articles/add")}
          sx={{
            px: 3,
            height: 50,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(135deg,#0F2E20,#0B2F22)",

            "&:hover": {
              background: "linear-gradient(135deg,#081F16,#0B2F22)",
            },
          }}
        >
          Add Article
        </Button>
      </Box>




      {/* Card */}

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          background: palette.paper,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 25px 50px rgba(0,0,0,.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontSize: 24,
              mb: 3,
            }}
          >
            Article Directory
          </Typography>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,.08)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: palette.paperDim,
                  }}
                >
                  <TableCell>Product Name</TableCell>
                  <TableCell>Article Name</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Destination</TableCell>
                  {/* <TableCell>Article Name</TableCell>
                  <TableCell>unit </TableCell>
                  <TableCell>Rate</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {articles.length > 0 ? (
                  articles.map((item) => (
                    <TableRow
                      key={item.id}
                      hover
                      sx={{
                        "&:hover": {
                          background: "#FCFBF7",
                        },
                      }}
                    >
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <Avatar
                            sx={{
                              bgcolor: palette.forest,
                            }}
                          >
                            {item.productName?.charAt(0)}
                          </Avatar>

                          <Typography fontWeight={600}>
                            {item.productName}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{item.articleName}</TableCell>

                      <TableCell>{item.size}</TableCell>

                      <TableCell>{item.destination}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Articles Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}