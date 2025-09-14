import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import Cart from './pages/Cart/Cart';
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Auth from './pages/Auth/Auth';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe(
  'pk_test_51S5kjZQft4xY10eHXl6Purir44ePJmhFFTM8tAGv7dl5jGMnXjslLwsncuxHPTikkSdfbKVKFNpjjJlITmrM12pJ00fBVGhH0I'
);

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={'you must login to pay'}
              redirect={'/payments'}
            >
              <CheckoutProvider stripe={stripePromise}>
                <Payment />
              </CheckoutProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={'you must login to see your orders'}
              redirect={'/orders'}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
