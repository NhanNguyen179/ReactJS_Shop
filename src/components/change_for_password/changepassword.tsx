import { Container } from "@material-ui/core";
import { Box, Grid, Typography } from "@mui/material";
import { eventNames } from "process";
import { useState } from "react";
import { useHistory } from "react-router";
import userAPI from "../../api/userFunction";
import { CustomButton } from "../common/CustomButton";
import { CustomTextField } from "../common/CustomTextField";


export default function ChangePassword() {
    const [password, setPassword] = useState<any>("");
    const [confirm_password, setConfirmPassword] = useState<any>("");
    const [check, setCheck] = useState<boolean>(false);
    const navigated = useHistory();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data_form = new FormData(event.currentTarget);
        const data_sent = {
            old_password: data_form.get('old_password'),
            password: data_form.get('password')
        }
        const response: any = await userAPI.changePassword(data_sent);
        if (response.status === 200) {
            navigated.push('/sign-in');
        }
    }
    const handleChangeConfirmPassword = (event: any) => {
        setConfirmPassword(event.target.value);
        if (password !== event.target.value) {
            setCheck(false);
        } else {
            setCheck(true);
        }

    }

    return (
        <Grid container xs={12}>
            <Container component="main" maxWidth="sm">
                <Box component="form"
                    sx={{
                        marginTop: "100px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    onSubmit={handleSubmit}
                >
                    <Box sx={{
                        alignItems: "center",
                        marginBottom: "50px"
                    }}>
                        <Typography component="h1" variant="h5">
                            Change Password
                        </Typography>
                    </Box>
                    <Grid container spacing={2} xs={12}>
                        <CustomTextField
                            margin="normal"
                            required
                            fullWidth
                            name="old_password"
                            label="OldPassword"
                            type="password"
                            id="old_password"
                        />
                        <CustomTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <CustomTextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            id="confirm_password"
                            onChange={handleChangeConfirmPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            check ? <Typography style={{ color: "green" }}>Password is valid </Typography> : <Typography style={{ color: "red" }}> Password is not valid</Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Xác nhận
                        </CustomButton>
                    </Grid>
                </Box>
            </Container>
        </Grid >
    )
}