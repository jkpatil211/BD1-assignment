const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();
app.use(cors());

let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyalityRate = 2; // 2 points per $1

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query?.newItemPrice);
  const cartTotal = parseFloat(req.query?.cartTotal);
  const totalPrice = cartTotal + newItemPrice;
  res.send(totalPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query?.cartTotal);
  const isMember = req.query?.isMember == 'true';

  const totalPrice = isMember
    ? cartTotal - cartTotal * (discountPercentage / 100)
    : cartTotal;
  res.send(totalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query?.cartTotal);
  const tax = cartTotal * (taxRate / 100);
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query?.shippingMethod;
  const distance = parseFloat(req.query?.distance);

  const divideByDistance = shippingMethod == 'express' ? 100 : 50;
  const numberOfDays = distance / divideByDistance;
  res.send(numberOfDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query?.weight);
  const distance = parseFloat(req.query?.distance);

  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query?.purchaseAmount);
  const loyalityPoints = 2 * purchaseAmount;
  res.send(loyalityPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app running on ${port}`);
});
