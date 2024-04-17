import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import './page1.css';
import { Link } from 'react-router-dom';

const generateRandomOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit OTP
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split('T')[0]; // Extracting yyyy-mm-dd from ISO format
  return formattedDate;
};

const Page1 = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');
  const [expectedPDF, setExpectedPDF] = useState('');
  const [otpVerification, setOtpVerification] = useState('');
  const [randomOTP, setRandomOTP] = useState('');
  const [selectedPDFs, setSelectedPDFs] = useState([]);
  const [otpResult, setOtpResult] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleExpectedPDFChange = (e) => {
    setExpectedPDF(e.target.value);
  };

  const handleOtpVerificationChange = (e) => {
    setOtpVerification(e.target.value);
  };

  const handleGenerateOTPClick = () => {
    const otp = generateRandomOTP();
    setRandomOTP(otp);
  };

  const handleLogButtonClick = () => {
    const logData = {
      startDate: formatDate(startDate), // Format the date before saving to logData
      endDate: formatDate(endDate), // Format the date before saving to logData
      email,
      expectedPDF,
      otpVerification,
      randomOTP,
    };
    setSelectedPDFs([...selectedPDFs, logData]);
  };

  const handleVerifyOTPClick = () => {
    if (otpVerification === randomOTP) {
      setOtpResult('OTP Matched');
    } else {
      setOtpResult('Invalid OTP');
    }
  };

  const handleSubmitButtonClick = () => {
    // Convert selectedPDFs to a table format
    const tableContent = selectedPDFs.map((data, index) => (
      `<tr key=${index}><td>${data.startDate}</td><td>${data.endDate}</td><td>${data.email}</td><td>${data.expectedPDF}</td><td>${data.otpVerification}</td><td>${data.randomOTP}</td></tr>`
    ));

    // Combine the table rows and add table tags
    const tableHTML = `<table><thead><tr><th>Start Date</th><th>End Date</th><th>Email</th><th>Expected PDF</th><th>OTP Verification</th><th>Random OTP</th></tr></thead><tbody>${tableContent.join('')}</tbody></table>`;

    // Store the table HTML in local storage
    localStorage.setItem('selectedPDFsTable', tableHTML);
  };

  return (
    <div className="App">
      <Container component={Paper} maxWidth="100%" style={{ padding: '20px', marginTop: '20px',  background: 'linear-gradient(to bottom,#BADAF5, white)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src="https://media.licdn.com/dms/image/C510BAQEJ9KUhl0TuxA/company-logo_200_200/0/1630629051409?e=2147483647&v=beta&t=QAb0CNhaDUoos0FdJUvhnUzVY8qdvhtZ8gkt442XYxk" alt="Logo" style={{ width: '50px', height: '50px' }} />
      <label><b>Finkraft</b></label>
    </div><br/>
        <hr/><br/>
<div className='div1'>
  <div style={{ display: 'flex', alignItems: 'center', gap: '120px' }}>    
  <label>Start Date </label>
  <TextField
    type="date"
    value={startDate}
    onChange={handleStartDateChange}
    fullWidth
    margin="normal"
    InputLabelProps={{ shrink: true }}
    InputProps={{}} // Empty object to remove placeholder text
    sx={{ width: '30%' }}
    style={{ width: '500px', height: '40px', background: 'transparent'}}
  />
  </div>     
  <br/>

  <div style={{ display: 'flex', alignItems: 'center', gap: '125px' }}>   
  <label>End Date</label>
  <TextField
    type="date"
    value={endDate}
    onChange={handleEndDateChange}
    fullWidth
    margin="normal"
    InputProps={{}} // Empty object to remove placeholder text
    sx={{ width: '30%'}}
    style={{ width: '500px', height: '40px', background: 'transparent' }}
  />
  </div>
  <br/>


<div style={{ display: 'flex', alignItems: 'center', gap: '150px' }}>
  <label>Email </label>
  <TextField
    label="Email"
    type="email"
    value={email}
    onChange={handleEmailChange}
    fullWidth
    margin="normal"
    sx={{ width: '30%', marginBottom: '20px' }} // Adjust the width and margin as needed
    style={{ width: '500px', height: '40px', background: 'transparent' }}
  />
</div>
<br/><br/>
        
<div style={{ display: 'flex', alignItems: 'center', gap: '55px' }}>
<Button variant="contained" onClick={handleGenerateOTPClick} style={{ background: 'transparent', color: 'black' }}>Generate OTP</Button>
<Typography variant="h6" gutterBottom>OTP: {randomOTP}</Typography>

</div>
<br/><br/>
  
<div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
  <Button type='link' variant="contained" onClick={handleVerifyOTPClick} style={{ width:'130px' ,background: 'transparent', color: 'black', border:'none'}}>Verify OTP</Button>
  <TextField
    label="OTP Verification"
    value={otpVerification}
    onChange={handleOtpVerificationChange}
    fullWidthmargin="normal"
    
    style={{ width: '500px', height: '40px', background: 'transparent' }}
  />
  <Typography>{otpResult}</Typography>
</div>
<br/>
<br/>
      
        
        

        <Button
  variant="contained"
  onClick={handleSubmitButtonClick}
  style={{ width: '600px', height: '40px', background: '#4c8d9c' }}
>
  Submit
</Button>
<Link to='Page2'>
<Button
  variant="contained"
  onClick={handleSubmitButtonClick}
  style={{ width: '200px', height: '40px', background: '#4c8d9c' }}
>
  Log
</Button>
</Link>

</div>
        {selectedPDFs.map((data, index) => (
          <ul key={index}>
            <li><strong>Start Date:</strong> {data.startDate}</li>
            <li><strong>End Date:</strong> {data.endDate}</li>
            <li><strong>Email:</strong> {data.email}</li>
            <li><strong>Expected PDF:</strong> {data.expectedPDF}</li>
            <li><strong>OTP Verification:</strong> {data.otpVerification}</li>
            <li><strong>Random OTP:</strong> {data.randomOTP}</li>
          </ul>
        ))}

      </Container>
    </div>
  );
};

export default Page1;