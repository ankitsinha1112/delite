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

export default function Otpresend() {
    const navigate = useNavigate();
    
    const { enqueueSnackbar } = useSnackbar();

    const [value, setValue] = useState({ email: "" })
    const onSignin = () => {
        navigate('/login')
    }

    // Function to check email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // submitting form
    const submitForm = async (e) => {
        e.preventDefault();
        const email = value.email;
        // Check if any field is empty
        if (!email) {
            enqueueSnackbar('All fields are required!', { variant: 'error' });
            return;
        }

        // Check if email format is correct
        if (!isValidEmail(email)) {
            enqueueSnackbar('Invalid email format!', { variant: 'error' });
            return;
        }

        try {
            // console.log(value)
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/resendotp`,
                {
                    email
                }
            );
            if (res.data.success) {
                    enqueueSnackbar('Otp Sent successfully!', { variant: 'success' });
                    navigate('/otp-verify', { state: { email: email } });
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
                enqueueSnackbar('Error occurred while sending OTP. Please try again.', { variant: 'error' });
            }
        } finally {
            setValue({
                email: ""
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
                                  }}>
                                    <span className='violet'>Sending OTP </span>Again !
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
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={value.email}
                                    autoComplete="email"
                                    variant="standard"
                                    autoFocus
                                    onBlur={(e) => changeHandler(e)}
                                    onChange={(e) => changeHandler(e)}
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
                                    Resend
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={onSignin}
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
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}