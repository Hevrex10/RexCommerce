import { NavLink } from "react-router-dom";
import InputCard from "../component/InputCard";
import PagesCard from "./PagesCard";

export default function Settings() {
  return (
    <PagesCard text="Settings">
      <form action="" className="flex w-80 flex-col gap-5">
        <InputCard text="Site Name" />
        <InputCard text="Support Email" />
        <InputCard text="Monthly Order Goal" />
        <NavLink
          to="/admin/add-products"
          className={`flex min-w-[140px] max-w-[130px] items-center rounded bg-gray-900 p-3 px-5`}
        >
          <p className="font-['Inter'] text-sm font-medium text-white">Save Changes</p>
        </NavLink>
      </form>
    </PagesCard>
  );
}
