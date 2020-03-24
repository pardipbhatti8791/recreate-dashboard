import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import MyCheckoutForm from './card';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_1xNR0FViLLIi0WXrxtUS3x9000KQErtTqg");
export default () => {
    // const submit = async (ev) => {
    //     ev.preventDefault();
    //     const { currentTarget } = ev;
    //     const fD = new FormData(currentTarget);
    //     const cardInfo = {
    //       name: fD.get('name'),
    //     };
    //     let { token } = await stripePromise.createToken(
    //       { name: cardInfo.name, }
    //     );
    //     console.log(token)
    //     let response = await fetch(`YOUR_API_URL/charge`, {
    //       method: "POST",
    //       headers: { "Content-Type": "text/plain" },
    //       body: token.id
    //     });

    //     if (response.ok) console.log("Purchase Complete!")
    //   }
  return (
    <Elements stripe={stripePromise}>
      <MyCheckoutForm />
    </Elements>
  );
};