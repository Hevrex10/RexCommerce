import React from 'react'
import Navcard from '../component/Navcard'
import Button from '../component/Button'
import OrderCard from './OrderCard'

export default function OrderSuccess() {
  return (
   <OrderCard heading="Succesful Order" subHeading='succesful Order' image="/images/orderSuccess.png" result='Thank you for shopping' condition='Your order has been successfully placed and is now being processed.' buttonText='Go to my account' buttonTo='/account' bg="bg-blue-200"/>
  )
}
