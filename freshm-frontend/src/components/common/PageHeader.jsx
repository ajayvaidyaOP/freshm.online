import React from "react";
import { Box, Typography } from "@mui/material";

export default function PageHeader({
  title,
  subtitle,
  action
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3
      }}
    >
      <Box>
        <Typography variant="h4">
          {title}
        </Typography>

        {subtitle && (
          <Typography color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {action}
    </Box>
  );
}