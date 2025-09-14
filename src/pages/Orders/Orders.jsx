import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { db } from '../../utility/firebase';
import { DataContext } from '../../components/DataProvider/DataProvider';
import classes from './Orders.module.css';
// Import the correct Firestore functions
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import ProductCard from '../../components/Product/ProductCard';

export default function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      // 1. Create a reference to the user's orders subcollection
      const ordersRef = collection(db, 'users', user.uid, 'orders');

      // 2. Create a query: get all orders, ordered by 'created' descending
      const q = query(ordersRef, orderBy('created', 'desc'));

      // 3. Set up a real-time listener with onSnapshot
      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          // 4. Map through the documents to get the data
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id, // The unique order ID
            ...doc.data(), // All the order data (items, amount, created, etc.)
          }));
          // 5. Update state with the new orders array
          setOrders(ordersData);
        },
        error => {
          // 6. Handle any 
          setOrders([])
          console.error('Error fetching orders: ', error);
        }
      );

      // 7. Cleanup function: unsubscribe from the listener when component unmounts
      return () => unsubscribe();
    } else {
      // If no user, clear orders
      setOrders([]);
    }
  }, [user]); // ✅ Re-run effect if the `user` changes

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>

          {orders.length === 0 ? (
            <p>You have no orders yet.</p>
          ) : (
            <div>
              {orders?.map(eachOrder => (
                // Add a unique key prop and structure your order display
                <div key={eachOrder.id} className={classes.order}>
                  {/* Example of displaying order data */}
                  <p>
                    <strong>Order ID:</strong> {eachOrder.id}
                  </p>
                  {
                    eachOrder?.basket?.map(order=>(
                      <ProductCard flex={true} products={order} key={order.id} isButton={false}/>
                    ))
                  }
                  {/* <p><strong>Date:</strong> {new Date(eachOrder.created?.toDate()).toLocaleString()}</p> */}
                  <p>
                    <strong>Amount:</strong> {(eachOrder.amount)/100}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
