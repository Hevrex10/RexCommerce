
function InputCard({
  text,
  name,
  type,
  accept,
  placeholder,
  onChange
}: {
  text: string;
  name?:string;
  type?:string;
  accept?:any;
  placeholder?:string
  onChange?:any
}) {
  return (
    <>
      <div className="flex flex-col gap-1 max-w-full w-full">
        <p className="justify-start text-zinc-600 text-sm font-medium font-['Inter'] leading-6">
          {text}
        </p>
        <input
          type={type}
          name={name}
          accept={accept}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full px-5 py-2 rounded-md outline outline-gray-200 text-gray-500 text-sm font-medium font-['Inter']`}
        />
      </div>
    </>
  );
}

export default InputCard;