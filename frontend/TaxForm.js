import React, { useState } from 'react';
import axios from 'axios';

const TaxForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessRegistrationNumber: '',
    yearOfAssessment: '',
    basisPeriod: '',
    address: '',
    contactNumber: '',
    email: '',
    grossIncome: 0,
    cogs: 0,
    operatingExpenses: 0,
    interestExpenses: 0,
    depreciation: 0,
    otherIncome: 0,
    otherExpenses: 0,
    nonTaxableIncome: 0,
    allowableDeductions: 0,
    taxRate: 0,
    offshoreProfitsClaim: false,
    offshoreProfitsDetails: '',
    connectedEntities: [],
    declaration: {
      name: '',
      position: '',
      date: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('http://localhost:3000/submit-bir51', formData, {
        headers: { Authorization: `Bearer ${token}` } // Corrected syntax
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
      <input type="text" name="businessRegistrationNumber" placeholder="Business Registration Number" onChange={handleChange} required />
      <input type="text" name="yearOfAssessment" placeholder="Year of Assessment" onChange={handleChange} required />
      <input type="text" name="basisPeriod" placeholder="Basis Period" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="number" name="grossIncome" placeholder="Gross Income" onChange={handleChange} required />
      <input type="number" name="cogs" placeholder="COGS" onChange={handleChange} required />
      <input type="number" name="operatingExpenses" placeholder="Operating Expenses" onChange={handleChange} required />
      <input type="number" name="interestExpenses" placeholder="Interest Expenses" onChange={handleChange} required />
      <input type="number" name="depreciation" placeholder="Depreciation" onChange={handleChange} required />
      <input type="number" name="otherIncome" placeholder="Other Income" onChange={handleChange} required />
      <input type="number" name="otherExpenses" placeholder="Other Expenses" onChange={handleChange} required />
      <input type="number" name="nonTaxableIncome" placeholder="Non-Taxable Income" onChange={handleChange} required />
      <input type="number" name="allowableDeductions" placeholder="Allowable Deductions" onChange={handleChange} required />
      <input type="number" name="taxRate" placeholder="Tax Rate (%)" onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaxForm;
