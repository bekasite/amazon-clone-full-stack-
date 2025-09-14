import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import classes from './Results.module.css';
import Loader from '../../components/Loader/Loader';

export default function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then(res => {
        setResults(res.data);
        setisLoading(false);
      })
      .catch(err => {
        console.log(err);
        setisLoading(false);
      });
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: '30px' }}>Results</h1>
          <p style={{ padding: '30px' }}>Category / {categoryName}</p>
          <hr />
          <div className={classes.products__container}>
            {results?.map(product => (
              <ProductCard key={product.id} products={product} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
