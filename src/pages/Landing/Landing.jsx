import React from 'react'
import Layout from '../../components/Layout/Layout'
import CarouselComp from '../../components/carousel/CarouselComp'
import Category from '../../components/Category/Category'
import Product from '../../components/Product/Product'

export default function Landing() {
  return (
    <Layout>
        <CarouselComp />
        <Category/>
        <Product />
    </Layout>
  )
}
