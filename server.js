const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const BIR51 = require('./models/BIR51');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taxDB');

// Environment variables
require('dotenv').config();

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Submit BIR51 form
app.post('/submit-bir51', authenticate, async (req, res) => {
  try {
    const formData = req.body;
    const taxResults = calculateTax(formData);
    const completeFormData = { ...formData, ...taxResults };
    const newForm = new BIR51(completeFormData);
    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully', data: completeFormData });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit form' });
  }
});

// Tax calculation function
const calculateTax = (formData) => {
  const { grossIncome, cogs, operatingExpenses, interestExpenses, depreciation, otherIncome, otherExpenses, nonTaxableIncome, allowableDeductions, taxRate } = formData;
  const netProfitBeforeTax = grossIncome - cogs - operatingExpenses - interestExpenses - depreciation + otherIncome - otherExpenses;
  const assessableProfits = netProfitBeforeTax - nonTaxableIncome - allowableDeductions;
  const incomeTaxExpense = assessableProfits * (taxRate / 100);
  const netProfitAfterTax = netProfitBeforeTax - incomeTaxExpense;
  return { incomeTaxExpense, netProfitAfterTax };
};

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});