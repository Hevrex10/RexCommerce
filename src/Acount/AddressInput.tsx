import ShippinCard from "../component/AddressCard";

function AddressInput() {
   

  return (
    <>
      <p className=" text-gray-900 text-base font-semibold font-['Inter']">Shipping Address</p>
      <div className="flex flex-col gap-7">
        <ShippinCard />
        <button className=" flex justify-center items-center outline-1 outline-gray-300 rounded p-2 hover:cursor-pointer w-[30%] bg-gray-900">
          <p className="text-white">Update Password</p>
        </button>
      </div>
    </>
  );
}
export default AddressInput;
