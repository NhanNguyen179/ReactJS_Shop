import userAPI from "../../api/userFunction";
import { Box, Container, Grid, Typography } from "@mui/material";
import { CustomButton } from "../common/CustomButton";
import { CustomTextField } from "../common/CustomTextField";
import { useHistory } from "react-router-dom";




export default function Forgotpassword() {
    const navigated = useHistory();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const data_temp = {
            username: data.get('username'),
            email: data.get('email'),
            certificate: data.get('certificate')
        }

        const response: any = await userAPI.forgotPassword(data_temp);
        if (response.status === 200) {
            navigated.push('/sign-in');
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
                        marginBottom: "50px",
                    }}>
                        <Typography component="h1" variant="h5" >
                            Thông tin cá nhân
                        </Typography>
                    </Box>

                    <Grid container spacing={2} xs={12}>
                        <Grid item xs={12}>
                            <CustomTextField
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Tên tài khoản"
                                autoFocus
                                type="text"
                                id="username" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} xs={12}>
                        <Grid item xs={6}>
                            <CustomTextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Địa chỉ email"
                                type="text"
                                id="email"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                margin="normal"
                                required
                                fullWidth
                                name="certificate"
                                label="Chứng minh thư"
                                type="text"
                                id="certificate"

                            />
                        </Grid>
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