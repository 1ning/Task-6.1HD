import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import '../Pay.css';
import { useNavigate } from "react-router-dom";
export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  let style= {
    base: {
      fontSize: '18px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  }
  //Make payment settlements and post payment related requests to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    //Make the appropriate judgement statements
    if (!error) {
      console.log("token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8000/stripe/charge",
          {
            amount: 999,
            id: id,
          }
        );
        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("payment successful!");
          const nav = useNavigate();
          nav("/HomePage");
        }
      } catch (error) {
        console.log( error);
      }
    } else {
      console.log(error.message);
    }
  };


  return (
    <div  class="box1">
      <p>Please pay by bank card</p>
      <div class="box2">
    <form onSubmit={handleSubmit} style={{ maxWidth: 380 } } class="form1">
      <CardElement options = {{hidePostalCode: true, style: style}}/>
      <button class="button2">Pay</button>
    </form>
    </div>
    </div>
  );
};
