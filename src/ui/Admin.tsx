import {  useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../component/Loader";

////////////////////// As AdminRoute //////////////////////////


export default function Admin() {
  const {  session, role, isLoading } = useSelector((state: any) => state.auth);
   if(isLoading) return <Loader/>
   if(role !== "admin") return <Navigate to="/login"/>
   if(!session) return <Navigate to= "/admin-login"/>
  return (
    <>
      <Outlet />
    </>
  );
}
