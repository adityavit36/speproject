import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Typography, Paper } from '@mui/material';

function PredictiveAnalysis() {
  const [formData, setFormData] = useState({
    Year: '',
    Present_Price: '',
    Kms_Driven: '',
    Owner: '',
    Fuel_Type_Petrol: 'Petrol',
    Seller_Type_Individual: 'Dealer',
    Transmission_Mannual: 'Manual'
});
const [responseData, setResponseData] = useState(null);
const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const requestBody = {
      Year: formData.Year,
      Present_Price: formData.Present_Price,
      Kms_Driven: formData.Kms_Driven,
      Owner: formData.Owner,
      Fuel_Type_Petrol: formData.Fuel_Type_Petrol,
      Seller_Type_Individual: formData.Seller_Type_Individual,
      Transmission_Mannual: formData.Transmission_Mannual
  };

  try {
    const response = await fetch('http://predictor:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const responseData = await response.json();
    setResponseData(responseData);
  } catch (error) {
    console.error('Error:', error);
    // Handle errors if any
  }

};


    return (
<div>
<div className="row" style={{backgroundImage: "url('https://i.pinimg.com/originals/6b/da/a0/6bdaa07e47a3ab078bb2ca9d14e08c1e.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the div covers the entire viewport height
}}>

  <div className="navbar">
        <img className="logo" src="https://static.vecteezy.com/system/resources/previews/027/585/163/non_2x/yellow-volkswagen-beetle-hot-wheels-sticker-ai-generative-free-png.png" alt="Logo" />
        <ul>
          <li><a href="/" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Home</a></li>
          <li><a href="/" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Travel</a></li>
          <li><a href="/" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Blogs</a></li>
          <li><a href="/" style={{fontSize:'30px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Support</a></li>
        </ul>
  </div>
  <div className="row justify-content-center">
  <div className="d-flex " style={{ paddingLeft: '40%', maxWidth: '70%' }}>
  <form onSubmit={handleSubmit}>
      <div className="mb-3" style={{marginBottom:'10px',marginTop:'10px'}}>
        <label htmlFor="Year" className="form-label" style={{fontSize:'50px',fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Year</label><br/>
        <TextField
          type="number"
          name="Year"
          value={formData.Year}
          onChange={handleChange}
          className="form-control"
          style={{marginBottom:'10px',marginTop:'10px',borderRadius: '20px', // Adjust the value as needed
}}
        />
      </div>
      <div className="mb-3" style={{marginBottom:'10px',marginTop:'10px'}} >
      <label htmlFor="Present_Price" className="form-label" style={{ fontSize: '50px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>
    What is the Showroom Price?(In lakhs)
</label>

        <TextField
          type="text"
          name="Present_Price"
          value={formData.Present_Price}
          onChange={handleChange}
          required
          className="form-control"
          style={{marginBottom:'10px',marginTop:'10px',borderRadius: '20px'
}}
        />
      </div>
      <div className="mb-3" style={{marginBottom:'10px',marginTop:'10px'}} >
        <label htmlFor="Kms_Driven" className="form-label" style={{fontSize:'50px',fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>How Many Kilometers Driven?</label><br/>
        <TextField
          type="text"
          name="Kms_Driven"
          value={formData.Kms_Driven}
          onChange={handleChange}
          required
          className="form-control"
          style={{marginBottom:'10px',marginTop:'10px',borderRadius: '20px' // Adjust the value as needed
}}
          
        />
      </div>
      <div className="mb-3" style={{marginBottom:'10px',marginTop:'10px'}}>
        <label htmlFor="Owner" className="form-label" style={{fontSize:'60px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>How much owners previously had the car(0 or 1 or 3)?</label> <br/>
        <TextField
          type="text"
          name="Owner"
          value={formData.Owner}
          onChange={handleChange}
          required
          className="form-control"
          style={{marginBottom:'10px',marginTop:'10px',borderRadius: '20px' // Adjust the value as needed
}}
        />
      </div>
      <div className="mb-3" style={{marginBottom:'10px',marginTop:'10px'}} >
        <label htmlFor="Fuel_Type_Petrol" className="form-label" style={{fontSize:'60px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>What Is the Fuel type?</label><br/>
        <Select
          name="Fuel_Type_Petrol"
          value={formData.Fuel_Type_Petrol}
          onChange={handleChange}
          required
          className="form-select"
          style={{marginBottom:'10px',marginTop:'10px',borderRadius: '20px' // Adjust the value as needed
}}
        >
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="CNG">CNG</MenuItem>
        </Select>
      </div>
      <div className="mb-3" style={{marginBottom:'10px',marginTop:'10px'}} >
        <label htmlFor="Seller_Type_Individual" className="form-label" style={{fontSize:'60px',fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Are you A Dealer or Individual</label><br/>
        <Select
          name="Seller_Type_Individual"
          value={formData.Seller_Type_Individual}
          onChange={handleChange}
          required
          className="form-select"
          style={{marginBottom:'10px',marginTop:'10px',borderRadius: '20px' // Adjust the value as needed
}}
        >
          <MenuItem value="Dealer">Dealer</MenuItem>
          <MenuItem value="Individual">Individual</MenuItem>
        </Select>
      </div>
      <div className="mb-3" style={{marginBottom:'10px',marginTop:'10px'}} >
        <label htmlFor="Transmission_Mannual" className="form-label" style={{fontSize:'60px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold'}}>Transmission type</label><br/>
        <Select
          name="Transmission_Mannual"
          value={formData.Transmission_Mannual}
          onChange={handleChange}
          required
          className="form-select"
          style={{marginBottom:'10px',marginTop:'10px', borderRadius: '20px' // Adjust the value as needed
}}
        >
          <MenuItem value="Mannual">Manual Car</MenuItem>
          <MenuItem value="Automatic">Automatic Car</MenuItem>
        </Select>
      </div>
       {responseData && (
  <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
    <h2 style={{ marginBottom: '10px' }}>Predictive Analysis Result</h2>
    <div style={{ marginBottom: '10px' }}>
      <strong>Prediction:</strong> {responseData.prediction_text}
    </div>
  </div>
)}
      <div className="mb-3"  >
        <Button type="submit" variant="contained" className="btn btn-primary">Calculate the Selling Price</Button>
      </div>
    </form>
  </div>
    
  </div>
  </div>
  
</div>
);
}

export default PredictiveAnalysis;
