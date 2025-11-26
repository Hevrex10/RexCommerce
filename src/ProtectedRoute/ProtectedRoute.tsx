import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loader from "../component/Loader";

export default function ProtectedRoute() {
  const { user } = useSelector((state: RootState) => state.auth);

  const { session, isLoading } = useSelector((state: any) => state.auth);
  if (isLoading) return <Loader />;

  if (!session) return <Navigate to="/login" replace />;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <>
      <Outlet />
    </>
  );
}
