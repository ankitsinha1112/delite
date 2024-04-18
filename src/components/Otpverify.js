import { React, useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import backimg from "../images/sideimg.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import "./main.css";

export default function Otpverify() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)
    const email = location.state?.email;
    useEffect(() => {
        if (!email) {
            navigate('/register')
        }
    }, [])

    const { enqueueSnackbar } = useSnackbar();

    const [value, setValue] = useState({ otp: "" })
    const onSignup = () => {
        navigate('/register')
    }

    // submitting form
    const submitForm = async (e) => {
        e.preventDefault();
        // const email = value.email;
        const otp = value.otp;
        // Check if any field is empty
        if (!otp) {
            enqueueSnackbar('All fields are required!', { variant: 'error' });
            return;
        }

        try {
            // console.log(value)
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/verifyotp`,
                {
                    email,
                    otp
                }
            );
            if (res.data.success) {

                localStorage.setItem("id", res.data.id);
                localStorage.setItem("token", res.data.token);
                // Set the loggedIn key to true to indicate user is logged in
                localStorage.setItem("loggedIn", "true");

                enqueueSnackbar('OTP Verified successfully!', { variant: 'success' });
                navigate('/')
            } else {
                console.log("Error Occurred");
                enqueueSnackbar(res.data.error, { variant: 'error' });
            }
        } catch (error) {
            console.log(error);
            if (error.response.data.success === false) {
                enqueueSnackbar(error.response.data.error, { variant: 'info' });
            }
            else {
                enqueueSnackbar('Error occurred while verification. Please try again.', { variant: 'error' });
            }
        } finally {
            setValue({
                otp: ""
            });
        }
    };

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    marginTop: 15,
                    marginBottom: 15,
                }}
            >
                <Grid
                    container

                >
                    <CssBaseline />
                    <Grid
                        item
                        xs={12} // Show only on extra small screens
                        sx={{
                            display: { xs: 'block', sm: 'none' }, // Show on xs, hide on sm and above
                            textAlign: 'center',
                        }}
                    >
                        <img src={backimg} alt="Background" style={{ width: '100%' }} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: `url(${backimg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={6}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            borderRadius: '10px', // Add border radius
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Grid container justifyContent="space-between" alignItems="flex-end" className='toptitle'>
                                <Typography component="h1" variant="h3" className='heading3'
                                  sx={{
                                    fontSize: {
                                      xs: '1.6rem', 
                                      md: '3rem', 
                                      lg: '3.5rem', 
                                    },
                                  }}
                                >
                                    <span className='violet'>Otp Verif</span>ication !
                                </Typography>
                            </Grid>

                            <Box
                                component="form"
                                noValidate
                                onSubmit={submitForm}
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="otp"
                                    value={value.otp}
                                    label="Otp"
                                    type={'text'}
                                    id="otp"
                                    variant="standard"
                                    onBlur={(e) => changeHandler(e)}
                                    onChange={(e) => changeHandler(e)}
                                    autoComplete="otp"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        color: '#FFFFFF', // Text color
                                        backgroundColor: '#3A244A', // Background color
                                        borderRadius: '10px', // Add border radius
                                        border: '1px solid #3A244A', // Add border
                                        '&:hover': {
                                            backgroundColor: '#FFFFFF', // Change background color on hover
                                            color: '#3A244A', // Change background color on hover
                                        },
                                        mt: 3, mb: 1
                                    }}
                                >
                                    Verify
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={onSignup}
                                    sx={{
                                        color: '#3A244A', // Text color
                                        backgroundColor: '#FFFFFF', // Background color
                                        borderRadius: '10px', // Add border radius
                                        border: '1px solid #3A244A', // Add border
                                        '&:hover': {
                                            backgroundColor: '#3A244A', // Change background color on hover
                                            color: '#FFFFFF', // Change background color on hover
                                        },
                                        mt: 3, mb: 1
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}