// import React from "react";

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
//   Chip,
//   Avatar,
//   Stack,
// } from "@mui/material";

// import {
//   Person,
//   Add,
//   Email,
// } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";

// const users = [
//   {
//     id: 1,
//     name: "Ramesh",
//     email: "ramesh@gmail.com",
//     role: "USER",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Suresh",
//     email: "suresh@gmail.com",
//     role: "USER",
//     status: "Active",
//   },
// ];

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

// export default function Users() {
//   const navigate = useNavigate();

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
//             Users
//           </Typography>

//           <Typography
//             sx={{
//               color: palette.inkSoft,
//               mt: 1,
//             }}
//           >
//             Manage all ERP users from one place.
//           </Typography>
//         </Box>

//         <Button
//           startIcon={<Add />}
//           variant="contained"
//           onClick={() => navigate("/admin/users/add")}
//           sx={{
//             px: 3,
//             height: 50,
//             borderRadius: 3,
//             textTransform: "none",
//             fontWeight: 700,
//             background:
//               "linear-gradient(135deg,#0F2E20,#0B2F22)",

//             "&:hover": {
//               background:
//                 "linear-gradient(135deg,#081F16,#0B2F22)",
//             },
//           }}
//         >
//           Create User
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
//             User Directory
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
//                   <TableCell>Name</TableCell>

//                   <TableCell>Email</TableCell>

//                   <TableCell>Role</TableCell>

//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow
//                     key={user.id}
//                     hover
//                     sx={{
//                       "&:hover": {
//                         background: "#FCFBF7",
//                       },
//                     }}
//                   >
//                     <TableCell>
//                       <Stack
//                         direction="row"
//                         spacing={2}
//                         alignItems="center"
//                       >
//                         <Avatar
//                           sx={{
//                             bgcolor: palette.forest,
//                           }}
//                         >
//                           <Person />
//                         </Avatar>

//                         <Typography fontWeight={600}>
//                           {user.name}
//                         </Typography>
//                       </Stack>
//                     </TableCell>

//                     <TableCell>
//                       <Stack
//                         direction="row"
//                         spacing={1}
//                         alignItems="center"
//                       >
//                         <Email
//                           sx={{
//                             color: palette.inkSoft,
//                             fontSize: 18,
//                           }}
//                         />

//                         {user.email}
//                       </Stack>
//                     </TableCell>

//                     <TableCell>
//                       <Chip
//                         label={user.role}
//                         sx={{
//                           bgcolor: palette.goldLight,
//                           color: palette.forest,
//                           fontWeight: 700,
//                         }}
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <Chip
//                         label={user.status}
//                         color="success"
//                         variant="outlined"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "../../../services/api";

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
  Chip,
  Avatar,
  Stack,
} from "@mui/material";

import {
  Person,
  Add,
  Email,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

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

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log("Users API Response:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
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
            Users
          </Typography>

          <Typography
            sx={{
              color: palette.inkSoft,
              mt: 1,
            }}
          >
            Manage all ERP users from one place.
          </Typography>
        </Box>

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/admin/users/add")}
          sx={{
            px: 3,
            height: 50,
            borderRadius: 3,
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
          Create User
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
            User Directory
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
                  <TableCell>Name</TableCell>

                  <TableCell>Email</TableCell>

                  <TableCell>Role</TableCell>

                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
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
                          <Person />
                        </Avatar>

                        <Typography fontWeight={600}>
                          {user.fullName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Email
                          sx={{
                            color: palette.inkSoft,
                            fontSize: 18,
                          }}
                        />

                        {user.email}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={user.role}
                        sx={{
                          bgcolor: palette.goldLight,
                          color: palette.forest,
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={user.active ? "Active" : "Inactive"}
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}