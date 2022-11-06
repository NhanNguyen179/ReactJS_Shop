import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import userFunction from "../../api/userFunction";
import { Select } from "@mui/material";
const Profile = () => {
  const id: String = '0940440f-130e-43a3-8808-a13ba6090abf';
  const [profile, setProfile] = React.useState<any>();
  // const [payment_type, setPayment] = React.useState<any[]>([]);
  React.useEffect(() => {
    async function fetchData() {
      const responseProfile: any = await userFunction.fetch_data_profile(id)
      // const responsePayment: any = await userFunction.fetch_data_payment_type();
      setProfile(responseProfile.data.profile);
      // setPayment(responsePayment.data);
    }
    fetchData();
  }, [])
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              value={profile?.name}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Select label="Gender" name="gender" fullWidth>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="age"
              name="age"
              value={profile?.age}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phone_number"
              name="phone_number"
              value={profile?.phone_number}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              value={profile?.email}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="certificate"
              name="certificate"
              value={profile?.certificate}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Box>
      </Container>
    </React.Fragment >
  );
}
export default Profile;
