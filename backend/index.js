const cors = require('cors');
const express = require('express');

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_KEY)
const uuid = require("uuid/v4")

const app = express();


// middleware

app.use(express.json())
app.use(cors())


// routes
app.get("/",(req,res)=>{
    res.send("It works")
})

app.post("/payment",(req,res)=>{
    const {product, token} = req.body;

    console.log("products",product)
    console.log("Price",product.price)

    const itempontencyKey = uuid();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            descripton: ` Purchase of product.name`,
            shipping: {
                name: token.card.name,
                address:{
                    country: token.card.address_country
                }
            }
        }, {itempontencyKey})
    }).then(result => res.status(200).json(result))
      .catch(err=> console.log(err))
});

// listen

app.listen(3001,()=> console.log("Listen at port 3001"));
