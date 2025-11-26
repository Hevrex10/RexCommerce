import React from 'react'
import ProductList from "../component/ProductList"
import { fetchProducts } from "../Api/ProductApi";
import { useLoaderData } from 'react-router-dom';


export default function Categories() {
   const allProduct = useLoaderData()
  return (
    <div>
      <ProductList allProduct={allProduct} />
    </div>
  )
}

export async function allProductLoader(){
  const loader = await fetchProducts()
  return loader
}