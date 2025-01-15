const mongoose = require('mongoose');

const bir51Schema = new mongoose.Schema({
  companyName: { type: String, required: true },
  businessRegistrationNumber: { type: String, required: true },
  yearOfAssessment: { type: String, required: true },
  basisPeriod: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  grossIncome: { type: Number, required: true },
  cogs: { type: Number, required: true },
  operatingExpenses: { type: Number, required: true },
  interestExpenses: { type: Number, required: true },
  depreciation: { type: Number, required: true },
  otherIncome: { type: Number, required: true },
  otherExpenses: { type: Number, required: true },
  nonTaxableIncome: { type: Number, required: true },
  allowableDeductions: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  incomeTaxExpense: { type: Number, required: true },
  netProfitAfterTax: { type: Number, required: true },
  offshoreProfitsClaim: { type: Boolean, required: true },
  offshoreProfitsDetails: { type: String },
  connectedEntities: [{ type: String }],
  declaration: {
    name: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: Date, required: true }
  }
});

const BIR51 = mongoose.model('BIR51', bir51Schema);
module.exports = BIR51;