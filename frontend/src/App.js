
import React,{useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import './App.css'



function App() {
  const [product, setProduct] = useState({
    name: 'React from FB',
    price: 10,
    productBy: 'Facebook'
  });

  const makePayment = token =>{
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:3001/payment`,{
      method: 'POST',
      headers,
      body :JSON.stringify(body)

    }).then(response =>{
      console.log("RESPONSE",response);
      const {status} = response;
      console.log("STATUS",status);
    }).catch(error => console.log(error))
  }

  return (
   <div className="container">
    <StripeCheckout
      stripeKey= {process.env.REACT_APP_KEY}
      token={makePayment}
      name="Buy Product"
      amount={product.price * 100}
      // shippingAddress
      // billingAddress
    >
      <button className="btn-large pink">Buy Product {product.price}$</button>
    </StripeCheckout>
   </div>
  );
}

export default App;
