import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Homepage from '../HomePage';
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage'
import OtpPage from '../OtpPage'
import OtpResend from '../OtpResens'

const AllRoute = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<SignUpPage />} />
          <Route path='otp-verify' element={<OtpPage />} />
          <Route path='otp-resend' element={<OtpResend />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default AllRoute;
