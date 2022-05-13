import commerce from '../lib/commerce'
// this need to add because ... new react ... 
import React from 'react'

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
      <pre>{JSON.stringify(merchant, null, 2)}</pre>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </React.Fragment>
  )
}