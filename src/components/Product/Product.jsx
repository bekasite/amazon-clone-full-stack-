import React, { useEffect, useState } from 'react';
import classes from './Product.module.css';
import axios from 'axios';

import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';
export default function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setisLoading(false);
      })
      .catch(error => {
        console.log(error);
        setisLoading(false);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products__container}>
          {products.map(singleProduct => {
            return (
              <ProductCard products={singleProduct} key={singleProduct.id} />
            );
          })}
        </section>
      )}
    </div>
  );
}
