import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat';
import classes from './Cart.module.css';
import {Type} from '../../utility/action.type'

export default function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return (item.price * item.amount) + amount;
  }, 0);

  const increment = (item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement = (id)=>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id
    })
  }

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps! no items in your Cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={i}
                    products={item}
                    description={true}
                    flex={true}
                    isButton={false}
                  />
                  <div className={classes.btn_container}>
                    <button onClick={()=>increment(item)} className={classes.btn}>+</button>
                    <span>{item.amount}</span>
                    <button onClick={()=>decrement(item.id)} className={classes.btn}>-</button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.sub_total}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" name="" id="" />
              <small>This Order Conatins a gift </small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
        <div></div>
      </section>
    </Layout>
  );
}
