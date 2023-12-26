import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
 // Import the loading spinner component
import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import { TailSpin } from "react-loader-spinner";

const stripePromise = loadStripe("pk_test_51NyCFBSCCTdQdcCzn6teDmBvmB5xn3xXLwT4TBLBatGNyCpyjbzZHaqPFvvInJl2UdORVtLTsMHqabCi1Qs3QAUj00KQmEICl6");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false); // Set loading to false once clientSecret is fetched
      });
  }, [currentOrder.totalAmount]); // Add currentOrder.totalAmount as a dependency

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {loading ? (
        // Display loading spinner while waiting for clientSecret
        <div className="flex items-center justify-center h-screen">
          <TailSpin
          visible={true}
          
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
        </div>
        
      ) : (
        // Display Elements component once clientSecret is available
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
