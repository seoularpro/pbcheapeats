import React, { useState } from 'react';
import { Box, TextField, Button, Typography,Checkbox ,FormControlLabel} from '@mui/material';
import axios from 'axios';

const DeliveryRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    alreadyPaid: false,
    orderDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://safe-chamber-28420-2e8556f993b6.herokuapp.com/send-alert', formData);
      alert('Successfully submitted order! We will contact you shortly for confirmation.');
      setFormData({
        name: '',
        phone: '',
        alreadyPaid: false,
        orderDetails: ''
      });
      window.location.href = '/'
    } catch (err) {
      console.error('Failed to submit order:', err);
      alert('Failed to submit order, please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: 'auto',
        gap: '16px',
        padding: '24px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography variant="h5" align="center" marginBottom="16px">
        Submit Delivery Request
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        type="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        fullWidth
      />
      
      <TextField
        label="Order Details"
        name="orderDetails"
        value={formData.orderDetails}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={4}
      />
      <FormControlLabel control={<Checkbox value={formData.alreadyPaid} onChange={handleChange} />} 
        label="Already Paid?"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Submit
      </Button>
    </Box>
  );
};

export default DeliveryRequestForm;
