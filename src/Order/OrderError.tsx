
import OrderCard from "./OrderCard";

export default function OrderError() {
  return (
      <OrderCard heading="Failed Order" subHeading='failed Order' image="/images/orderFailed.svg" result='Oops! There was an issue' condition='Oops! There was a problem processing your order. Please review the details and try again.' buttonText='Reorder' buttonTo='/cart v' bg="bg-rose-200 "/>
   
  );
}
