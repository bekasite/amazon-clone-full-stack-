import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/Product/ProductCard';
import { productUrl } from '../../Api/endPoints';
import Loader from '../../components/Loader/Loader';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setisLoading(false);
      })
      .catch(err => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  return (
    <Layout>
      {isLoading ? <Loader /> : <ProductCard products={product} flex={true} description={true} />}
    </Layout>
  );
}
