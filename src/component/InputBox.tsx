function InputBox({
  text,
  name,
  required
}: {
  text: string;
  name:string
  required?:boolean|undefined
}) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="justify-start text-zinc-600 text-sm font-medium font-['Inter'] leading-6">
          {text}
        </p>
        <input
          required={required}
          type="text"
          name={name}
          className="w-full px-5 py-2 rounded-md outline outline-gray-200 text-gray-500 text-sm font-medium font-['Inter']"
        />
      </div>
    </>
  );
}

export default InputBox;
