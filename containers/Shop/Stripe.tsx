import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

export const StripeCheckoutForm = ({ children }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Use your card Element with other Stripe.js APIs
    // const {error, paymentMethod} = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    // });

     // Call your backend to create the Checkout Session
     const response = await fetch('/create-checkout-session', { method: 'POST' });
 
     const session = await response.json();
 
     // When the customer clicks on the button, redirect them to Checkout.
     const result = await stripe.redirectToCheckout({
       sessionId: session.id,
     });
 
     if (result.error) {
        console.log('[error]', result.error);
       // If `redirectToCheckout` fails due to a browser or network
       // error, display the localized error message to your customer
       // using `result.error.message`.
     }
  };

  return (
    <div onClick={handleSubmit}>
      {children}
    </div>
  );
};