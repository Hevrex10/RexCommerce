function Summary({ text, price }: { text: string; price: number | string }) {
  return (
    <div className="flex justify-between items-center">
      <div className="justify-start text-gray-600 text-sm font-medium font-['Inter'] leading-6">
        {text}
      </div>
      <div className="justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
        {typeof price === "number" ? "$" : ""}
        {price}
      </div>
    </div>
  );
}
export default Summary