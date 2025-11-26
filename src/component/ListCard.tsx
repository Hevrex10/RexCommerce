import { NavLink } from "react-router-dom";

function ListCard({
  name,
  date,
  image,
  priceOrtext,
  stateOrprice,
  text,
  onClick,
}: {
  name: string;
  image: string;
  date: string;
  priceOrtext: number | string;
  stateOrprice: string | number;
  text: string;
  onClick?: () => void;
}) {
  return (
    <>
      <div className="flex gap-5 h-20 ">
        <div className="max-w-full w-full flex-col md:flex md:flex-row justify-between items-center ">
          <div className=" flex gap-6">
            <div className="w-20 h-20 px-2.5  bg-neutral-100 rounded flex justify-center items-center gap-2.5 ">
              <img className="max-w-11 h-16" src={image} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-center text-gray-900 text-sm font-medium font-['Inter'] leading-6">
                {name}
              </p>
              <p className="text-center text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-6">
                Ordered on: {date}
              </p>
              {typeof priceOrtext === "number" ? (
                <p className=" text-gray-900 text-xs font-medium font-['Inter'] capitalize leading-6">
                  ${priceOrtext}
                </p>
              ) : (
                <button className="text-center text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-6">
                  Remove item
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-6">
            {typeof stateOrprice === "string" ? (
              <div className={"border-b border-gray-900 flex justify-end items-center gap-2.5"}>
                <p className="text-center justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
                  {stateOrprice}
                </p>
              </div>
            ) : (
              <div className={"flex justify-end items-center gap-2.5"}>
                <p className="text-center justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
                  ${stateOrprice}
                </p>
              </div>
            )}
            <button
              onClick={onClick}
              className=" flex justify-center items-center outline-1 outline-gray-300 rounded p-2 hover:cursor-pointer"
            >
              {text}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ListCard;
