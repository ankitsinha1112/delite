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
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import "./main.css";

const contacts = [
  {
    value: 'email',
    label: 'Email',
  }
];
export default function Signup() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState({ first_name: "", last_name: "", email: "", password: "", contact: "", cnfpassword: "" })

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    const contact = value.contact;
    const email = value.email;
    const password = value.password;
    const cnfpassword = value.cnfpassword;
    const name = value.first_name + ' ' + value.last_name;
    // Check if any field is empty
    if (!value.first_name || !value.last_name || !email || !password || !cnfpassword || !contact) {
      enqueueSnackbar('All fields are required!', { variant: 'error' });
      return;
    }

    // Check if email format is correct
    if (!isValidEmail(email)) {
      enqueueSnackbar('Invalid email format!', { variant: 'error' });
      return;
    }
// password should have atleast 5 letters
    if (password.length < 5) {
      enqueueSnackbar('Password must be at least 5 characters long!', { variant: 'error' });
      return;
    }
    // password matches or not 
    if (password !== cnfpassword) {
      enqueueSnackbar('The confirmed password must match the entered password!', { variant: 'error' });
      return;
    }

    try {
      // console.log(value)
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/signup`,
        {
          name,
          email,
          password
        }
      );
      console.log(res.data)
      if (res.data.success) {
        enqueueSnackbar('Registration Complete successfully! Please Enter Your Otp', { variant: 'success' });
        navigate('/otp-verify', { state: { email: email } });
      }else {
        console.log("Error Occurred");
        enqueueSnackbar(res.data.error, { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.success === false) {
        enqueueSnackbar(error.response.data.error , { variant: 'info' });
      }
      else{
        enqueueSnackbar('Error occurred while signing up. Please try again.', { variant: 'error' });
      }
    } finally {
      setValue({
        first_name: "", last_name: "", email: "", password: "", cnfpassword: "", contact: ""
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
          marginTop: 4,
          marginBottom: 4,
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
              backgroundSize: "contain",
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
                  <span className='violet'>Let us know</span> !
                </Typography>
                <Typography component="h1" variant="h5" className='heading5'
                  onClick={onSignin}
                  sx={{
                    fontSize: {
                      xs: '1.2rem', 
                      md: '1.5rem', 
                      lg: '1.7rem', 
                    },
                  }}
                  >
                  <span className='violet'>Sign </span>In
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
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  value={value.first_name}
                  autoComplete="first_name"
                  variant="standard"
                  autoFocus
                  onBlur={(e) => changeHandler(e)}
                  onChange={(e) => changeHandler(e)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  value={value.last_name}
                  autoComplete="last_name"
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
                  label="Set Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  variant="standard"
                  autoComplete="current-password"
                  onBlur={(e) => changeHandler(e)}
                  onChange={(e) => changeHandler(e)}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="cnfpassword"
                  value={value.cnfpassword}
                  label="Retype Password"
                  type={showPassword1 ? 'text' : 'password'}
                  id="cnfpassword"
                  variant="standard"
                  autoComplete="confirm-password"
                  onBlur={(e) => changeHandler(e)}
                  onChange={(e) => changeHandler(e)}
                  InputProps={{ 
                    endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          color: '#3A244A'
                        }}
                      >
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  id="outlined-select-currency"
                  select
                  required
                  fullWidth
                  name="contact"
                  value={value.contact}
                  label="Contact Mode"
                  variant="standard"
                  onBlur={(e) => changeHandler(e)}
                  onChange={(e) => changeHandler(e)}
                >
                  {contacts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {
                  (value.contact) ?
                    (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Enter Email"
                        name="email"
                        value={value.email}
                        autoComplete="email"
                        variant="standard"
                        autoFocus
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                      />) : null
                }
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