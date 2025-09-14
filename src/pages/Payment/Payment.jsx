import React, { useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import classes from './Payment.module.css';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { db } from '../../utility/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { Type } from '../../utility/action.type';
// Initialize Stripe
const stripePromise = loadStripe(
  'pk_test_51S5kjZQft4xY10eHXl6Purir44ePJmhFFTM8tAGv7dl5jGMnXjslLwsncuxHPTikkSdfbKVKFNpjjJlITmrM12pJ00fBVGhH0I'
);

// Payment Form Component
function PaymentForm() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount * 100 + amount;
  }, 0);
  const ItemAmount = basket.reduce((amount, item) => {
    return item.amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState(null);
  const [processing, setProcessing] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async event => {
    event.preventDefault();

    //1 backend or function contact to client secret
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${totalPrice}`,
      });
      // console.log(response.data);

      const clientSecret = response.data?.clientSecret;

      // console.log(clientSecret)
      //2 client side(react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email || '',
            name: user?.displayName || 'Customer',
          },
        },
      });
      // console.log(paymentIntent);

      //3 after the confirmation ==> order firestore database save, clear basket
      await setDoc(doc(db, 'users', user.uid, 'orders', paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setProcessing(false);
      navigate('/orders', { state: { msg: 'you have placed your order' } });
      dispatch({ type: Type.EMPTY_BASKET});
    } catch (error) {}
    setProcessing(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.formGroup}>
        <label>Card Details</label>
        <CardElement options={cardElementOptions} />
      </div>

      {error && <div className={classes.error}>{error}</div>}

      <button
        type="submit"
        // disabled={!stripe || processing}
        className={classes.payButton}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

export default function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const ItemAmount = basket.reduce((amount, item) => {
    return item.amount;
  }, 0);

  return (
    <Layout>
      <div className={classes.payment__header}>CheckOut {totalItem} items </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || ''}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard
                key={item.id || index}
                products={item}
                flex={true}
                isButton={false}
              />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </div>
          <div>
            <div>
              <span>
                Total Order | <CurrencyFormat amount={totalPrice} />
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
