import React from 'react'
import PagesCard from './PagesCard'
import TableHead, { ProductHeading, TableBody,ReviewList } from './TableCard'
import { fetchProducts } from '../Api/ProductApi'
import { useLoaderData } from 'react-router-dom'


export default function Review() {
  const details = useLoaderData() as any
  const reviews = details.flatMap((d:any) => d.reviews)
  
  return (
 <PagesCard text="Customers">
      <table className="min-w-full items-center justify-center divide-y divide-gray-200">
        <TableHead>
          <ProductHeading text="Name" />
          <ProductHeading text="Review" />
          <ProductHeading text="Action" />
        </TableHead>
        <TableBody>
          {reviews.map((review:any)=> <ReviewList key={review.comment} img={review.image} name={review.user} review={review.comment}/>)}
        </TableBody>
      </table>
    </PagesCard>
  )
}

export async function ReviewLoader(){
  const reviews = await fetchProducts()
  return reviews 
}
