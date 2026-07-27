import React from "react";
import { Box, Grid, Card, Stack, Typography, Divider, Chip } from "@mui/material";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { sa, sprout, mono, display, readUser } from "../../superadmin/saTokens";

function Field({ label, value }) {
  return (
    <Box sx={{ py: 1.25 }}>
      <Typography sx={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: sa.slate }}>{label}</Typography>
      <Typography sx={{ fontWeight: 600, color: sa.ink, mt: 0.25 }}>{value || "—"}</Typography>
    </Box>
  );
}

export default function SuperAdminSettings() {
  const user = readUser();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", color: sa.leaf, textTransform: "uppercase" }}>Platform</Typography>
        <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 30, color: sa.ink, mt: 0.25 }}>Settings</Typography>
        <Typography variant="body2" sx={{ color: sa.slate, mt: 0.5 }}>Your account and platform-wide guarantees.</Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 4.5, border: `1px solid ${sa.line}`, height: "100%" }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Box sx={{ width: 46, height: 46, borderRadius: "50%", background: sprout, display: "grid", placeItems: "center", color: sa.forestDeep }}>
                <PersonRoundedIcon />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: sa.ink }}>Your account</Typography>
                <Chip size="small" label="SUPER ADMIN" sx={{ fontFamily: mono, fontWeight: 600, color: sa.forestDeep, background: "rgba(125,190,60,0.16)", border: `1px solid ${sa.leaf}` }} />
              </Box>
            </Stack>
            <Divider />
            <Field label="Name" value={user.fullName} />
            <Divider />
            <Field label="Email" value={user.email} />
            <Divider />
            <Field label="Role" value={user.role} />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 4.5, border: `1px solid ${sa.line}`, height: "100%" }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Box sx={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(46,139,78,0.12)", display: "grid", placeItems: "center", color: sa.leaf }}>
                <ShieldRoundedIcon />
              </Box>
              <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: sa.ink }}>Platform guarantees</Typography>
            </Stack>
            <Stack spacing={1.5}>
              <Guarantee title="Tenant isolation" body="Every company's data is scoped to its own workspace — no company can read another's." />
              <Guarantee title="Auto admin provisioning" body="Creating a company issues its admin login automatically." />
              <Guarantee title="Reversible disable" body="Disabling a company blocks sign-in without deleting any data." />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function Guarantee({ title, body }) {
  return (
    <Box sx={{ p: 1.75, borderRadius: 3, background: sa.bone, border: `1px solid ${sa.line}` }}>
      <Typography sx={{ fontWeight: 600, color: sa.ink }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: sa.slate, mt: 0.25 }}>{body}</Typography>
    </Box>
  );
}
