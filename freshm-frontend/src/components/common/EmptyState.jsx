import React from "react";
import { Box, Typography } from "@mui/material";

export default function EmptyState({ message = "No data available." }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6
      }}
    >
      <Typography color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}