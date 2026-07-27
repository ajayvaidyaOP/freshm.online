import React from "react";
import { Box, Grid, Stack, Typography, Switch, Divider, Button } from "@mui/material";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { palette } from "../../theme/theme";
import { PageHeader, SectionCard } from "../../components/ui/kit";

function Row({ title, hint, control }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5 }}>
      <Box sx={{ pr: 2 }}>
        <Typography sx={{ fontWeight: 600, color: palette.ink }}>{title}</Typography>
        <Typography variant="body2">{hint}</Typography>
      </Box>
      {control}
    </Stack>
  );
}

export default function PlatformSettings() {
  return (
    <Box>
      <PageHeader eyebrow="Platform" title="Settings"
        subtitle="Defaults applied across every company on the platform." />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <SectionCard eyebrow="Security" title="Access & sessions">
            <Row title="Force strong passwords" hint="Require 8+ chars with a number for all new logins." control={<Switch defaultChecked color="success" />} />
            <Divider />
            <Row title="Auto sign-out" hint="End idle sessions after 24 hours." control={<Switch defaultChecked color="success" />} />
            <Divider />
            <Row title="Tenant isolation" hint="Company data is never shared across tenants." control={
              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: palette.leaf }}>
                <ShieldRoundedIcon fontSize="small" /><Typography sx={{ fontWeight: 600, fontSize: 13 }}>Enforced</Typography>
              </Stack>} />
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <SectionCard eyebrow="Branding" title="Platform identity">
            <Typography variant="body2" sx={{ mb: 2 }}>
              FreshM ships to every tenant. Individual companies set their own invoice letterhead inside their admin workspace.
            </Typography>
            <Button variant="outlined" fullWidth>Manage platform branding</Button>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
