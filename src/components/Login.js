import { React, useState } from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import backimg from "../images/sideimg.png";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import "./main.css";

export default function Login() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);

    const [value, setValue] = useState({ email: "", password: "" })
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSignup = () => {
        navigate('/register')
    }
    const onResendOtp = () => {
        navigate('/otp-resend')
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
        const password = value.password;
        // Check if any field is empty
        if (!email || !password) {
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
                `${process.env.REACT_APP_BASE_URL}/api/login`,
                {
                    email,
                    password
                }
            );
            if (res.data.success) {

                localStorage.setItem("id", res.data.id);
                localStorage.setItem("token", res.data.token);
                // Set the loggedIn key to true to indicate user is logged in
                localStorage.setItem("loggedIn", "true");

                enqueueSnackbar('LoggedIn successfully!', { variant: 'success' });
                setValue({
                    email: "", password: ""
                });
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
                enqueueSnackbar('Error occurred while signing in. Please try again.', { variant: 'error' });
            }
        } finally {

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
                                mx: 4,
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
                                    <span className='violet'>Fill what we know</span> !
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    value={value.password}
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    variant="standard"
                                    onBlur={(e) => changeHandler(e)}
                                    onChange={(e) => changeHandler(e)}
                                    autoComplete="current-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    sx={{
                                                        color: '#3A244A'
                                                      }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
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
                                    Sign In
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
                                <Grid container>
                                    <Grid item xs mt={2}>
                                        <Link variant="body2" onClick={onResendOtp} style={{cursor:"pointer"}}>
                                            Resend OTP?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}