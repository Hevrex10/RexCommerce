import { NavLink, useLocation } from "react-router-dom";

function Option({ logo, name, to,bg }: { logo: any; name: string; to: string; bg?:boolean }) {

  const location = useLocation()
   

  return (
    <NavLink
      to={to}
      className={`max-w-full w-full px-6 py-2 rounded-lg flex justify-start items-center gap-2.5 hover:bg-neutral-100 ${bg ? "bg-gray-100": ""}`}
    >  
      <div>
      {logo}
      </div>
      <p className="justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
        {name}
      </p>
    </NavLink>
  );
}
export default Option;

export function Logout({ logo, name, onClick }: { logo: any; name: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`max-w-full w-full px-6 py-2 rounded-lg flex justify-start items-center gap-2.5 hover:bg-neutral-100`}
    >
      {logo}
      <p className="justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
        {name}
      </p>
    </button>
  );
}
