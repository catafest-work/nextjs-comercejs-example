// this need to add because ... new react ... 
import React from 'react'

import commerce from '../lib/commerce'

import ProductList from '../components/ProductList'

import CategoryList from '../components/CategoryList'

export async function getStaticProps() {
  const merchant = await commerce.merchants.about()
  const {data: categories} = await commerce.categories.list()
  const {data: products} = await commerce.products.list()
  return {
    props: {
      merchant,
      categories,
      products
    }
  }
}

export default function IndexPage({ merchant, categories, products}) {
  return (
    <React.Fragment>

      {/* <pre>{JSON.stringify(merchant, null, 2)}</pre> */}
      <h1>{merchant.business_name}</h1>
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
      
      <CategoryList categories={categories}/> 
      <ProductList products={products} />
    </React.Fragment>
  )
}