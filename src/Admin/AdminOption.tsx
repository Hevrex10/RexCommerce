import { NavLink } from "react-router-dom";

export default function AdminOption({
  logo,
  name,
  to,
  bg,
}: {
  logo: any;
  name: string;
  to: string;
  bg?: boolean;
}) {
  return (
    <NavLink
      to={to}
      className={`w-full px-6 py-2 rounded-lg flex justify-start items-center gap-2.5 hover:bg-neutral-100 ${bg ? "bg-gray-100" : ""}`}
    >
      <img src={logo} alt="" />
      <p className="justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
        {name}
      </p>
    </NavLink>
  );
}