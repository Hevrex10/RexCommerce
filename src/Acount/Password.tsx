import InputCard from "../component/InputCard";

function Password() {
  
  return (
    <>
    
      <p className=" text-gray-900 text-base font-semibold font-['Inter']">Change Password</p>
      <div className="flex flex-col gap-6 max-w-100 w-full">
        <InputCard text="New Password" name="Password" />
        <InputCard text="Confirm password" name="Password" />

        <button className=" flex justify-center items-center outline-1 outline-gray-300 rounded p-2 hover:cursor-pointer w-[40%] bg-gray-900">
          <p className="text-white">Update Password</p>
        </button>
      </div>
    </>
  );
}
export default Password;
