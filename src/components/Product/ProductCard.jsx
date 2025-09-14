import React, { useContext, useState } from 'react';
import classes from './Product.module.css';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../currencyFormat/CurrencyFormat';
import { productUrl } from '../../Api/endPoints';
import { Link } from 'react-router-dom';
import Header from '../Header/Header'
import {DataProvider} from '../DataProvider/DataProvider'
import {Type} from '../../utility/action.type'
import {DataContext}from '../DataProvider/DataProvider'

export default function ProductCard({ products , flex, description, isButton=true}) {
  // const[count, setCount]= useState(0); 

  // {<Header count={count}  style={{display:"none"}}/>}
  const [state, dispatch] = useContext(DataContext)
  
  console.log(state)
  let addTocart = () =>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{ 
       title: products.title,
       image: products.image,
       id: products.id,
       rating: products.rating,
       price: products.price,
       description: products.description,
      }
  })
     
  } 
  return (
    <>
   
    <div className={`${classes.card__container} ${flex?classes.product__flexed: ''}`}>
      <Link to={`/products/${products.id}`}>
        <img src={`${products.image}`} alt="" />
      </Link>
      <div>
        <h3>{products.title}</h3>
        {description&&<div style={{maxWidth:"450px"}}>{products.description}</div>}
        <div className={classes.rating}>
          {products.rating && (
            <>
              <Rating
                value={Number(products.rating.rate)}
                precision={0.1}
                readOnly
              />
              <small>{products.rating.count}</small>
            </>
          )}
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={products.price} />
        </div>
        {isButton && <button className={classes.button} onClick={addTocart}>add to cart</button>}
        
      </div>
    </div>
    </>
  );
}
