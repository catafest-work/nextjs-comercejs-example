// this will show product in the individuals list 

// this need to add because ... new react ... 
import React from 'react'

import commerce from '../../lib/commerce'

import ProductList from '../../components/ProductList' //?

export async function getStaticProps({ params })
{
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  
  const { data: products } = await commerce.products.list()
  
  return {
    paths:  products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}

export default function ProductPage({product}) {
  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <p>{product.price.formatted_with_symbol}</p>
    </React.Fragment>
  )}