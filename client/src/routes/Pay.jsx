import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import { CheckoutForm } from "./CheckoutForm";


const PUBLIC_KEY = "pk_test_51LoSPNGf7xX6DrhUwV3GL70C2j9cJICGnu0vW85ksSyw5RbYYYMNI53xNu8x3iNyQqV7QNxUe3l02pRW36RcTGrd00NhjfF5Kp";


const stripeTestPromise = loadStripe(PUBLIC_KEY);


const Pay = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};


export default Pay;
